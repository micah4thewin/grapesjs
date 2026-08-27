/**
 * Stage D3 — the grid constraint solver.
 *
 * Dragging a card produces a span change, never `left: 347px`. The solver is pure and lives in the
 * engine rather than in the canvas, so illegal placements are unrepresentable *at the op level* —
 * a drop that cannot be expressed as a legal placement produces no op at all, instead of producing
 * a placement the UI merely discourages.
 */

import type { Document, Node, Place } from './generated/ir.ts';

export interface DropPoint {
  /** Pointer position within the grid's content box, 0..1 across its width. */
  x: number;
  /** Pointer position within the grid's content box, in rows (0-based, fractional). */
  y: number;
}

export interface Placement extends Place {}

export const MIN_SPAN = 1;
export const MAX_COLS = 12;

export function gridColumns(grid: Node): number {
  const cols = grid.cols ?? MAX_COLS;
  return Math.min(Math.max(Math.trunc(cols), 1), MAX_COLS);
}

/**
 * Snap a drop point to the nearest legal placement in `grid`, preserving the dragged node's span
 * where it fits and shrinking it only as far as the grid allows.
 */
export function solveDrop(doc: Document, gridId: string, point: DropPoint, span: number): Placement | null {
  const grid = doc.nodes[gridId];
  if (!grid || grid.kind !== 'grid') return null;
  const cols = gridColumns(grid);

  const wanted = clamp(Math.trunc(span) || MIN_SPAN, MIN_SPAN, cols);
  // Floor, not round: the placement is the column the pointer is *over*, which is predictable
  // under the pointer. Rounding to the nearest gridline makes the card jump at half-column
  // boundaries, which reads as the editor second-guessing the drag.
  const col = clamp(Math.floor(clamp(point.x, 0, 1) * cols) + 1, 1, cols);
  const start = Math.min(col, cols - wanted + 1);
  const row = Math.max(1, Math.floor(point.y) + 1);

  return { col: start, span: wanted, row };
}

/** Is this placement legal in this grid? The compiler asks the same question in typecheck. */
export function isLegal(grid: Node, place: Place): boolean {
  const cols = gridColumns(grid);
  return (
    Number.isInteger(place.col) &&
    Number.isInteger(place.span) &&
    place.col >= 1 &&
    place.span >= MIN_SPAN &&
    place.col + place.span - 1 <= cols &&
    (place.row === undefined || (Number.isInteger(place.row) && place.row >= 1))
  );
}

/**
 * Resize a placement by dragging an edge. Returns null when the drag would produce something
 * illegal, so the resize handle simply stops rather than the document going invalid.
 */
export function solveResize(grid: Node, place: Place, edge: 'start' | 'end', deltaCols: number): Placement | null {
  const cols = gridColumns(grid);
  const delta = Math.round(deltaCols);
  let { col, span } = place;
  if (edge === 'start') {
    const nextCol = clamp(col + delta, 1, col + span - 1);
    span = span + (col - nextCol);
    col = nextCol;
  } else {
    span = clamp(span + delta, MIN_SPAN, cols - col + 1);
  }
  const next: Placement = { col, span, ...(place.row === undefined ? {} : { row: place.row }) };
  return isLegal(grid, next) ? next : null;
}

/** Which columns in a row are already taken — used to preview a drop, not to forbid overlap. */
export function occupancy(doc: Document, gridId: string, row: number): boolean[] {
  const grid = doc.nodes[gridId];
  const cols = grid ? gridColumns(grid) : MAX_COLS;
  const taken = new Array<boolean>(cols).fill(false);
  if (!grid) return taken;
  for (const childId of grid.children ?? []) {
    const place = doc.nodes[childId]?.place;
    if (!place || (place.row ?? 1) !== row) continue;
    for (let i = place.col - 1; i < place.col - 1 + place.span && i < cols; i++) taken[i] = true;
  }
  return taken;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
