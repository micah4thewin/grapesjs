/**
 * Stage A4 — the feature-flag rail.
 *
 * Every graft lands dark. The shell boots in "pure GrapesJS" mode and in "flags-on" mode from the
 * same build, so a half-finished organ transplant is never the only way to run the editor, and each
 * stage's exit gate is a flag flip rather than a merge.
 *
 * Flags are removed when the stage they guard is done and its legacy path is deleted (Stage H) —
 * a flag that outlives its cutover is just a second product to maintain.
 */

export interface Flags {
  /** Stage C: the IR store is the source of truth; the component tree is a projection of it. */
  irSourceOfTruth: boolean;
  /** Stage C2/C3: canvas renders compiler output and gestures emit ops. Requires irSourceOfTruth. */
  compiledPreview: boolean;
  /** Stage C3.5: throw on any write to a projected model that did not come from the projector. */
  projectionTripwire: boolean;
  /** Stage C4: ⌘Z routes to the engine's ops-log undo instead of GrapesJS's UndoManager. */
  opsUndo: boolean;
  /** Stage C5: persistence is the ops log (IndexedDB + sync), not StorageManager's project JSON. */
  opsPersistence: boolean;
  /** Stage D1/D2: token-constrained property panels replace StyleManager's open sectors. */
  tokenPanels: boolean;
  /** Stage D2: the design-debt panel, counting every `escape` in the document. */
  designDebtPanel: boolean;
  /** Stage D5: live budget meter, compiled through WASM on idle. */
  performanceMeter: boolean;
  /** Stage E3: bound nodes render real records on canvas instead of placeholders. */
  realDataOnCanvas: boolean;
}

export const LEGACY: Flags = {
  irSourceOfTruth: false,
  compiledPreview: false,
  projectionTripwire: false,
  opsUndo: false,
  opsPersistence: false,
  tokenPanels: false,
  designDebtPanel: false,
  performanceMeter: false,
  realDataOnCanvas: false,
};

/** What the transformation is heading toward; the default once each stage's exit gate passes. */
export const LATTICE: Flags = {
  irSourceOfTruth: true,
  compiledPreview: true,
  projectionTripwire: true,
  opsUndo: true,
  opsPersistence: true,
  tokenPanels: true,
  designDebtPanel: true,
  performanceMeter: true,
  realDataOnCanvas: true,
};

export interface FlagOverrides extends Partial<Flags> {}

/**
 * Resolve flags from defaults, explicit overrides, and (in a browser) `?lattice=flag,flag` so a
 * bug report can name the exact configuration it was seen in.
 */
export function resolveFlags(base: Flags = LEGACY, overrides: FlagOverrides = {}, search?: string): Flags {
  const flags: Flags = { ...base, ...overrides };
  const query = search ?? (typeof location === 'undefined' ? '' : location.search);
  const requested = new URLSearchParams(query).get('lattice');
  if (requested === 'on') return { ...LATTICE, ...overrides };
  if (requested === 'off') return { ...LEGACY, ...overrides };
  for (const name of requested?.split(',').filter(Boolean) ?? []) {
    const key = name.trim() as keyof Flags;
    if (key in flags) flags[key] = true;
  }
  return enforce(flags);
}

/**
 * Some flags are meaningless alone: a compiled preview with the old source of truth would render a
 * document nobody is editing. Rather than let that combination exist, it is corrected here.
 */
export function enforce(flags: Flags): Flags {
  const resolved = { ...flags };
  if (!resolved.irSourceOfTruth) {
    resolved.compiledPreview = false;
    resolved.opsUndo = false;
    resolved.opsPersistence = false;
    resolved.realDataOnCanvas = false;
    resolved.projectionTripwire = false;
  }
  if (!resolved.compiledPreview) {
    resolved.performanceMeter = false;
  }
  return resolved;
}

export function describe(flags: Flags): string {
  const on = Object.entries(flags).filter(([, value]) => value).map(([key]) => key);
  return on.length ? `lattice flags on: ${on.join(', ')}` : 'lattice flags: none (pure GrapesJS)';
}
