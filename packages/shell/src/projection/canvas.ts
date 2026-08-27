/**
 * Stage C2/C3 — the GrapesJS adapter.
 *
 * The one file in the shell that knows GrapesJS exists. It mounts a [`Projection`] into the canvas
 * with every component locked, wires selection and drag/drop to emit ops, and arms the tripwire.
 * Everything it depends on from GrapesJS is declared in `EditorLike` below, which is both the
 * documentation of what the graft actually needs and — should the Stage C3 gate say "stop
 * grafting" — the list of what a greenfield canvas would have to provide instead.
 */

import type { Document, DocumentStore } from '@lattice/engine';
import { dropToOps, nodeIdFromElement, type DropTarget } from '../gestures.ts';
import { asProjector, createTripwire, guardModel, type TripwireReport } from './tripwire.ts';
import type { Projection, ProjectedNode } from './projector.ts';

/** The slice of the GrapesJS editor the projection needs. Deliberately small. */
export interface EditorLike {
  setComponents(html: string): unknown;
  Css?: { clear(): void };
  getWrapper?(): { find(selector: string): { components?(): unknown[] }[] } | undefined;
  on(event: string, handler: (...args: unknown[]) => void): void;
  off?(event: string, handler: (...args: unknown[]) => void): void;
  select?(component: unknown): void;
  Canvas?: { getDocument(): { querySelector(selector: string): unknown } };
}

export interface MountOptions {
  editor: EditorLike;
  store: DocumentStore;
  tripwire?: TripwireReport;
  /** Locked by default: a projected component is not editable, draggable, or removable in place. */
  locked?: boolean;
}

const LOCKED_ATTRS = {
  editable: false,
  draggable: false,
  droppable: false,
  removable: false,
  copyable: false,
  selectable: true,
  hoverable: true,
};

export class ProjectionCanvas {
  #options: MountOptions;
  #projection: Projection | null = null;
  #tripwire: TripwireReport;

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

  /**
   * Render a projection. The whole tree is replaced on the first mount and on document-wide
   * changes (tokens, routes); Stage C6 patches by node id for everything else.
   */
  mount(projection: Projection): void {
    this.#projection = projection;
    asProjector(() => {
      this.#options.editor.Css?.clear();
      this.#options.editor.setComponents(this.#html(projection));
    });
  }

  /** Patch only the components whose IR nodes changed (Stage C6). */
  patch(projection: Projection, touched: string[]): void {
    const previous = this.#projection;
    this.#projection = projection;
    if (!previous || !touched.length) {
      this.mount(projection);
      return;
    }
    asProjector(() => {
      for (const nodeId of touched) {
        const next = projection.index.get(nodeId);
        const element = this.#options.editor.Canvas?.getDocument().querySelector(`[data-lattice-id="${nodeId}"]`) as
          | { outerHTML: string }
          | undefined;
        if (!element || !next?.length) {
          // Structure changed under us (a node appeared or vanished); a full re-mount is correct
          // and, at this size, still cheap. Fine-grained structural patching is a C6 refinement.
          this.mount(projection);
          return;
        }
        element.outerHTML = renderNode(next[0]);
      }
    });
  }

  /** Wire canvas gestures to ops. Nothing here writes to a component; everything emits. */
  attach(): void {
    const { editor, store } = this.#options;

    editor.on('component:selected', (component: unknown) => {
      const nodeId = idOf(component);
      if (nodeId) this.onSelect?.(nodeId);
    });

    // The drop *effect* is rerouted; the drag ghost, placeholder and sorter geometry are kept.
    editor.on('sorter:drag:end', (event: unknown) => {
      const detail = event as { dragged?: unknown; target?: unknown; index?: number; point?: { x: number; y: number } };
      const draggedId = idOf(detail.dragged);
      const parentId = idOf(detail.target);
      if (!draggedId || !parentId) return;
      const target: DropTarget = { parent: parentId, index: detail.index ?? 0, point: detail.point };
      const ops = dropToOps(store.document, draggedId, target);
      if (ops.length) store.apply(ops);
    });
  }

  onSelect?: (nodeId: string) => void;

  /** Guard every projected model so a stray write is a stack trace, not a mystery. */
  arm(models: { model: unknown; nodeId: string | null }[]): void {
    for (const { model, nodeId } of models) guardModel(model as never, nodeId, this.#tripwire);
  }

  #html(projection: Projection): string {
    const style = `<style>${projection.css}</style>`;
    const body = projection.roots.map(renderNode).join('');
    return `${style}${body}`;
  }
}

function idOf(component: unknown): string | null {
  const model = component as { getAttributes?: () => Record<string, string>; get?: (key: string) => unknown } | null;
  const attrs = model?.getAttributes?.();
  if (attrs?.['data-lattice-id']) return attrs['data-lattice-id'];
  const element = model?.get?.('el') as { getAttribute(name: string): string | null; parentElement: unknown } | undefined;
  return element ? nodeIdFromElement(element) : null;
}

/** Serialize a projected node to the HTML GrapesJS parses, locked attributes included. */
export function renderNode(node: ProjectedNode): string {
  if (node.tag === '#text') return escapeText(node.text ?? '');
  const attrs: string[] = [];
  if (node.nodeId) attrs.push(`data-lattice-id="${node.nodeId}"`);
  if (node.index !== undefined) attrs.push(`data-lattice-index="${node.index}"`);
  if (node.classes.length) attrs.push(`class="${node.classes.join(' ')}"`);
  for (const [key, value] of Object.entries(node.attrs)) attrs.push(`${key}="${escapeAttr(value)}"`);
  const open = `<${node.tag}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`;
  if (['img', 'br', 'hr'].includes(node.tag)) return open;
  return `${open}${node.children.map(renderNode).join('')}</${node.tag}>`;
}

/** The component-type definitions GrapesJS registers, one per IR node kind. */
export function componentTypes(): { id: string; isComponent: (el: { getAttribute?: (n: string) => string | null }) => unknown; model: Record<string, unknown> }[] {
  const kinds = ['section', 'stack', 'grid', 'frame', 'text', 'heading', 'image', 'list', 'instance'];
  return kinds.map((kind) => ({
    id: `lattice-${kind}`,
    isComponent: (el) => {
      const id = el.getAttribute?.('data-lattice-id');
      return id ? { type: `lattice-${kind}`, latticeId: id } : undefined;
    },
    model: {
      defaults: {
        ...LOCKED_ATTRS,
        // Styling a projected component through GrapesJS would write CSS rules into CssComposer,
        // which the projection bypasses entirely. Nothing here has a style manager sector.
        stylable: false,
        highlightable: true,
      },
    },
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

function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(text: string): string {
  return escapeText(text).replace(/"/g, '&quot;');
}
