/**
 * Stage C2 — the projection: the canvas renders the IR without knowing it.
 *
 * The projector does *not* have its own renderer. It asks the compiler (through WASM — the same
 * binary `lattice build` runs) for the route's HTML and turns that into a locked component tree
 * keyed by IR node id. That is the strongest possible answer to Part IV risk 2: the canvas and the
 * export cannot drift, because there is only one renderer and the canvas is looking at its output.
 *
 * Everything projected is locked. The component tree is a disposable projection of the IR, never a
 * source of truth, and nothing may write to it except the projector itself (see tripwire.ts).
 */

import type { Document, Route } from '@lattice/engine';
import { parseBody, serialize, type Element } from './html.ts';

export interface ProjectedNode {
  /** IR node id, or null for text runs and mark elements the compiler generated. */
  nodeId: string | null;
  /** Index within a repeated list, when the node is one item of a bound list. */
  index?: number;
  tag: string;
  classes: string[];
  attrs: Record<string, string>;
  text?: string;
  children: ProjectedNode[];
}

export interface Projection {
  route: string;
  /** The route's critical CSS, exactly as it ships. */
  css: string;
  roots: ProjectedNode[];
  /** node id -> projected node, for click→node and patch-by-id (Stage C6). */
  index: Map<string, ProjectedNode[]>;
  html: string;
}

export interface CompilerLike {
  compile(request: { document: string; data?: string | null; profile?: 'full' | 'fast'; emit_app?: boolean }): {
    ok: boolean;
    files: Record<string, string>;
    diagnostics: { severity: string; code: string; message: string; node: string | null; route: string | null }[];
    route_bytes: Record<string, { html: number; css: number; js: number }>;
  };
}

export class ProjectionError extends Error {
  diagnostics: { code: string; message: string; node: string | null }[];
  constructor(message: string, diagnostics: { code: string; message: string; node: string | null }[] = []) {
    super(message);
    this.diagnostics = diagnostics;
  }
}

export function routeFilePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `${trimmed}/index.html` : 'index.html';
}

/**
 * Project one route. `data` is the record snapshot the canvas shows — real rows, never lorem ipsum
 * (Stage E3); until the backend exists it is a sample file next to the site.
 */
export function projectRoute(
  compiler: CompilerLike,
  doc: Document,
  route: Route | string,
  data?: string | null,
): Projection {
  const path = typeof route === 'string' ? route : route.path;
  const result = compiler.compile({ document: JSON.stringify(doc), data: data ?? null, profile: 'fast', emit_app: false });
  if (!result.ok) {
    const errors = result.diagnostics.filter((d) => d.severity === 'error');
    throw new ProjectionError(
      `route ${path} does not compile; the canvas shows what ships, so it shows nothing until this is fixed`,
      errors,
    );
  }
  const file = routeFilePath(path);
  const html = result.files[file];
  if (html === undefined) throw new ProjectionError(`compiler emitted no page for route ${path}`);

  return fromHtml(path, html);
}

/** Build a projection from a compiled page. Exposed so tests and CI can project without WASM. */
export function fromHtml(path: string, html: string): Projection {
  const body = parseBody(html);
  const roots = body.map(toProjected);
  const index = new Map<string, ProjectedNode[]>();
  const collect = (node: ProjectedNode) => {
    if (node.nodeId) {
      const existing = index.get(node.nodeId);
      if (existing) existing.push(node);
      else index.set(node.nodeId, [node]);
    }
    node.children.forEach(collect);
  };
  roots.forEach(collect);

  return { route: path, css: extractCss(html), roots, index, html };
}

function toProjected(element: Element | string): ProjectedNode {
  if (typeof element === 'string') {
    return { nodeId: null, tag: '#text', classes: [], attrs: {}, text: element, children: [] };
  }
  const { class: className, 'data-lattice-id': nodeId, 'data-lattice-index': index, ...attrs } = element.attrs;
  return {
    nodeId: nodeId ?? null,
    ...(index === undefined ? {} : { index: Number(index) }),
    tag: element.tag,
    classes: className ? className.split(' ').filter(Boolean) : [],
    attrs,
    children: element.children.map(toProjected),
  };
}

function extractCss(html: string): string {
  const start = html.indexOf('<style>');
  const end = html.indexOf('</style>');
  return start < 0 || end < 0 ? '' : html.slice(start + '<style>'.length, end);
}

/** Serialize a projection back to HTML. Equal to the compiled page, byte for byte, or we have a bug. */
export function projectionHtml(projection: Projection): string {
  return serialize(projection.roots.map(toElement));
}

function toElement(node: ProjectedNode): Element | string {
  if (node.tag === '#text') return node.text ?? '';
  const attrs: Record<string, string> = {};
  if (node.nodeId !== null) attrs['data-lattice-id'] = node.nodeId;
  if (node.index !== undefined) attrs['data-lattice-index'] = String(node.index);
  if (node.classes.length) attrs.class = node.classes.join(' ');
  Object.assign(attrs, node.attrs);
  return { tag: node.tag, attrs, children: node.children.map(toElement) };
}

/** Every IR node the route renders, in projection order — used by the parity job. */
export function projectedNodeIds(projection: Projection): string[] {
  return [...projection.index.keys()];
}
