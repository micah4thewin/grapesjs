/**
 * The C3 spike harness: a real GrapesJS editor, flags on, showing a projection of a real corpus
 * site, with the tripwire armed and every gesture routed through the op layer.
 *
 * This is not the product shell. It is the smallest thing that can answer the question the plan
 * gates on — *does Backbone's two-way binding write back through paths we cannot intercept?* — and
 * it exposes `window.lattice` so a headless driver can run a scripted session and read the answer.
 */

import {
  DocumentStore,
  IndexedDbOpLogStorage,
  LatticeCompiler,
  MemoryOpLogStorage,
  SessionPersistence,
  Validator,
  grid,
  restore,
} from '@lattice/engine';
import type { Change, Document, Node, Op } from '@lattice/engine';
import { projectRoute } from '../src/projection/projector.ts';
import { ProjectionScheduler } from '../src/projection/scheduler.ts';
import { ProjectionCanvas, componentTypes } from '../src/projection/canvas.ts';
import { createTripwire } from '../src/projection/tripwire.ts';
import { blockToOps, dropToOps, resizeToOps, textCommitToOps } from '../src/gestures.ts';
import { LATTICE, describe } from '../src/flags.ts';
import { BLOCKS, Shell } from './ui.ts';

declare const grapesjs: any;

const status = document.getElementById('status')!;
const say = (html: string) => {
  status.innerHTML = html;
};

/**
 * The shell loads its schema, site, records and compiler from files next to it — or, in a
 * single-file build, from an inlined payload. Same code either way: one build serves the dev
 * server, the headless spike, and a page that has to run with nothing beside it.
 */
interface InlinePayload {
  schema: unknown;
  site: unknown;
  data: string | null;
  wasmBase64: string;
}
const inline = (window as unknown as { __LATTICE_INLINE__?: InlinePayload }).__LATTICE_INLINE__;

const decodeBase64 = (value: string) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const [schema, site, wasm, records] = inline
  ? [inline.schema, inline.site, decodeBase64(inline.wasmBase64), inline.data]
  : await Promise.all([
      fetch('./schema.json').then((r) => r.json()),
      fetch('./site.json').then((r) => r.json()),
      fetch('./compiler.wasm').then((r) => r.arrayBuffer()),
      // Stage E3: real rows on the canvas from the first minute. Absent for sites without collections.
      fetch('./data.json')
        .then((r) => (r.ok ? r.text() : null))
        .catch(() => null),
    ]);

const compiler = await LatticeCompiler.fromBytes(wasm as BufferSource);
const validator = new Validator(schema as Record<string, unknown>);

// Stage C5: the durable thing is the op log. A reload picks the session back up from IndexedDB;
// `?fresh=1` starts over, which is how the spike separates "recovered" from "never happened".
// Where IndexedDB is unavailable or blocked (a sandboxed frame, a browser set to block site data),
// the session runs in memory: everything works, nothing survives the tab.
const stage = (name: string) => ((window as unknown as { __latticeStage?: string }).__latticeStage = name);

stage('storage');
const storage = await openStorage();
if (new URLSearchParams(location.search).has('fresh')) {
  stage('clear');
  await settle(storage.clear(), undefined, 'clearing the stored session');
}
stage('restore');
const restored = await settle(
  restore(storage, site as Document, { validator: { validator } }),
  { store: new DocumentStore(site as Document, { validator }), recoveredOps: 0 },
  'reading the stored session',
);
stage('editor');
const store = restored.store;
const persistence = new SessionPersistence(store, storage, { onError: (error) => console.error('persistence', error) });
persistence.start();
const tripwire = createTripwire({ throwOnLeak: false }); // soft: a spike lists every leak, it does not stop at the first
const flags = LATTICE;

/**
 * Persistence must never be able to stop the editor from starting.
 *
 * IndexedDB does not only fail — it *hangs*: a blocked upgrade, a private window, a sandboxed
 * frame, a browser set to block site data. An editor that waits forever on storage is worse than
 * one that forgets, so every call is raced against a short timeout and the session falls back to
 * memory: everything works, nothing survives the tab.
 */
