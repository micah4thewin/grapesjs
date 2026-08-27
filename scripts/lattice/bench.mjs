#!/usr/bin/env node
/**
 * The two latency numbers the plan puts a threshold on:
 *
 *   * **Stage C6** — op → canvas under 16ms at p95 on a 2,000-node page. Below one frame, because
 *     an editor that stutters while typing is a different product from one that does not.
 *   * **Part IV risk 6** — the WASM fast profile under 150ms at p95 per route, on a low-end
 *     machine. The live preview and the budget meter both ride on it; if it is slow, the "instant"
 *     claim goes with it.
 *
 * Generating the benchmark page rather than committing it keeps the corpus hand-authored and the
 * benchmark honest: it is a shape (deep sections, wide grids, long text), not a lucky document.
 *
 *   node scripts/lattice/bench.mjs [--nodes 2000] [--iterations 60] [--json]
 */
import { readFileSync, existsSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { apply } from '../../packages/engine/src/ops.ts';
import { DocumentStore } from '../../packages/engine/src/store.ts';
import { Validator } from '../../packages/engine/src/validate.ts';
import { loadCompiler, DEFAULT_WASM_PATH } from '../../packages/engine/src/wasm-host.ts';
import { fromHtml } from '../../packages/shell/src/projection/projector.ts';

const arg = (name, fallback) => {
  const at = process.argv.indexOf(name);
  return at >= 0 ? Number(process.argv[at + 1]) : fallback;
};
const targetNodes = arg('--nodes', 2000);
const iterations = arg('--iterations', 60);

const seed = JSON.parse(readFileSync('corpus/sites/landing.json', 'utf8'));
const schema = JSON.parse(readFileSync('packages/engine/schema/lattice-ir.schema.json', 'utf8'));
const validator = new Validator(schema);

/** A page of the shape big sites actually have: sections of grids of cards of text. */
function generate(nodeCount) {
  const doc = structuredClone(seed);
  doc.id = 'bench';
  doc.name = 'Benchmark page';
  doc.routes = [
    { path: '/', title: 'Benchmark', description: 'A generated page for latency measurement.', root: 'bench-root' },
  ];
  doc.nodes = {
    'bench-root': {
      id: 'bench-root',
      kind: 'section',
      tag: 'main',
      style: { maxWidth: 'space.measure' },
      children: [],
    },
  };
  let created = 1;
  let section = 0;
  while (created < nodeCount) {
    const sectionId = `s${section}`;
    const gridId = `g${section}`;
    doc.nodes[sectionId] = {
      id: sectionId,
      kind: 'stack',
      style: { pad: 'space.6', gap: 'space.5' },
      children: [gridId],
    };
    doc.nodes[gridId] = { id: gridId, kind: 'grid', cols: 12, style: { gap: 'space.5' }, children: [] };
    doc.nodes['bench-root'].children.push(sectionId);
    created += 2;
    for (let card = 0; card < 6 && created < nodeCount; card++) {
      const cardId = `c${section}-${card}`;
      const headingId = `${cardId}-h`;
      const bodyId = `${cardId}-b`;
      doc.nodes[cardId] = {
        id: cardId,
        kind: 'stack',
        place: { col: (card % 3) * 4 + 1, span: 4 },
        style: { bg: 'color.surface', pad: 'space.5', gap: 'space.2', radius: 'radius.md' },
        children: [headingId, bodyId],
      };
      doc.nodes[headingId] = {
        id: headingId,
        kind: 'heading',
        level: 2,
        spans: [{ text: `Card ${section}.${card}` }],
        style: { type: 'type.h3', fg: 'color.fg' },
      };
      doc.nodes[bodyId] = {
        id: bodyId,
        kind: 'text',
        spans: [
          { text: 'A paragraph of the length these pages actually carry, so the measurement is of something real.' },
        ],
        style: { type: 'type.body', fg: 'color.muted' },
      };
      doc.nodes[gridId].children.push(cardId);
      created += 3;
    }
    section++;
  }
  // The generated page opens with an h1 so the outline (and the prove pass) is satisfied.
  doc.nodes['bench-title'] = {
    id: 'bench-title',
    kind: 'heading',
    level: 1,
    spans: [{ text: 'Benchmark' }],
    style: { type: 'type.h1', fg: 'color.fg' },
  };
  doc.nodes['bench-root'].children.unshift('bench-title');
  return doc;
}

const percentile = (values, p) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length * p) / 100))];
};
const summarise = (label, samples, threshold) => {
  const p50 = percentile(samples, 50);
  const p95 = percentile(samples, 95);
  const ok = p95 <= threshold;
  console.log(
    `${ok ? '✓' : '✗'} ${label}: p50 ${p50.toFixed(2)}ms, p95 ${p95.toFixed(2)}ms (threshold ${threshold}ms, ${samples.length} samples)`,
  );
  return { label, p50, p95, threshold, ok };
};

