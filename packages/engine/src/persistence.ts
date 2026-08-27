/**
 * Stage C5 — persistence, offline, and the reason `storage_manager` retires.
 *
 * The old model persisted a proprietary project JSON: one blob, rewritten on every save, lost if
 * the tab died between saves. Here the durable thing is the **op log**, which the document is a
 * fold over. That single change buys three properties the plan asks for and one it needs:
 *
 * * killing the tab mid-edit loses at most the ops that had not been appended (milliseconds),
 * * an offline session is a log that has not been sent yet, not a failed save,
 * * reconnecting is a merge, because the ops carry their own ordering,
 * * and the log compacts: a snapshot plus the ops since it, never an unbounded history on disk.
 *
 * The storage backend is an interface with three implementations — memory (tests), IndexedDB
 * (browsers), and whatever the backend service will be (Stage E2) — so none of the above depends
 * on where the bytes land.
 */

import type { Document } from './generated/ir.ts';
import { DocumentStore, type Change } from './store.ts';
import type { StampedOp } from './ops.ts';

export interface PersistedSnapshot {
  document: Document;
  replica: string;
  lamport: number;
  /** How many ops the log had when this snapshot was taken; ops before it are already folded in. */
  logLength: number;
}

export interface OpLogStorage {
  loadSnapshot(): Promise<PersistedSnapshot | null>;
  saveSnapshot(snapshot: PersistedSnapshot): Promise<void>;
  loadOps(): Promise<StampedOp[]>;
  appendOps(ops: StampedOp[]): Promise<void>;
  /** Drop ops already folded into the snapshot. */
  truncateOps(count: number): Promise<void>;
  clear(): Promise<void>;
}

/** The default for tests and for a first run before a real backend exists. */
export class MemoryOpLogStorage implements OpLogStorage {
  #snapshot: PersistedSnapshot | null = null;
  #ops: StampedOp[] = [];
  /** Set by tests to simulate a write that never landed because the tab died. */
  failNextAppend = false;

  async loadSnapshot(): Promise<PersistedSnapshot | null> {
    return this.#snapshot ? structuredClone(this.#snapshot) : null;
  }
  async saveSnapshot(snapshot: PersistedSnapshot): Promise<void> {
    this.#snapshot = structuredClone(snapshot);
  }
  async loadOps(): Promise<StampedOp[]> {
    return structuredClone(this.#ops);
  }
  async appendOps(ops: StampedOp[]): Promise<void> {
    if (this.failNextAppend) {
      this.failNextAppend = false;
      throw new Error('storage unavailable');
    }
    this.#ops.push(...structuredClone(ops));
  }
  async truncateOps(count: number): Promise<void> {
    this.#ops.splice(0, count);
  }
  async clear(): Promise<void> {
    this.#snapshot = null;
    this.#ops = [];
  }
}

/**
 * IndexedDB, for the editor. One object store for the snapshot, one for the ops, so an append is a
 * single small write rather than a rewrite of the document.
 */
export class IndexedDbOpLogStorage implements OpLogStorage {
  #name: string;
  #db: Promise<IDBDatabase> | null = null;

  constructor(name = 'lattice') {
    this.#name = name;
  }

  #open(): Promise<IDBDatabase> {
    this.#db ??= new Promise((resolve, reject) => {
      const request = indexedDB.open(this.#name, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('snapshot')) db.createObjectStore('snapshot');
        if (!db.objectStoreNames.contains('ops')) db.createObjectStore('ops', { autoIncrement: true });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return this.#db;
  }

