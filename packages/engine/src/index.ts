/**
 * `@lattice/engine` — the IR, the ops, the store, the constraints.
 *
 * This package has no dependencies and imports nothing from the editor. That is not tidiness: it
 * is the condition under which it can be published MIT and embedded elsewhere, and it is what stops
 * the old document model from creeping back in through a convenience import.
 */

export * from './generated/ir.ts';
export * from './ops.ts';
export * from './store.ts';
export * from './validate.ts';
export * from './persistence.ts';
export * as grid from './grid.ts';
export * as tokens from './tokens.ts';
export * from './wasm-host.ts';
