/**
 * Stage C1 — the op vocabulary.
 *
 * Every mutation in Lattice is an op: typed, addressed by node id, and invertible against the
 * document it applied to. That single rule is what makes undo, multiplayer, AI proposals and the
 * review queue the same mechanism instead of four. Nothing in this file knows the editor exists.
 */

import type { Document, Node, Place, Span, Style, Route, ColorToken, SpaceToken, TypeToken } from './generated/ir.ts';

export type TokenGroup = 'color' | 'space' | 'type' | 'radius';
export type TokenValue = ColorToken | SpaceToken | TypeToken;

/** Scalar node fields a panel may set directly. Styles, text and placement have their own ops. */
export type NodeField = 'level' | 'cols' | 'alt' | 'src' | 'width' | 'height' | 'source' | 'limit' | 'component' | 'tag' | 'bind';

export type Op =
  | { kind: 'insertSubtree'; nodes: Node[]; root: string; parent: string; index: number }
  | { kind: 'removeSubtree'; root: string }
  | { kind: 'moveNode'; id: string; parent: string; index: number }
  | { kind: 'setStyle'; id: string; key: keyof Style; value: unknown }
  | { kind: 'setText'; id: string; spans: Span[] }
  | { kind: 'setField'; id: string; key: NodeField; value: unknown }
  | { kind: 'setPlace'; id: string; place: Place | null }
  | { kind: 'setToken'; group: TokenGroup; name: string; value: TokenValue | null }
  | { kind: 'setRoute'; path: string; route: Route | null };

/** An op as it travels: authored by a replica, ordered by a Lamport clock. */
export interface StampedOp {
  op: Op;
  replica: string;
  lamport: number;
  /** Groups ops the user thinks of as one action (a drag, a typed sentence). Undo works on these. */
  batch: string;
}

export class OpError extends Error {}

const clone = <T,>(value: T): T => (value === undefined ? value : (JSON.parse(JSON.stringify(value)) as T));

function requireNode(doc: Document, id: string): Node {
  const node = doc.nodes[id];
  if (!node) throw new OpError(`op addresses node ${JSON.stringify(id)}, which does not exist`);
  return node;
}

function parentOf(doc: Document, id: string): { parent: string; index: number } | null {
  for (const [parentId, node] of Object.entries(doc.nodes)) {
    const index = (node.children ?? []).indexOf(id);
    if (index >= 0) return { parent: parentId, index };
  }
  return null;
}

/** Ids of `root` and everything under it, in document order. */
export function subtree(doc: Document, root: string): string[] {
  const out: string[] = [];
  const walk = (id: string, seen: Set<string>) => {
    if (seen.has(id)) return;
    seen.add(id);
    const node = doc.nodes[id];
    if (!node) return;
    out.push(id);
    for (const child of node.children ?? []) walk(child, seen);
  };
  walk(root, new Set());
  return out;
}

function isAncestor(doc: Document, ancestor: string, id: string): boolean {
  let current: string | null = id;
  const seen = new Set<string>();
  while (current && !seen.has(current)) {
    seen.add(current);
    if (current === ancestor) return true;
    current = parentOf(doc, current)?.parent ?? null;
  }
  return false;
}

/**
 * Apply one op, returning a new document. Structural sharing: only the node table and the nodes
 * the op touches are copied, so applying an op to a 2,000-node page stays cheap (Stage C6).
 */
