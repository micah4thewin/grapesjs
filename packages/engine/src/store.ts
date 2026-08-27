/**
 * Stage C1 — the document store: the new heart, beating outside the body.
 *
 * Holds a validated IR document, an append-only op log, and one history stack. Everything that
 * edits a Lattice site goes through `apply`, which is what lets undo, offline, multiplayer and AI
 * proposals all be the same mechanism.
 *
 * The CRDT substrate here is deliberately the *simplest thing that converges*: ops carry a Lamport
 * clock and a replica id, merge is a union replayed in total order, and a move that would create a
 * cycle is refused identically on every replica. `docs/lattice/C1-crdt-spike.md` records what this
 * does and does not give us, and what the Loro/Yjs spike still has to decide.
 */

import type { Document } from './generated/ir.ts';
import { apply, invert, touchedNodes, type Op, type StampedOp } from './ops.ts';
import { Validator, type ValidationError } from './validate.ts';

export interface Change {
  document: Document;
  ops: StampedOp[];
  /** Node ids whose projection needs patching; empty means "re-project the route". */
  touched: string[];
  origin: 'local' | 'remote' | 'undo' | 'redo';
}

export type Listener = (change: Change) => void;

export interface StoreOptions {
  replica?: string;
  /** Validate after every batch. On by default; the cost is worth catching a bad op at its source. */
  validator?: Validator;
}

export class ValidationFailure extends Error {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super(
      `document would be invalid:\n${errors.map((e) => `  ${e.node ? `node ${e.node}` : e.path}: ${e.message}`).join('\n')}`,
    );
    this.errors = errors;
  }
}

let batchCounter = 0;

export class DocumentStore {
  #document: Document;
  #log: StampedOp[] = [];
  #undoStack: StampedOp[][] = [];
  #redoStack: StampedOp[][] = [];
  #listeners = new Set<Listener>();
  #replica: string;
  #lamport = 0;
  #validator?: Validator;

  constructor(document: Document, options: StoreOptions = {}) {
    this.#document = document;
    this.#replica = options.replica ?? `r${Math.random().toString(36).slice(2, 8)}`;
    this.#validator = options.validator;
  }

  get document(): Document {
    return this.#document;
  }

  get replica(): string {
    return this.#replica;
  }

  /** The append-only log. Persistence (Stage C5) and the review queue (Stage G1) read this. */
  get log(): readonly StampedOp[] {
    return this.#log;
  }

