/**
 * Stage C2/C3 — the GrapesJS adapter.
 *
 * The one file in the shell that knows GrapesJS exists. It mounts a [`Projection`] into the canvas,
 * arms the tripwire, and — the part the whole graft turns on — reroutes the *effect* of a drag
 * without touching the drag itself.
 *
 * ## Where the drop is intercepted, and why there
 *
 * Reading `packages/core/src/utils/sorter/`, every structural mutation from a drag funnels through
 * one question: `ComponentSorter.handleNodeAddition` asks `targetNode.canMove(source, index)`, and
 * a `false` answer means the model is never touched (`triggerNullOnEndMove(false)`), while the
 * ghost, the placeholder and the offsets have already done their work. `DropLocationDeterminer`
 * asks the *same* question while the pointer moves, to decide where the placeholder goes.
 *
 * So the interception is: answer truthfully while dragging, refuse at the moment of the drop, and
 * emit an op from the position the sorter had already computed. The drop phase is detected by a
 * capture-phase `pointerup` on the canvas document, which runs before the sorter's own handler.
 *
 * The alternative — let the model move and re-project over it — was rejected: for the duration of
 * a frame the component tree would be a second source of truth, and the tripwire could not tell
 * that write apart from a leak.
 */

import type { Document, DocumentStore, Op } from '@lattice/engine';

/** The DOM `Document`, distinguished from the IR one this module also talks about. */
type Document_ = globalThis.Document;

/** Ops that change the shape of the tree rather than the contents of a node. */
const STRUCTURAL_OPS = new Set(['insertSubtree', 'removeSubtree', 'moveNode', 'setRoute']);
import { dropToOps, nodeIdFromElement, type DropTarget } from '../gestures.ts';
import { asProjector, createTripwire, guardModel, type TripwireReport } from './tripwire.ts';
import type { Projection, ProjectedNode } from './projector.ts';

/** The slice of the GrapesJS editor the projection needs. Deliberately small. */
export interface EditorLike {
  setComponents(html: string): unknown;
  on(event: string, handler: (...args: any[]) => void): void;
  off?(event: string, handler: (...args: any[]) => void): void;
  Css?: { clear(): void };
  Components?: { canMove(target: any, source?: any, index?: number): { result: boolean; reason?: string } };
  Canvas?: { getDocument(): any; getBody?(): any };
  getWrapper?(): any;
}

export interface MountOptions {
  editor: EditorLike;
  store: DocumentStore;
  tripwire?: TripwireReport;
  /** Called for every op batch the canvas produces, before it reaches the store. */
  onOps?: (ops: Op[], reason: string) => void;
}

/**
 * Projected components are locked against *editing*, not against *dragging*: the sorter needs a
 * draggable source and a droppable target to show a ghost and a placeholder at all, and those
 * affordances are exactly what the fork is being kept for. What is locked is everything that would
 * write to the model — editing text in place, removing, copying, styling.
 */
export const LOCKED_ATTRS = {
  editable: false,
  removable: false,
  copyable: false,
  stylable: false,
  draggable: true,
  droppable: true,
  selectable: true,
  hoverable: true,
  highlightable: true,
};

export class ProjectionCanvas {
  #options: MountOptions;
  #projection: Projection | null = null;
  #tripwire: TripwireReport;
  #lastDrag: { parent: string; index: number; point?: { x: number; y: number } } | null = null;
  #dropPhase = false;
  #restore: (() => void)[] = [];
  /** Whether the drop interception is actually in place. Read by the C3 spike; never assumed. */
  interception: 'installed' | 'pending' | 'unavailable' = 'pending';
  /** Counters the spike reads, so a silent tripwire can be told from an unarmed one. */
  readonly stats = {
    pointerUps: 0,
    canMoveCalls: 0,
    canMoveInDropPhase: 0,
    canMoveWithIds: 0,
    intercepted: 0,
    dragEvents: 0,
    dragEnds: 0,
    drops: 0,
    /** What the sorter last said it would do — the spike prints this when a drop produces no op. */
    lastDrag: null as null | { parent: string | null; tag: string | undefined; index: number },
    lastEnd: null as null | { dragged: string | null; target: string | null },
    /** Every distinct parent the sorter offered during the last drag, in order. */
    dragTrail: [] as (string | null)[],
  };