export function apply(doc: Document, op: Op): Document {
  const next: Document = { ...doc, nodes: { ...doc.nodes } };

  switch (op.kind) {
    case 'insertSubtree': {
      const parent = requireNode(next, op.parent);
      for (const node of op.nodes) {
        if (next.nodes[node.id]) throw new OpError(`insert would overwrite existing node ${JSON.stringify(node.id)}`);
        next.nodes[node.id] = clone(node);
      }
      if (!next.nodes[op.root]) throw new OpError(`insertSubtree root ${JSON.stringify(op.root)} is not among the inserted nodes`);
      const children = [...(parent.children ?? [])];
      children.splice(clampIndex(op.index, children.length), 0, op.root);
      next.nodes[op.parent] = { ...parent, children };
      return next;
    }

    case 'removeSubtree': {
      const ids = subtree(next, op.root);
      if (!ids.length) throw new OpError(`removeSubtree root ${JSON.stringify(op.root)} does not exist`);
      const location = parentOf(next, op.root);
      if (location) {
        const parent = next.nodes[location.parent];
        next.nodes[location.parent] = { ...parent, children: (parent.children ?? []).filter((c) => c !== op.root) };
      }
      for (const id of ids) delete next.nodes[id];
      return next;
    }

    case 'moveNode': {
      requireNode(next, op.id);
      const parent = requireNode(next, op.parent);
      // A move that would make a node its own ancestor is refused, not repaired. Both replicas
      // see ops in the same order, so both refuse the same move and stay converged.
      if (isAncestor(next, op.id, op.parent)) {
        throw new OpError(`moving ${JSON.stringify(op.id)} into ${JSON.stringify(op.parent)} would make it its own ancestor`);
      }
      const from = parentOf(next, op.id);
      if (from) {
        const fromParent = next.nodes[from.parent];
        next.nodes[from.parent] = { ...fromParent, children: (fromParent.children ?? []).filter((c) => c !== op.id) };
      }
      const target = next.nodes[op.parent];
      const children = [...(target.children ?? [])];
      children.splice(clampIndex(op.index, children.length), 0, op.id);
      next.nodes[op.parent] = { ...target, children };
      return next;
    }

    case 'setStyle': {
      const node = requireNode(next, op.id);
      const style: Style = { ...(node.style ?? {}) };
      if (op.value === null || op.value === undefined) delete (style as Record<string, unknown>)[op.key];
      else (style as Record<string, unknown>)[op.key] = clone(op.value);
      next.nodes[op.id] = Object.keys(style).length ? { ...node, style } : stripStyle(node);
      return next;
    }

    case 'setText': {
      const node = requireNode(next, op.id);
      next.nodes[op.id] = { ...node, spans: clone(op.spans) };
      return next;
    }

    case 'setField': {
      const node = requireNode(next, op.id);
      const updated: Record<string, unknown> = { ...node };
      if (op.value === null || op.value === undefined) delete updated[op.key];
      else updated[op.key] = clone(op.value);
      next.nodes[op.id] = updated as Node;
      return next;
    }

    case 'setPlace': {
      const node = requireNode(next, op.id);
      if (op.place === null) {
        const { place, ...rest } = node;
        void place;
        next.nodes[op.id] = rest as Node;
      } else {
        next.nodes[op.id] = { ...node, place: clone(op.place) };
      }
      return next;
    }

    case 'setToken': {
      const tokens = { ...next.tokens, [op.group]: { ...(next.tokens[op.group] ?? {}) } } as Document['tokens'];
      const group = tokens[op.group] as Record<string, TokenValue>;
      if (op.value === null) delete group[op.name];
      else group[op.name] = clone(op.value);
      next.tokens = tokens;
      return next;
    }

    case 'setRoute': {
      const routes = [...next.routes];
      const at = routes.findIndex((r) => r.path === op.path);
      if (op.route === null) {
        if (at >= 0) routes.splice(at, 1);
      } else if (at >= 0) {
        routes[at] = clone(op.route);
      } else {
        routes.push(clone(op.route));
        // Routes are kept in path order so two replicas that add routes concurrently end up with
        // the same document, not the same set in a different order.
        routes.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
      }
      next.routes = routes;
      return next;
    }

    default: {
      const exhaustive: never = op;
      throw new OpError(`unknown op ${JSON.stringify(exhaustive)}`);
    }
  }
}

function stripStyle(node: Node): Node {
  const { style, ...rest } = node;
  void style;
  return rest as Node;
}

function clampIndex(index: number, length: number): number {
  if (!Number.isFinite(index) || index < 0) return 0;
  return Math.min(Math.trunc(index), length);
}

/**
 * The inverse of an op *against the document it is about to be applied to*. Undo is then just
 * "apply the inverse", which is why one history stack can span structure, style, text and tokens.
 */
export function invert(doc: Document, op: Op): Op {
  switch (op.kind) {
    case 'insertSubtree':
      return { kind: 'removeSubtree', root: op.root };

    case 'removeSubtree': {
      const ids = subtree(doc, op.root);
      const location = parentOf(doc, op.root);
      if (!location) throw new OpError(`cannot invert removal of unparented node ${JSON.stringify(op.root)}`);
      return {
        kind: 'insertSubtree',
        nodes: ids.map((id) => clone(doc.nodes[id])),
        root: op.root,
        parent: location.parent,
        index: location.index,
      };
    }

    case 'moveNode': {
      const from = parentOf(doc, op.id);
      if (!from) throw new OpError(`cannot invert move of unparented node ${JSON.stringify(op.id)}`);
      return { kind: 'moveNode', id: op.id, parent: from.parent, index: from.index };
    }

    case 'setStyle': {
      const previous = doc.nodes[op.id]?.style?.[op.key];
      return { kind: 'setStyle', id: op.id, key: op.key, value: previous === undefined ? null : clone(previous) };
    }

    case 'setText':
      return { kind: 'setText', id: op.id, spans: clone(doc.nodes[op.id]?.spans ?? []) };

    case 'setField': {
      const previous = (doc.nodes[op.id] as Record<string, unknown> | undefined)?.[op.key];
      return { kind: 'setField', id: op.id, key: op.key, value: previous === undefined ? null : clone(previous) };
    }

    case 'setPlace':
      return { kind: 'setPlace', id: op.id, place: clone(doc.nodes[op.id]?.place ?? null) };

    case 'setToken': {
      const previous = (doc.tokens[op.group] as Record<string, TokenValue> | undefined)?.[op.name];
      return { kind: 'setToken', group: op.group, name: op.name, value: previous === undefined ? null : clone(previous) };
    }

    case 'setRoute': {
      const previous = doc.routes.find((r) => r.path === op.path);
      return { kind: 'setRoute', path: op.path, route: previous ? clone(previous) : null };
    }

    default: {
      const exhaustive: never = op;
      throw new OpError(`unknown op ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** Which node ids an op changes — the projector patches exactly these (Stage C6). */
export function touchedNodes(doc: Document, op: Op): string[] {
  switch (op.kind) {
    case 'insertSubtree':
      return [op.parent, ...op.nodes.map((n) => n.id)];
    case 'removeSubtree': {
      const location = parentOf(doc, op.root);
      return [...(location ? [location.parent] : []), ...subtree(doc, op.root)];
    }
    case 'moveNode': {
      const from = parentOf(doc, op.id);
      return [op.id, op.parent, ...(from ? [from.parent] : [])];
    }
    case 'setToken':
    case 'setRoute':
      // Token and route changes are document-wide; the projector re-projects the active route.
      return [];
    default:
      return [op.id];
  }
}