  async #tx<T>(store: string, mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const db = await this.#open();
    return new Promise<T>((resolve, reject) => {
      const transaction = db.transaction(store, mode);
      const request = work(transaction.objectStore(store));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async loadSnapshot(): Promise<PersistedSnapshot | null> {
    return (await this.#tx<PersistedSnapshot | undefined>('snapshot', 'readonly', (s) => s.get('current'))) ?? null;
  }
  async saveSnapshot(snapshot: PersistedSnapshot): Promise<void> {
    await this.#tx('snapshot', 'readwrite', (s) => s.put(snapshot, 'current'));
  }
  async loadOps(): Promise<StampedOp[]> {
    return (await this.#tx<StampedOp[]>('ops', 'readonly', (s) => s.getAll())) ?? [];
  }
  async appendOps(ops: StampedOp[]): Promise<void> {
    const db = await this.#open();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('ops', 'readwrite');
      const store = transaction.objectStore('ops');
      for (const op of ops) store.add(op);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
  async truncateOps(count: number): Promise<void> {
    const db = await this.#open();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('ops', 'readwrite');
      const store = transaction.objectStore('ops');
      let seen = 0;
      const cursor = store.openCursor();
      cursor.onsuccess = () => {
        const current = cursor.result;
        if (!current || seen >= count) return;
        current.delete();
        seen++;
        current.continue();
      };
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
  async clear(): Promise<void> {
    await this.#tx('snapshot', 'readwrite', (s) => s.clear());
    await this.#tx('ops', 'readwrite', (s) => s.clear());
  }
}

export interface PersistenceOptions {
  /** Compact once the log since the last snapshot passes this many ops. */
  compactAfter?: number;
  /** Called when an append fails, so the UI can say "not saved" rather than pretending. */
  onError?: (error: unknown) => void;
}

/**
 * Binds a [`DocumentStore`] to storage: appends every op as it happens, compacts periodically, and
 * keeps the set of ops that have not yet reached the server (the offline queue).
 */
export class SessionPersistence {
  #store: DocumentStore;
  #storage: OpLogStorage;
  #options: Required<Pick<PersistenceOptions, 'compactAfter'>> & PersistenceOptions;
  #sinceSnapshot = 0;
  #unsynced: StampedOp[] = [];
  #writes: Promise<unknown> = Promise.resolve();
  #unsubscribe: (() => void) | null = null;

  constructor(store: DocumentStore, storage: OpLogStorage, options: PersistenceOptions = {}) {
    this.#store = store;
    this.#storage = storage;
    this.#options = { compactAfter: options.compactAfter ?? 200, ...options };
  }

  /** Ops applied locally that the server has not acknowledged. Survives a reload via the log. */
  get pending(): readonly StampedOp[] {
    return this.#unsynced;
  }

  start(): () => void {
    const listener = (change: Change) => this.#onChange(change);
    this.#unsubscribe = this.#store.subscribe(listener);
    return () => this.stop();
  }

  stop(): void {
    this.#unsubscribe?.();
    this.#unsubscribe = null;
  }

  /** Wait for every queued write. Call before asserting anything about durability. */
  async settled(): Promise<void> {
    await this.#writes;
  }

  #onChange(change: Change): void {
    if (!change.ops.length) return;
    this.#unsynced.push(...change.ops);
    this.#sinceSnapshot += change.ops.length;
    this.#writes = this.#writes
      .then(() => this.#storage.appendOps(change.ops))
      .then(() => (this.#sinceSnapshot >= this.#options.compactAfter ? this.compact() : undefined))
      .catch((error) => this.#options.onError?.(error));
  }

  /** Fold the log into a snapshot and drop the ops it now contains. */
  async compact(): Promise<void> {
    const snapshot = this.#store.snapshot();
    const logLength = snapshot.log.length;
    await this.#storage.saveSnapshot({
      document: snapshot.document,
      replica: snapshot.replica,
      lamport: snapshot.lamport,
      logLength,
    });
    await this.#storage.truncateOps(logLength);
    this.#sinceSnapshot = 0;
  }

  /** Mark ops as acknowledged by the server. What remains is the offline queue. */
  acknowledge(ops: readonly StampedOp[]): void {
    const acked = new Set(ops.map((op) => `${op.replica}:${op.lamport}`));
    this.#unsynced = this.#unsynced.filter((op) => !acked.has(`${op.replica}:${op.lamport}`));
  }
}

/**
 * Rebuild a session from storage. `fallback` is the document to start from when there is nothing
 * stored — a fresh site, or the copy the server sent.
 */
export async function restore(
  storage: OpLogStorage,
  fallback: Document,
  options: { validator?: ConstructorParameters<typeof DocumentStore>[1] } = {},
): Promise<{ store: DocumentStore; recoveredOps: number }> {
  const snapshot = await storage.loadSnapshot();
  const ops = await storage.loadOps();
  const base = snapshot?.document ?? fallback;

  // Replaying is a merge from the base: ops that cannot apply (their target was already removed by
  // an op the snapshot folded in) are refused identically here and everywhere else.
  const merged = DocumentStore.merge(base, [ops]);
  const store = new DocumentStore(merged.document, {
    replica: snapshot?.replica,
    ...(options.validator ?? {}),
  });
  return { store, recoveredOps: merged.log.length };
}