async function settle<T>(work: Promise<T>, fallback: T, what: string, ms = 1500): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<T>((resolve) => {
        timer = setTimeout(() => {
          console.warn(`lattice: ${what} did not answer in ${ms}ms; continuing without it`);
          resolve(fallback);
        }, ms);
      }),
    ]);
  } catch (error) {
    console.warn(`lattice: ${what} failed`, error);
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

async function openStorage() {
  const candidate = new IndexedDbOpLogStorage('lattice-shell');
  // Probing forces the database open, and any failure or hang, to happen here rather than mid-edit.
  const probe = await settle(
    candidate.loadSnapshot().then(() => true),
    false,
    'opening the session store',
  );
  return probe ? candidate : new MemoryOpLogStorage();
}

const editor = grapesjs.init({
  container: '#canvas',
  height: '100%',
  fromElement: false,
  storageManager: false,
  undoManager: false, // Stage C4: history is the op log, not Backbone change tracking
  panels: { defaults: [] },
  styleManager: { sectors: [] }, // Stage D2: no open CSS sectors; panels come from the schema
  components: '',
  canvas: { scripts: [], styles: [] },
  // Two upstream defaults a Lattice shell has to turn off: the icon font is fetched from a CDN,
  // and the editor phones home. An editor that cannot boot on a plane, or that reports on the
  // person using it, contradicts the thing being built.
  cssIcons: '',
  telemetry: false,
});

for (const type of componentTypes()) {
  editor.DomComponents.addType(type.id, { isComponent: type.isComponent, model: type.model });
}

const canvas = new ProjectionCanvas({ editor, store, tripwire, onOps: (ops, reason) => record(reason, ops) });
const emitted: { reason: string; ops: Op[] }[] = [];
const record = (reason: string, ops: Op[]) => {
  emitted.push({ reason, ops });
  report();
};

let selected: string | null = null;
let activeRoute = store.document.routes[0].path;
canvas.onSelect = (nodeId) => {
  selected = nodeId;
  shell.render();
  report();
};

let lastGood: ReturnType<typeof projectRoute> | null = null;
let lastErrors: { code: string; message: string; node: string | null }[] = [];
let lastBytes: Record<string, { html: number; css: number; js: number; images?: number }> | null = null;

/**
 * Project the active route. If the document does not compile, the canvas keeps showing the last
 * page that did and surfaces the diagnostics — a canvas that throws is a canvas that loses the
 * session, and the errors name the node anyway.
 */
function project() {
  const route = activeRoute;
  try {
    lastGood = projectRoute(compiler, store.document, route, records);
    lastErrors = [];
    lastBytes = compiler.compile({
      document: JSON.stringify(store.document),
      data: records,
      profile: 'fast',
    }).route_bytes;
    return lastGood;
  } catch (error: any) {
    lastErrors = error?.diagnostics ?? [{ code: 'projection', message: String(error), node: null }];
    if (!lastGood) throw error;
    return lastGood;
  }
}

/** Stage D5 — the budget meter, from the same compile the canvas is showing. */
/** The files this document would ship, from the same compiler the canvas is showing. */
function shippedFiles(): { path: string; bytes: number; content: string }[] {
  const result = compiler.compile({
    document: JSON.stringify(store.document),
    data: records,
    profile: 'full',
    emit_app: true,
  });
  if (!result.ok) return [];
  return Object.entries(result.files)
    .map(([path, content]) => ({ path, bytes: new TextEncoder().encode(content).length, content }))
    .sort((a, b) => (a.path < b.path ? -1 : 1));
}

function currentBytes() {
  if (!lastBytes) return null;
  return lastBytes[activeRoute] ?? Object.values(lastBytes)[0] ?? null;
}

function budgetLine(): string {
  const bytes = lastBytes;
  if (!bytes) return 'budget: —';
  const entry = bytes[activeRoute] ?? Object.values(bytes)[0];
  if (!entry) return 'budget: —';
  const kb = (entry.html + entry.css + entry.js + (entry.images ?? 0)) / 1024;
  return `budget: ${kb.toFixed(1)}KB of 500KB (html ${(entry.html / 1024).toFixed(1)}KB, css ${(entry.css / 1024).toFixed(1)}KB)`;
}

function report() {
  const leaks = tripwire.leaks.length;
  const errors = lastErrors.length;
  say(
    [
      'flags: lattice',
      `${canvas.projection?.index.size ?? 0} nodes`,
      `${emitted.reduce((n, e) => n + e.ops.length, 0)} ops`,
      `<span class="${leaks ? 'warn' : 'ok'}">tripwire ${leaks ? `${leaks} leak(s)` : 'clean'}</span>`,
      `<span class="${errors ? 'warn' : 'ok'}">compiler ${errors ? `${errors} error(s)` : 'clean'}</span>`,
      `${persistence.pending.length} unsent`,
      budgetLine(),
    ].join(' &nbsp;·&nbsp; '),
  );
  const undoButton = document.getElementById('undo') as HTMLButtonElement | null;
  const redoButton = document.getElementById('redo') as HTMLButtonElement | null;
  if (undoButton) undoButton.disabled = !store.canUndo;
  if (redoButton) redoButton.disabled = !store.canRedo;
}

/** The chrome: structure, palette, inspector, debt, meter. Every control emits an op. */
const shell = new Shell({
  document: () => store.document,
  issues: () => lastErrors,
  shipped: () => shippedFiles(),
  selected: () => selected,
  activeRoute: () => activeRoute,
  routeBytes: () => currentBytes(),
  apply: (ops, reason) => {
    record(reason, ops);
    store.apply(ops);
    scheduler.flush();
    shell.render();
  },
  select: (nodeId) => {
    const component = findComponent(nodeId);
    if (component) editor.select(component);
    selected = nodeId;
    shell.render();
    report();
  },
  setRoute: (path) => {
    activeRoute = path;
    selected = null;
    canvas.mount(project());
    canvas.armAll();
    shell.render();
    report();
  },
  insertBlock: (name) => {
    const fragment = BLOCKS[name];
    const parent = pickInsertParent(fragment);
    if (!fragment || !parent) return;
    let n = 0;
    const ops = blockToOps(
      store.document,
      fragment,
      { parent, index: 999, point: { x: 0.02, y: 0 } },
      () => `b${Date.now().toString(36)}-${++n}`,
    );
    if (!ops.length) return;
    record('block', ops);
    store.apply(ops);
    scheduler.flush();
    shell.render();
  },
});

/**
 * Where a palette block lands when it is clicked rather than dragged: the selected container, the
 * selected node's parent, or the route root. A grid fragment never nests inside a grid.
 */
function pickInsertParent(fragment: { root: string; nodes: Node[] } | undefined): string | null {
  const doc = store.document;
  const root = doc.routes.find((r) => r.path === activeRoute)?.root ?? doc.routes[0].root;
  const containerKinds = ['section', 'stack', 'grid', 'frame'];
  const parentOf = (id: string) =>
    Object.values(doc.nodes).find((node) => (node.children ?? []).includes(id))?.id ?? null;

  const candidates = [selected, selected ? parentOf(selected) : null, root].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const node = doc.nodes[candidate];
    if (!node || !containerKinds.includes(node.kind)) continue;
    // A grid child needs a placement; the fragment's root carries one only for grid-shaped blocks.
    const rootNode = fragment?.nodes.find((n) => n.id === fragment.root);
    if (node.kind === 'grid' && rootNode?.kind === 'grid') continue;
    return candidate;
  }
  return root;
}