  subscribe(listener: Listener): () => void {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  /**
   * Apply one user action. A batch is what the user thinks of as one thing — a drag, a sentence
   * typed, a token edited — and is therefore the unit of undo.
   */
  apply(ops: Op | Op[], origin: Change['origin'] = 'local'): Change {
    const list = Array.isArray(ops) ? ops : [ops];
    if (!list.length) return { document: this.#document, ops: [], touched: [], origin };

    const batch = `b${++batchCounter}`;
    const before = this.#document;
    const inverses: Op[] = [];
    const touched = new Set<string>();
    let next = before;
    let documentWide = false;

    for (const op of list) {
      inverses.unshift(invert(next, op));
      const ids = touchedNodes(next, op);
      if (!ids.length) documentWide = true;
      ids.forEach((id) => touched.add(id));
      next = apply(next, op);
    }

    if (this.#validator) {
      // Validate what the ops touched, not the whole document: ops address nodes, and full
      // validation on every keystroke costs most of a frame on a large page (see
      // scripts/lattice/bench.mjs). A document-wide op (tokens, routes) validates its section.
      const errors = documentWide
        ? [...this.#validator.validateSection(next, 'tokens'), ...this.#validator.validateSection(next, 'routes')]
        : this.#validator.validateNodes(next, [...touched]);
      if (errors.length) throw new ValidationFailure(errors);
    }

    const stamped = list.map((op) => ({ op, replica: this.#replica, lamport: ++this.#lamport, batch }));
    this.#document = next;
    this.#log.push(...stamped);

    if (origin === 'local' || origin === 'remote') {
      const inverseBatch = inverses.map((op) => ({ op, replica: this.#replica, lamport: 0, batch }));
      if (origin === 'local') {
        this.#undoStack.push(inverseBatch);
        // A new local edit is a branch: whatever was ahead of us in history is gone.
        this.#redoStack = [];
      }
    }

    const change: Change = { document: next, ops: stamped, touched: documentWide ? [] : [...touched], origin };
    this.#emit(change);
    return change;
  }

  undo(): Change | null {
    const batch = this.#undoStack.pop();
    if (!batch) return null;
    const redo: StampedOp[] = [];
    let next = this.#document;
    for (const { op } of batch) {
      redo.unshift({ op: invert(next, op), replica: this.#replica, lamport: 0, batch: 'redo' });
      next = apply(next, op);
    }
    this.#redoStack.push(redo);
    return this.#commit(next, batch, 'undo');
  }

  redo(): Change | null {
    const batch = this.#redoStack.pop();
    if (!batch) return null;
    const undo: StampedOp[] = [];
    let next = this.#document;
    for (const { op } of batch) {
      undo.unshift({ op: invert(next, op), replica: this.#replica, lamport: 0, batch: 'undo' });
      next = apply(next, op);
    }
    this.#undoStack.push(undo);
    return this.#commit(next, batch, 'redo');
  }

  #commit(next: Document, batch: StampedOp[], origin: Change['origin']): Change {
    const touched = new Set<string>();
    let documentWide = false;
    for (const { op } of batch) {
      const ids = touchedNodes(this.#document, op);
      if (!ids.length) documentWide = true;
      ids.forEach((id) => touched.add(id));
    }
    const stamped = batch.map(({ op, batch: id }) => ({
      op,
      replica: this.#replica,
      lamport: ++this.#lamport,
      batch: id,
    }));
    this.#document = next;
    this.#log.push(...stamped);
    const change: Change = { document: next, ops: stamped, touched: documentWide ? [] : [...touched], origin };
    this.#emit(change);
    return change;
  }

  get canUndo(): boolean {
    return this.#undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.#redoStack.length > 0;
  }

  #emit(change: Change) {
    for (const listener of this.#listeners) listener(change);
  }

  /**
   * Merge ops from another replica. Convergence comes from replaying the union of both logs from
   * the same base in one total order — (lamport, replica, position) — so every replica computes
   * the same document without any of them needing to have seen the others' ops in order.
   */
  static merge(
    base: Document,
    logs: readonly (readonly StampedOp[])[],
  ): { document: Document; log: StampedOp[]; refused: StampedOp[] } {
    const seen = new Set<string>();
    const all: StampedOp[] = [];
    for (const log of logs) {
      log.forEach((stamped, index) => {
        const key = `${stamped.replica}:${stamped.lamport}:${index}`;
        if (seen.has(key)) return;
        seen.add(key);
        all.push(stamped);
      });
    }
    all.sort((a, b) => a.lamport - b.lamport || (a.replica < b.replica ? -1 : a.replica > b.replica ? 1 : 0));

    let document = base;
    const applied: StampedOp[] = [];
    const refused: StampedOp[] = [];
    for (const stamped of all) {
      try {
        document = apply(document, stamped.op);
        applied.push(stamped);
      } catch {
        // An op that cannot apply against the merged state (its target was removed by a concurrent
        // edit, or the move would cycle) is refused on every replica identically, which is what
        // keeps them converged. Refusals are surfaced, never swallowed silently.
        refused.push(stamped);
      }
    }
    return { document, log: applied, refused };
  }

  /** Snapshot + log, for local persistence and compaction (Stage C5). */
  snapshot(): { document: Document; log: StampedOp[]; replica: string; lamport: number } {
    return { document: this.#document, log: [...this.#log], replica: this.#replica, lamport: this.#lamport };
  }

  static fromSnapshot(snapshot: ReturnType<DocumentStore['snapshot']>, options: StoreOptions = {}): DocumentStore {
    const store = new DocumentStore(snapshot.document, { replica: snapshot.replica, ...options });
    store.#log = [...snapshot.log];
    store.#lamport = snapshot.lamport;
    return store;
  }
}