  constructor(options: MountOptions) {
    this.#options = options;
    this.#tripwire = options.tripwire ?? createTripwire();
  }

  get tripwire(): TripwireReport {
    return this.#tripwire;
  }

  get projection(): Projection | null {
    return this.#projection;
  }

  /** Render a projection. Replaces the tree; `patch` handles the incremental case (Stage C6). */
  mount(projection: Projection): void {
    this.#projection = projection;
    asProjector(() => {
      this.#options.editor.Css?.clear();
      this.#options.editor.setComponents(this.#html(projection));
    });
  }

  /**
   * Apply one store change to the canvas, choosing between a patch and a re-mount.
   *
   * A structural op (insert, remove, move) changes the shape of the tree, and patching DOM under
   * GrapesJS would leave its component models pointing at elements that no longer exist — a
   * second, stale source of truth, which is the thing this whole design exists to avoid. So
   * structure re-mounts and everything else patches.
   */
  applyChange(projection: Projection, change: { touched: string[]; ops: { op: { kind: string } }[] }): void {
    const structural = change.ops.some(({ op }) => STRUCTURAL_OPS.has(op.kind));
    if (structural) this.mount(projection);
    else this.patch(projection, change.touched);
  }

  /** Patch only the components whose IR nodes changed (Stage C6). */
  patch(projection: Projection, touched: string[]): void {
    const previous = this.#projection;
    this.#projection = projection;
    if (!previous || !touched.length) {
      this.mount(projection);
      return;
    }
    let remount = false;
    asProjector(() => {
      for (const nodeId of touched) {
        const next = projection.index.get(nodeId);
        const element = this.#options.editor.Canvas?.getDocument()?.querySelector(
          `[data-lattice-id="${cssEscape(nodeId)}"]`,
        );
        if (!element || !next?.length) {
          // Structure changed under us (a node appeared or vanished). A full re-mount is correct;
          // finer structural patching is a C6 refinement, not a correctness question.
          remount = true;
          return;
        }
        element.outerHTML = renderNode(next[0]);
      }
    });
    if (remount) this.mount(projection);
  }

  /**
   * Wire canvas gestures to ops and install the drop interception. Returns a teardown function so
   * the flag can be turned off at runtime without reloading the editor.
   */
  attach(): () => void {
    const { editor, store } = this.#options;

    const onSelected = (component: unknown) => {
      const nodeId = idOf(component);
      if (nodeId) this.onSelect?.(nodeId);
    };
    editor.on('component:selected', onSelected);
    this.#restore.push(() => editor.off?.('component:selected', onSelected));

    // The sorter reports, continuously, the position it would drop into — `{ targetModel, pos, x, y }`
    // (see DropLocationDeterminer.triggerMoveEvent). That is the position under the placeholder the
    // user is looking at, so it is the position the op must use.
    const onDrag = (payload: any) => {
      this.stats.dragEvents++;
      const parent = idOf(payload?.targetModel);
      this.stats.lastDrag = {
        parent,
        tag: payload?.targetModel?.get?.('tagName') ?? payload?.target?.tagName,
        index: payload?.pos?.index ?? -1,
      };
      const trail = this.stats.dragTrail;
      if (trail[trail.length - 1] !== parent) trail.push(parent);
      // A position over something that is not an IR node clears the pending drop rather than
      // leaving the last good one standing: releasing there must do nothing, not quietly land the
      // card wherever it was a second ago.
      this.#lastDrag = parent ? { parent, index: payload?.pos?.index ?? 0, point: pointOf(payload) } : null;
    };
    editor.on('sorter:drag', onDrag);
    this.#restore.push(() => editor.off?.('sorter:drag', onDrag));

    const onDragEnd = (payload: any) => {
      this.stats.dragEnds++;
      const draggedId = idOf(payload?.modelToDrop ?? payload?.validResult?.srcModel);
      const fallbackParent = idOf(payload?.validResult?.trgModel);
      this.stats.lastEnd = { dragged: draggedId, target: fallbackParent };
      const target = this.#lastDrag ?? (fallbackParent ? { parent: fallbackParent, index: 0 } : null);
      this.#lastDrag = null;
      this.#dropPhase = false;
      if (!draggedId || !target) return;
      const dropTarget: DropTarget = { parent: target.parent, index: target.index, point: target.point };
      this.stats.drops++;
      const ops = dropToOps(store.document, draggedId, dropTarget);
      if (!ops.length) return;
      this.#options.onOps?.(ops, 'drop');
      store.apply(ops);
    };
    editor.on('sorter:drag:end', onDragEnd);
    this.#restore.push(() => editor.off?.('sorter:drag:end', onDragEnd));

    this.#interceptDrop();
    if (this.interception !== 'installed') {
      // The canvas iframe may not exist yet when the editor is first created. Installing on frame
      // load as well means the interception is never quietly absent — which would look exactly
      // like a clean graft while every drag mutated the model.
      const onFrameLoad = () => this.#interceptDrop();
      editor.on('canvas:frame:load', onFrameLoad);
      editor.on('load', onFrameLoad);
      this.#restore.push(() => {
        editor.off?.('canvas:frame:load', onFrameLoad);
        editor.off?.('load', onFrameLoad);
      });
    }
    return () => {
      for (const undo of this.#restore.splice(0)) undo();
    };
  }

  onSelect?: (nodeId: string) => void;

  /**
   * The drop interception itself: refuse the model move at the instant of the drop, having already
   * let the sorter compute and display where it would go.
   */
  #interceptDrop(): void {
    if (this.interception === 'installed') return;
    const { editor } = this.#options;
    const components = editor.Components;
    let canvasDocument: any;
    try {
      canvasDocument = editor.Canvas?.getDocument();
    } catch {
      canvasDocument = undefined;
    }
    if (!components) {
      this.interception = 'unavailable';
      return;
    }
    if (!canvasDocument) {
      this.interception = 'pending';
      return;
    }

    const onPointerUp = () => {
      this.stats.pointerUps++;
      this.#dropPhase = true;
      // The flag lives for one turn of the event loop: long enough for the sorter's mouseup
      // handler, short enough that nothing else is affected by it.
      setTimeout(() => {
        this.#dropPhase = false;
      }, 0);
    };
    // Both documents, deliberately. The canvas is an iframe, but GrapesJS floats its tools layer
    // above it in the host document, so depending on where the pointer is released the event may
    // never reach the frame. Listening in only one place is how a drop slips past the
    // interception and mutates the model — which is exactly what the spike caught.
    const documents = [canvasDocument, typeof document === 'undefined' ? null : document].filter(
      Boolean,
    ) as Document_[];
    for (const target of documents) {
      target.addEventListener('pointerup', onPointerUp, true);
      target.addEventListener('mouseup', onPointerUp, true);
    }
    this.#restore.push(() => {
      for (const target of documents) {
        target.removeEventListener('pointerup', onPointerUp, true);
        target.removeEventListener('mouseup', onPointerUp, true);
      }
    });

    const original = components.canMove.bind(components);
    components.canMove = (target: any, source?: any, index?: number) => {
      const answer = original(target, source, index);
      this.stats.canMoveCalls++;
      if (this.#dropPhase) this.stats.canMoveInDropPhase++;
      if (idOf(target) && idOf(source)) this.stats.canMoveWithIds++;
      if (!this.#dropPhase || !answer.result) return answer;
      // The *source* is what matters, not the target: a projected component may never be moved by
      // the model layer, wherever it was released. A drop onto something that is not an IR node
      // (the wrapper, the body) is simply not expressible, so it does nothing at all — which is
      // also the honest behaviour, rather than silently reparenting to the page root.
      if (!idOf(source)) return answer;
      this.stats.intercepted++;
      return { ...answer, result: false, reason: 'lattice.intercepted' };
    };
    this.#restore.push(() => {
      components.canMove = original;
    });
    this.interception = 'installed';
  }

  /** Guard every projected model so a stray write is a stack trace, not a mystery. */
  arm(models: { model: unknown; nodeId: string | null }[]): void {
    for (const { model, nodeId } of models) guardModel(model as never, nodeId, this.#tripwire);
  }

  /** Walk the editor's component tree and arm everything that carries a node id. */
  armAll(): number {
    const wrapper = this.#options.editor.getWrapper?.();
    if (!wrapper) return 0;
    const models: { model: unknown; nodeId: string | null }[] = [];
    const walk = (component: any) => {
      const nodeId = idOf(component);
      if (nodeId) models.push({ model: component, nodeId });
      const children = component.components?.();
      // The children collection is where a structural write lands, so it is guarded too.
      if (children) {
        models.push({ model: children, nodeId });
        children.forEach?.(walk);
      }
    };
    wrapper.components?.().forEach?.(walk);
    this.arm(models);
    return models.length;
  }

  #html(projection: Projection): string {
    return `<style>${projection.css}</style>${projection.roots.map(renderNode).join('')}`;
  }
}