canvas.mount(project());
canvas.attach();
canvas.armAll();
shell.render();
editWordsOnCanvas();
// The canvas iframe loads asynchronously; binding only once, at boot, binds to nothing. This is
// the same lesson the drop interception learned — a handler that silently never attached looks
// exactly like a feature that silently does not work.
editor.on('canvas:frame:load', () => editWordsOnCanvas());
editor.on('load', () => editWordsOnCanvas());

/**
 * Double-click to write. The text goes through `contenteditable` on the projected element and
 * commits **one op** on blur or Enter — the same boundary the RTE will use when it is swapped
 * (Part IV risk 4), and the reason a paragraph edited for a minute is one entry in the shared
 * history rather than sixty.
 *
 * GrapesJS's own editor never engages: projected components are `editable: false`, so nothing here
 * writes to a model and the tripwire stays quiet. What the element shows between double-click and
 * commit is a scratch DOM state that the next projection overwrites.
 */
function editWordsOnCanvas(): void {
  const canvasDocument = editor.Canvas?.getDocument?.();
  if (!canvasDocument || canvasDocument.__latticeWordsBound) return;
  canvasDocument.__latticeWordsBound = true;

  // Capture phase: GrapesJS's own handlers sit on the frame and would otherwise get first refusal.
  canvasDocument.addEventListener(
    'dblclick',
    (event: Event) => {
      const target = (event.target as Element)?.closest?.('[data-lattice-id]') as HTMLElement | null;
      const nodeId = target?.getAttribute('data-lattice-id');
      if (!target || !nodeId) return;
      const node = store.document.nodes[nodeId];
      if (!node || (node.kind !== 'text' && node.kind !== 'heading')) return;
      if (node.bind) {
        // A bound node renders a record. Typing here would edit the template for every row, which is
        // never what the gesture means; Stage E3 makes "edit the record" its own explicit path.
        say('this text comes from a record — edit the record, not the template');
        return;
      }

      const original = target.textContent ?? '';
      target.setAttribute('contenteditable', 'plaintext-only');
      target.focus();
      canvasDocument.getSelection?.()?.selectAllChildren?.(target);

      const finish = (commit: boolean) => {
        target.removeAttribute('contenteditable');
        const text = (target.textContent ?? '').trim();
        if (!commit || text === original.trim()) {
          target.textContent = original;
          return;
        }
        const ops = textCommitToOps(store.document, nodeId, [{ text }]);
        if (!ops.length) return;
        record('text', ops);
        store.apply(ops);
        scheduler.flush();
        shell.render();
      };

      target.addEventListener('blur', () => finish(true), { once: true });
      target.addEventListener('keydown', ((keyEvent: KeyboardEvent) => {
        if (keyEvent.key === 'Enter' && !keyEvent.shiftKey) {
          keyEvent.preventDefault();
          target.blur();
        }
        if (keyEvent.key === 'Escape') {
          keyEvent.preventDefault();
          finish(false);
          target.blur();
        }
      }) as EventListener);
    },
    true,
  );
}

