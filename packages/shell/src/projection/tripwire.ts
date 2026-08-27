/**
 * Stage C3.5 — the tripwire.
 *
 * The graft's whole risk is that Backbone's two-way binding writes back into the projected
 * component tree from somewhere we did not think to intercept — a toolbar, the RTE, a resize
 * handler. Suspecting that is useless; catching it is not. In flags-on dev mode every projected
 * model is wrapped so that any `set`/`add`/`remove` that did not come from the projector throws
 * with a stack trace pointing at the code that did it.
 *
 * This is the instrument the Stage C3 gate is read from: if the tripwire still fires from paths
 * that cannot be cleanly intercepted at the end of the timebox, the plan says stop grafting and
 * rebuild the canvas greenfield. Keeping the instrument honest is therefore load-bearing.
 */

export interface MutableModel {
  set?: (...args: unknown[]) => unknown;
  add?: (...args: unknown[]) => unknown;
  remove?: (...args: unknown[]) => unknown;
  [key: string]: unknown;
}

/**
 * Which model attributes are *document* state rather than view state.
 *
 * A component model carries both: `content` and `components` describe the page, while `status`,
 * `hovered` and `open` describe what the editor is currently showing. Selecting a node writes the
 * second kind on every click, so a tripwire that flagged every `set()` would fire constantly and
 * teach everyone to ignore it — which is the one thing this instrument cannot afford.
 *
 * The list is an allowlist, deliberately: a write we have not thought of goes unflagged rather than
 * drowning the real signal. If a leak is ever found that this list missed, it belongs here.
 */
export const DOCUMENT_KEYS = new Set([
  'content',
  'components',
  'attributes',
  'classes',
  'tagName',
  'type',
  'style',
  'styles',
  'text',
  'src',
  'alt',
  'href',
  'name',
  'void',
]);

function touchesDocument(args: unknown[]): boolean {
  const [first] = args;
  if (typeof first === 'string') return DOCUMENT_KEYS.has(first);
  if (first && typeof first === 'object') return Object.keys(first).some((key) => DOCUMENT_KEYS.has(key));
  return false;
}

export class ProjectionLeak extends Error {
  method: string;
  nodeId: string | null;
  constructor(method: string, nodeId: string | null) {
    super(
      `projection leak: ${method}() was called on projected node ${nodeId ?? '(unknown)'} from outside the projector. ` +
        `The component tree is a projection of the IR, not a source of truth — this edit must be an op instead.`,
    );
    this.method = method;
    this.nodeId = nodeId;
  }
}

let inProjector = 0;

/** The projector wraps its own writes in this; everything else that writes is a leak. */
export function asProjector<T>(work: () => T): T {
  inProjector++;
  try {
    return work();
  } finally {
    inProjector--;
  }
}

export interface TripwireReport {
  leaks: ProjectionLeak[];
  /** Called on every leak. Defaults to throwing; a soft mode is available for triage runs. */
  onLeak: (leak: ProjectionLeak) => void;
}

export function createTripwire(options: { throwOnLeak?: boolean } = {}): TripwireReport {
  const report: TripwireReport = {
    leaks: [],
    onLeak: (leak) => {
      report.leaks.push(leak);
      if (options.throwOnLeak !== false) throw leak;
    },
  };
  return report;
}

const GUARDED = Symbol.for('lattice.guarded');

/**
 * Wrap one projected model, in place, as GrapesJS hands it to us.
 *
 * `set` is filtered through [`DOCUMENT_KEYS`]; `add`/`remove` are structural and always count.
 * Re-guarding a model is a no-op, so re-arming after a re-projection is cheap and safe.
 */
export function guardModel<T extends MutableModel>(model: T, nodeId: string | null, report: TripwireReport): T {
  if (!model || (model as Record<symbol, unknown>)[GUARDED]) return model;
  for (const method of ['set', 'add', 'remove'] as const) {
    const original = model[method];
    if (typeof original !== 'function') continue;
    model[method] = function guarded(this: unknown, ...args: unknown[]) {
      const structural = method !== 'set';
      if (inProjector === 0 && (structural || touchesDocument(args))) {
        report.onLeak(new ProjectionLeak(method, nodeId));
      }
      return (original as (...a: unknown[]) => unknown).apply(this, args);
    };
  }
  try {
    Object.defineProperty(model, GUARDED, { value: true, enumerable: false });
  } catch {
    // A frozen model cannot be marked; guarding it twice is harmless.
  }
  return model;
}
