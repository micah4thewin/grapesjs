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

/** Wrap one projected model. Returns the model, mutated in place, as GrapesJS hands it to us. */
export function guardModel<T extends MutableModel>(model: T, nodeId: string | null, report: TripwireReport): T {
  for (const method of ['set', 'add', 'remove'] as const) {
    const original = model[method];
    if (typeof original !== 'function') continue;
    model[method] = function guarded(this: unknown, ...args: unknown[]) {
      if (inProjector === 0) report.onLeak(new ProjectionLeak(method, nodeId));
      return (original as (...a: unknown[]) => unknown).apply(this, args);
    };
  }
  return model;
}
