/**
 * Stage C6 — coalescing op batches into projections.
 *
 * Every op could trigger a recompile, and on a 2,000-node page that costs ~28ms at p95
 * (`scripts/lattice/bench.mjs`), which is two frames per keystroke. Ops arrive in bursts — a drag
 * is dozens, typing is one per commit but tokens fan out across the page — so the projector
 * consumes *batches*: schedule on the first change, coalesce everything that arrives before the
 * frame lands, project once.
 *
 * The op itself stays synchronous and immediate; it is only the picture that waits, by at most one
 * scheduling tick.
 */

export interface Batch<TChange> {
  changes: TChange[];
  touched: string[];
  structural: boolean;
}

export interface SchedulerOptions<TChange> {
  /** Called once per coalesced batch. */
  project: (batch: Batch<TChange>) => void;
  isStructural: (change: TChange) => boolean;
  touchedOf: (change: TChange) => string[];
  /** Defaults to `requestAnimationFrame`, or a 16ms timer where there is no frame loop. */
  schedule?: (run: () => void) => unknown;
}

export class ProjectionScheduler<TChange> {
  #options: SchedulerOptions<TChange>;
  #pending: TChange[] = [];
  #scheduled = false;

  constructor(options: SchedulerOptions<TChange>) {
    this.#options = options;
  }

  get pending(): number {
    return this.#pending.length;
  }

  push(change: TChange): void {
    this.#pending.push(change);
    if (this.#scheduled) return;
    this.#scheduled = true;
    const schedule =
      this.#options.schedule ??
      ((run: () => void) =>
        typeof requestAnimationFrame === 'function' ? requestAnimationFrame(() => run()) : setTimeout(run, 16));
    schedule(() => this.flush());
  }

  /** Project now, whatever is pending. Called by the scheduler, or directly before a save. */
  flush(): void {
    this.#scheduled = false;
    const changes = this.#pending.splice(0);
    if (!changes.length) return;
    const touched = new Set<string>();
    let structural = false;
    for (const change of changes) {
      if (this.#options.isStructural(change)) structural = true;
      for (const id of this.#options.touchedOf(change)) touched.add(id);
      // An empty touched list means "document-wide"; the batch inherits that.
      if (!this.#options.touchedOf(change).length) structural = true;
    }
    this.#options.project({ changes, touched: [...touched], structural });
  }
}