const doc = generate(targetNodes);
const nodeCount = Object.keys(doc.nodes).length;
console.log(`benchmark page: ${nodeCount} nodes, ${doc.routes.length} route\n`);

const errors = validator.validate(doc);
if (errors.length) {
  console.error(`the generated page is not valid IR: ${JSON.stringify(errors[0])}`);
  process.exit(1);
}

const results = [];

// 1. op apply: the engine's own cost, with validation on, as the editor runs it.
{
  const store = new DocumentStore(doc, { replica: 'bench', validator });
  const ids = Object.values(doc.nodes)
    .filter((n) => n.kind === 'text')
    .map((n) => n.id);
  const samples = [];
  for (let i = 0; i < iterations; i++) {
    const id = ids[i % ids.length];
    const start = performance.now();
    store.apply({ kind: 'setText', id, spans: [{ text: `edited ${i}` }] });
    samples.push(performance.now() - start);
  }
  results.push(summarise('op apply (validated)', samples, 16));
}

// 2. op apply without validation: what the editor pays if validation moves off the hot path.
{
  let current = doc;
  const ids = Object.values(doc.nodes)
    .filter((n) => n.kind === 'text')
    .map((n) => n.id);
  const samples = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    current = apply(current, { kind: 'setText', id: ids[i % ids.length], spans: [{ text: `edited ${i}` }] });
    samples.push(performance.now() - start);
  }
  results.push(summarise('op apply (unvalidated)', samples, 16));
}

// 3. and 4. the compile the canvas does on every change, and the projection built from it.
if (!existsSync(DEFAULT_WASM_PATH)) {
  console.error(
    `\nmissing ${DEFAULT_WASM_PATH} — run: cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown`,
  );
  process.exit(1);
}
const compiler = await loadCompiler(DEFAULT_WASM_PATH);
{
  const source = JSON.stringify(doc);
  const fast = [];
  const full = [];
  let html = '';
  for (let i = 0; i < iterations; i++) {
    let start = performance.now();
    const result = compiler.compile({ document: source, profile: 'fast' });
    fast.push(performance.now() - start);
    html = result.files['index.html'];
    start = performance.now();
    compiler.compile({ document: source, profile: 'full', emit_app: true });
    full.push(performance.now() - start);
  }
  results.push(summarise('wasm compile, fast profile (per route)', fast, 150));
  results.push(summarise('wasm compile, full profile (per route)', full, 400));

  const projections = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fromHtml('/', html);
    projections.push(performance.now() - start);
  }
  results.push(summarise('projection from compiled page', projections, 50));

  // 5. The number the C6 threshold is actually about: one op, then the canvas showing it.
  const roundTrip = [];
  const store = new DocumentStore(doc, { replica: 'bench', validator });
  const ids = Object.values(doc.nodes)
    .filter((n) => n.kind === 'text')
    .map((n) => n.id);
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const change = store.apply({ kind: 'setText', id: ids[i % ids.length], spans: [{ text: `round ${i}` }] });
    const compiled = compiler.compile({ document: JSON.stringify(change.document), profile: 'fast' });
    fromHtml('/', compiled.files['index.html']);
    roundTrip.push(performance.now() - start);
  }
  results.push(summarise('op → canvas round trip', roundTrip, 150));
}

if (process.argv.includes('--json')) console.log(JSON.stringify({ nodes: nodeCount, results }, null, 2));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} within threshold`);
process.exit(failed.length ? 1 : 0);