document.getElementById('shipped-toggle')?.addEventListener('click', () => shell.toggleShipped());
document.getElementById('undo')!.addEventListener('click', () => {
  store.undo();
  scheduler.flush();
  shell.render();
});
document.getElementById('redo')!.addEventListener('click', () => {
  store.redo();
  scheduler.flush();
  shell.render();
});
// ⌘Z routes to the engine's history, not GrapesJS's UndoManager (Stage C4).
window.addEventListener('keydown', (event) => {
  if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'z') return;
  event.preventDefault();
  if (event.shiftKey) store.redo();
  else store.undo();
  scheduler.flush();
  shell.render();
});

// Ops are immediate; the picture is coalesced. A drag is dozens of ops and should cost one
// projection, not dozens (Stage C6).
const scheduler = new ProjectionScheduler<Change>({
  project: (batch) => {
    const projection = project();
    if (batch.structural) canvas.mount(projection);
    else canvas.patch(projection, batch.touched);
    canvas.armAll();
    editWordsOnCanvas();
    shell.render();
    report();
  },
  isStructural: (change) =>
    change.ops.some(({ op }) => ['insertSubtree', 'removeSubtree', 'moveNode', 'setRoute'].includes(op.kind)),
  touchedOf: (change) => change.touched,
});
store.subscribe((change) => scheduler.push(change));

report();