/**
 * Normalise the sorter's pointer position into the target's content box: 0..1 across, rows down.
 * That is the shape the grid solver takes, and the only geometry the ops layer ever sees — no
 * pixel ever reaches the document.
 */
function pointOf(payload: any): { x: number; y: number } | undefined {
  const element = payload?.target;
  const rect = element?.getBoundingClientRect?.();
  if (!rect?.width || typeof payload?.x !== 'number') return undefined;
  return {
    x: (payload.x - rect.left) / rect.width,
    y: rect.height ? (payload.y - rect.top) / rect.height : 0,
  };
}

function idOf(component: unknown): string | null {
  const model = component as { getAttributes?: () => Record<string, string>; get?: (key: string) => unknown } | null;
  const attrs = model?.getAttributes?.();
  if (attrs?.['data-lattice-id']) return attrs['data-lattice-id'];
  const element = model?.get?.('el') as
    | { getAttribute(name: string): string | null; parentElement: unknown }
    | undefined;
  return element?.getAttribute ? nodeIdFromElement(element) : null;
}

/**
 * Serialize a projected node to the HTML GrapesJS parses.
 *
 * `data-gjs-type` is how each element claims its component type. It exists only in the canvas —
 * the page the compiler ships carries no editor metadata beyond the node id — and it is what makes
 * per-kind rules real: a heading is not a drop target, a grid is.
 */
