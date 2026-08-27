/**
 * `@lattice/shell` — the editor app: flags, projection, gesture capture.
 *
 * The shell is the only package that composes the engine with the GrapesJS fork. The engine never
 * imports from here, and nothing here is a source of truth: the document lives in the store, the
 * pixels come from the compiler, and this package is the wiring between them.
 */

export * from './flags.ts';
export * from './gestures.ts';
export * from './projection/projector.ts';
export * from './projection/tripwire.ts';
export * from './projection/canvas.ts';
export * as html from './projection/html.ts';
