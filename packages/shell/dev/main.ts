/**
 * The C3 spike harness: a real GrapesJS editor, flags on, showing a projection of a real corpus
 * site, with the tripwire armed and every gesture routed through the op layer.
 *
 * This is not the product shell. It is the smallest thing that can answer the question the plan
 * gates on — *does Backbone's two-way binding write back through paths we cannot intercept?* — and
 * it exposes `window.lattice` so a headless driver can run a scripted session and read the answer.
 */

import { DocumentStore, Validator, LatticeCompiler, grid } from '@lattice/engine';
import type { Document, Op } from '@lattice/engine';
import { projectRoute } from '../src/projection/projector.ts';
import { ProjectionCanvas, componentTypes } from '../src/projection/canvas.ts';
import { createTripwire } from '../src/projection/tripwire.ts';
import { blockToOps, dropToOps, resizeToOps, textCommitToOps } from '../src/gestures.ts';
import { LATTICE, describe } from '../src/flags.ts';

declare const grapesjs: any;

const status = document.getElementById('status')!;
const say = (text: string) => {
  status.textContent = text;
};

const [schema, site, wasm] = await Promise.all([
  fetch('./schema.json').then((r) => r.json()),
  fetch('./site.json').then((r) => r.json()),
  fetch('./compiler.wasm').then((r) => r.arrayBuffer()),
]);

const compiler = await LatticeCompiler.fromBytes(wasm);
const validator = new Validator(schema);
const store = new DocumentStore(site as Document, { replica: 'spike', validator });
const tripwire = createTripwire({ throwOnLeak: false }); // soft: a spike lists every leak, it does not stop at the first
const flags = LATTICE;

const editor = grapesjs.init({
  container: '#editor',
  height: '100vh',
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
canvas.onSelect = (nodeId) => {
  selected = nodeId;
  report();
};

let lastGood: ReturnType<typeof projectRoute> | null = null;
let lastErrors: { code: string; message: string; node: string | null }[] = [];

/**
 * Project the active route. If the document does not compile, the canvas keeps showing the last
 * page that did and surfaces the diagnostics — a canvas that throws is a canvas that loses the
 * session, and the errors name the node anyway.
 */
function project() {
  const route = store.document.routes[0].path;
  try {
    lastGood = projectRoute(compiler, store.document, route);
    lastErrors = [];
    return lastGood;
  } catch (error: any) {
    lastErrors = error?.diagnostics ?? [{ code: 'projection', message: String(error), node: null }];
    if (!lastGood) throw error;
    return lastGood;
  }
}

function report() {
  say(
    [
      describe(flags),
      `route ${store.document.routes[0].path} · ${canvas.projection?.index.size ?? 0} nodes projected`,
      `selected: ${selected ?? '—'}`,
      `ops: ${emitted.length} batch(es), ${emitted.reduce((n, e) => n + e.ops.length, 0)} op(s)`,
      `tripwire: ${tripwire.leaks.length} leak(s)`,
    ].join('\n'),
  );
}

canvas.mount(project());
canvas.attach();
canvas.armAll();

// Re-project on every change: patch what the ops touched, re-mount when the shape changed.
store.subscribe((change) => {
  canvas.applyChange(project(), change);
  canvas.armAll();
  report();
});

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
      const result = compiler.compile({ document: JSON.stringify(store.document), profile: 'full' });
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
      }
      return ops;
    },
    resize(nodeId: string, edge: 'start' | 'end', delta: number) {
      const ops = resizeToOps(store.document, nodeId, edge, delta);
      if (ops.length) {
        record('resize', ops);
        store.apply(ops);
      }
      return ops;
    },
    /** Drop computed by the same code the sorter's callback uses, for the no-mouse path. */
    dropNode(nodeId: string, parent: string, index: number, point?: { x: number; y: number }) {
      const ops = dropToOps(store.document, nodeId, { parent, index, point });
      if (ops.length) {
        record('drop', ops);
        store.apply(ops);
      }
      return ops;
    },
    undo: () => store.undo() !== null,
    redo: () => store.redo() !== null,
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