export function renderNode(node: ProjectedNode): string {
  if (node.tag === '#text') return escapeText(node.text ?? '');
  const attrs: string[] = [];
  if (node.nodeId) attrs.push(`data-lattice-id="${node.nodeId}"`);
  if (node.kind) attrs.push(`data-gjs-type="lattice-${node.kind}"`);
  if (node.index !== undefined) attrs.push(`data-lattice-index="${node.index}"`);
  if (node.classes.length) attrs.push(`class="${node.classes.join(' ')}"`);
  for (const [key, value] of Object.entries(node.attrs)) attrs.push(`${key}="${escapeAttr(value)}"`);
  const open = `<${node.tag}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`;
  if (['img', 'br', 'hr'].includes(node.tag)) return open;
  return `${open}${node.children.map(renderNode).join('')}</${node.tag}>`;
}

/**
 * One GrapesJS component type per IR node kind, all locked against model writes.
 *
 * Only container kinds are droppable, so the placeholder never offers a position the IR cannot
 * express. The op layer refuses those drops anyway (`canContain`), but an affordance that promises
 * something the document will reject is its own bug.
 */
export function componentTypes(): { id: string; isComponent: (el: any) => unknown; model: Record<string, unknown> }[] {
  const kinds = ['section', 'stack', 'grid', 'frame', 'text', 'heading', 'image', 'list', 'instance'] as const;
  const containers = new Set(['section', 'stack', 'grid', 'frame', 'list']);
  return kinds.map((kind) => ({
    id: `lattice-${kind}`,
    // Types are claimed by `data-gjs-type` on the projected element, not guessed from the DOM:
    // an `isComponent` that matched every addressed element would give every node whichever type
    // happened to be registered last, and with it that type's drop rules.
    isComponent: (el: any) => el?.getAttribute?.('data-gjs-type') === `lattice-${kind}`,
    model: { defaults: { ...LOCKED_ATTRS, droppable: containers.has(kind) } },
  }));
}

/** The projection is only correct if the document it came from is the one in the store. */
export function assertProjectionMatches(projection: Projection, doc: Document): void {
  for (const nodeId of projection.index.keys()) {
    if (!doc.nodes[nodeId]) {
      throw new Error(`projection shows node ${nodeId}, which is not in the document — the canvas is stale`);
    }
  }
}

function cssEscape(value: string): string {
  return value.replace(/["\\]/g, '\\$&');
}

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(text: string): string {
  return escapeText(text).replace(/"/g, '&quot;');
}
