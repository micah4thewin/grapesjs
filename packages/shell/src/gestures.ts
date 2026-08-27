/**
 * Stage C3 — gesture capture: user actions in, ops out.
 *
 * Editing works exactly as it did, but every edit is an op and the component tree is never the
 * writer. The functions here are pure: a gesture and the current document go in, ops come out.
 * The canvas adapter's whole job is to call them and hand the result to the store — which is what
 * makes the hostile part (drag and drop) testable without a browser.
 */

import { grid, type Document, type Node, type Op, type Span } from '@lattice/engine';

export interface DropTarget {
  /** The node the pointer is over. */
  parent: string;
  /** Insertion index among the parent's children, for non-grid parents. */
  index: number;
  /** Pointer position within the parent's box, for grid parents. */
  point?: grid.DropPoint;
}

/** Click on the canvas → the IR node that owns that element. */
export function nodeIdFromElement(
  element: { getAttribute(name: string): string | null; parentElement: unknown } | null,
): string | null {
  let current = element as { getAttribute(name: string): string | null; parentElement: unknown } | null;
  while (current) {
    const id = current.getAttribute('data-lattice-id');
    if (id) return id;
    current = current.parentElement as typeof current;
  }
  return null;
}

/**
 * A drag that ended over `target`. The DOM move is cancelled by the caller; what comes back is the
 * structural change the user meant, which re-projection then realises. When the drop is into a
 * grid, the placement comes from the solver, so an illegal position is not merely discouraged —
 * there is no op that could express it.
 */
export function dropToOps(doc: Document, draggedId: string, target: DropTarget): Op[] {
  const parent = doc.nodes[target.parent];
  const dragged = doc.nodes[draggedId];
  if (!parent || !dragged) return [];
  if (draggedId === target.parent || isAncestor(doc, draggedId, target.parent)) return [];

  const ops: Op[] = [];
  if (parent.kind === 'grid') {
    const place = grid.solveDrop(doc, target.parent, target.point ?? { x: 0, y: 0 }, dragged.place?.span ?? 4);
    if (!place) return [];
    ops.push({ kind: 'moveNode', id: draggedId, parent: target.parent, index: target.index });
    ops.push({ kind: 'setPlace', id: draggedId, place });
    return ops;
  }

  ops.push({ kind: 'moveNode', id: draggedId, parent: target.parent, index: target.index });
  // Leaving a grid means the placement goes with it: a stray `place` on a non-grid child is a
  // typecheck error, and the user's gesture said "put this here", not "keep column 5".
  if (dragged.place) ops.push({ kind: 'setPlace', id: draggedId, place: null });
  return ops;
}

/**
 * A block dropped from the palette carries an IR fragment, not an HTML string (Stage C3.4).
 * Fresh ids are minted here so the same block can be dropped twice.
 */
export function blockToOps(
  doc: Document,
  fragment: { root: string; nodes: Node[] },
  target: DropTarget,
  mintId: () => string,
): Op[] {
  const parent = doc.nodes[target.parent];
  if (!parent) return [];

  const idMap = new Map<string, string>();
  for (const node of fragment.nodes) idMap.set(node.id, mintId());
  const nodes: Node[] = fragment.nodes.map((node) => ({
    ...node,
    id: idMap.get(node.id)!,
    ...(node.children ? { children: node.children.map((child) => idMap.get(child) ?? child) } : {}),
  }));
  const root = idMap.get(fragment.root)!;

  const ops: Op[] = [{ kind: 'insertSubtree', nodes, root, parent: target.parent, index: target.index }];
  if (parent.kind === 'grid') {
    const rootNode = nodes.find((n) => n.id === root)!;
    const place = grid.solveDrop(doc, target.parent, target.point ?? { x: 0, y: 0 }, rootNode.place?.span ?? 4);
    if (place) ops.push({ kind: 'setPlace', id: root, place });
  }
  return ops;
}

/**
 * Rich text commits an op-batch, not a stream of keystrokes (Stage C4). The RTE keeps its own
 * character-level undo while the field has focus; on blur or idle it commits one op, which is the
 * granularity the shared history and the other replicas see.
 */
export function textCommitToOps(doc: Document, id: string, spans: Span[]): Op[] {
  const node = doc.nodes[id];
  if (!node) return [];
  if (JSON.stringify(node.spans ?? []) === JSON.stringify(spans)) return [];
  return [{ kind: 'setText', id, spans }];
}

/** Resizing a grid child by dragging its edge. Returns [] when the drag would go illegal. */
export function resizeToOps(doc: Document, id: string, edge: 'start' | 'end', deltaCols: number): Op[] {
  const node = doc.nodes[id];
  const parentId = parentOf(doc, id);
  const parent = parentId ? doc.nodes[parentId] : undefined;
  if (!node?.place || !parent || parent.kind !== 'grid') return [];
  const place = grid.solveResize(parent, node.place, edge, deltaCols);
  // A drag that hits the edge of the grid resolves to the placement it already had. Emitting that
  // would put a no-op in the shared history and cost the user an undo that changes nothing.
  if (!place || samePlace(place, node.place)) return [];
  return [{ kind: 'setPlace', id, place }];
}

function samePlace(a: { col: number; span: number; row?: number }, b: { col: number; span: number; row?: number }): boolean {
  return a.col === b.col && a.span === b.span && (a.row ?? null) === (b.row ?? null);
}

function parentOf(doc: Document, id: string): string | null {
  for (const [parentId, node] of Object.entries(doc.nodes)) {
    if ((node.children ?? []).includes(id)) return parentId;
  }
  return null;
}

function isAncestor(doc: Document, ancestor: string, id: string): boolean {
  let current: string | null = id;
  const seen = new Set<string>();
  while (current && !seen.has(current)) {
    seen.add(current);
    if (current === ancestor) return true;
    current = parentOf(doc, current);
  }
  return false;
}