/** The scripted-session API the headless driver drives. Nothing here is product surface. */
Object.assign(window as any, {
  lattice: {
    flags,
    get document() {
      return store.document;
    },
    get ops() {
      return emitted;
    },
    get errors() {
      return lastErrors;
    },
    get persistence() {
      return { recovered: restored.recoveredOps, pending: persistence.pending.length };
    },
    async settled() {
      await persistence.settled();
      return true;
    },
    budget: () => lastBytes,
    shipped: () => shippedFiles(),
    get leaks() {
      return tripwire.leaks.map((leak) => ({
        method: leak.method,
        nodeId: leak.nodeId,
        message: leak.message,
        // The stack is the whole point of the instrument: it names the code that wrote.
        stack: (leak.stack ?? '').split('\n').slice(1, 6).join('\n'),
      }));
    },
    get selected() {
      return selected;
    },
    projectedIds: () => [...(canvas.projection?.index.keys() ?? [])],
    interception: () => canvas.interception,
    stats: () => ({ ...canvas.stats }),
    canvasHtml: () => editor.Canvas.getDocument().body.innerHTML,
    /** What the compiler would ship for this route, right now. */
    compiledHtml: () => {
      const result = compiler.compile({ document: JSON.stringify(store.document), data: records, profile: 'full' });
      return result.files['index.html'];
    },
    /**
     * Start GrapesJS's own move interaction for a node — what the toolbar's move handle runs. The
     * sort then follows the pointer and ends on release, through the real sorter.
     */
    startMove(nodeId: string) {
      const component = findComponent(nodeId);
      if (!component) return false;
      editor.select(component);
      editor.runCommand('tlb-move', { target: component });
      return true;
    },
    select(nodeId: string) {
      const component = findComponent(nodeId);
      if (component) editor.select(component);
      return selected;
    },
    /** The RTE's commit boundary (Stage C4): one op per commit, not per keystroke. */
    commitText(nodeId: string, text: string) {
      const ops = textCommitToOps(store.document, nodeId, [{ text }]);
      if (ops.length) {
        record('text', ops);
        store.apply(ops);
        scheduler.flush();
      }
      return ops;
    },
    dropBlock(fragment: { root: string; nodes: any[] }, parent: string, index: number) {
      let n = 0;
      const ops = blockToOps(
        store.document,
        fragment,
        { parent, index, point: { x: 0.1, y: 0 } },
        () => `block-${Date.now().toString(36)}-${++n}`,
      );
      if (ops.length) {
        record('block', ops);
        store.apply(ops);
        scheduler.flush();
      }
      return ops;
    },
    resize(nodeId: string, edge: 'start' | 'end', delta: number) {
      const ops = resizeToOps(store.document, nodeId, edge, delta);
      if (ops.length) {
        record('resize', ops);
        store.apply(ops);
        scheduler.flush();
      }
      return ops;
    },
    /** Drop computed by the same code the sorter's callback uses, for the no-mouse path. */
    dropNode(nodeId: string, parent: string, index: number, point?: { x: number; y: number }) {
      const ops = dropToOps(store.document, nodeId, { parent, index, point });
      if (ops.length) {
        record('drop', ops);
        store.apply(ops);
        scheduler.flush();
      }
      return ops;
    },
    undo: () => {
      const change = store.undo();
      scheduler.flush();
      return change !== null;
    },
    redo: () => {
      const change = store.redo();
      scheduler.flush();
      return change !== null;
    },
    solveDrop: (gridId: string, x: number, span: number) => grid.solveDrop(store.document, gridId, { x, y: 0 }, span),
    /** Deliberately illegal: writes straight to a projected model, to prove the tripwire fires. */
    pokeModel(nodeId: string) {
      const component = findComponent(nodeId);
      component?.set?.('content', 'poked from outside the projector');
      return tripwire.leaks.length;
    },
    boundsOf(nodeId: string) {
      const element = editor.Canvas.getDocument().querySelector(`[data-lattice-id="${nodeId}"]`);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const frame = editor.Canvas.getFrameEl().getBoundingClientRect();
      return { x: frame.x + rect.x, y: frame.y + rect.y, width: rect.width, height: rect.height };
    },
  },
});

function findComponent(nodeId: string): any {
  let found: any = null;
  const walk = (component: any) => {
    if (found) return;
    if (component.getAttributes?.()['data-lattice-id'] === nodeId) {
      found = component;
      return;
    }
    component.components?.().forEach?.(walk);
  };
  editor.getWrapper().components().forEach(walk);
  return found;
}

(window as any).latticeReady = true;
