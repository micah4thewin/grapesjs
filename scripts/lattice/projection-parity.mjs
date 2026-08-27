#!/usr/bin/env node
/**
 * CI job 4 — projection vs compilation (Stage C2 done-when; permanent, per Part IV risk 2).
 *
 * The canvas and the export are two views of one IR. In this implementation they are also one
 * renderer — the canvas projects the compiler's own output — so this job proves the three things
 * that could still go wrong:
 *
 *   1. every IR node the route renders appears in the projection, exactly once
 *   2. the projection round-trips to the compiled page byte for byte (the parser loses nothing)
 *   3. the classes on each projected element are the ones the compiler emitted (no restyling)
 *
 * If a future projector ever renders independently of the compiler, this job is what catches the
 * first pixel of drift.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadCompiler, DEFAULT_WASM_PATH } from '../../packages/engine/src/wasm-host.ts';
import { projectRoute, projectionHtml, routeFilePath } from '../../packages/shell/src/projection/projector.ts';

if (!existsSync(DEFAULT_WASM_PATH)) {
  console.error(`missing ${DEFAULT_WASM_PATH}\nrun: cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown`);
  process.exit(1);
}

const compiler = await loadCompiler(DEFAULT_WASM_PATH);
const sites = readdirSync('corpus/sites').filter((f) => f.endsWith('.json') && !f.endsWith('.data.json')).sort();

let failures = 0;
let routesChecked = 0;

for (const site of sites) {
  const path = join('corpus/sites', site);
  const doc = JSON.parse(readFileSync(path, 'utf8'));
  const dataPath = path.replace(/\.json$/, '.data.json');
  const data = existsSync(dataPath) ? readFileSync(dataPath, 'utf8') : null;

  const compiled = compiler.compile({ document: JSON.stringify(doc), data, profile: 'full', emit_app: false });
  if (!compiled.ok) {
    console.error(`✗ ${site}: does not compile`);
    failures++;
    continue;
  }

  for (const route of doc.routes) {
    // Dynamic routes render one page per record; the projection of the template is checked
    // against the first of them, which is what the canvas shows while editing it.
    const file = route.collection
      ? Object.keys(compiled.files).find((f) => f.startsWith(route.path.split('/:')[0].replace(/^\//, '')) && f.endsWith('index.html'))
      : routeFilePath(route.path);
    if (!file || !compiled.files[file]) continue;

    const concrete = `/${file.replace(/index\.html$/, '').replace(/\/$/, '')}` || '/';
    const projection = projectRoute(compiler, doc, concrete, data);
    routesChecked++;

    const compiledHtml = compiled.files[file];
    const bodyStart = compiledHtml.indexOf('<body>') + '<body>'.length;
    const bodyEnd = compiledHtml.lastIndexOf('</body>');
    const compiledBody = compiledHtml.slice(bodyStart, bodyEnd).trim();

    const roundTripped = projectionHtml(projection);
    if (roundTripped !== compiledBody) {
      console.error(`✗ ${site} ${concrete}: projection does not round-trip to the compiled page`);
      const at = firstDifference(roundTripped, compiledBody);
      console.error(`  first difference at byte ${at}:`);
      console.error(`    compiled:   …${compiledBody.slice(Math.max(0, at - 40), at + 60)}…`);
      console.error(`    projection: …${roundTripped.slice(Math.max(0, at - 40), at + 60)}…`);
      failures++;
      continue;
    }

    // Every node the compiler addressed must be reachable in the projection, exactly once
    // (repeated list items are the documented exception: they carry an index).
    const compiledIds = [...compiledBody.matchAll(/data-lattice-id="([^"]+)"/g)].map((m) => m[1]);
    const projectedIds = [...projection.index.keys()];
    const missing = compiledIds.filter((id) => !projection.index.has(id));
    if (missing.length) {
      console.error(`✗ ${site} ${concrete}: projection is missing node(s) ${[...new Set(missing)].join(', ')}`);
      failures++;
      continue;
    }
    const extra = projectedIds.filter((id) => !compiledIds.includes(id));
    if (extra.length) {
      console.error(`✗ ${site} ${concrete}: projection invented node(s) ${extra.join(', ')}`);
      failures++;
      continue;
    }

    // Classes must match what shipped, not merely look similar.
    let classMismatch = 0;
    for (const [nodeId, projected] of projection.index) {
      const pattern = new RegExp(`data-lattice-id="${escapeRegExp(nodeId)}"(?: data-lattice-index="\\d+")?(?: class="([^"]*)")?`, 'g');
      const emitted = [...compiledBody.matchAll(pattern)].map((m) => (m[1] ?? '').split(' ').filter(Boolean).join(' '));
      projected.forEach((node, i) => {
        const expected = emitted[i] ?? '';
        if (node.classes.join(' ') !== expected) {
          console.error(`✗ ${site} ${concrete}: node ${nodeId} projects classes "${node.classes.join(' ')}" but ships "${expected}"`);
          classMismatch++;
        }
      });
    }
    if (classMismatch) {
      failures++;
      continue;
    }

    console.log(`✓ ${site} ${concrete}: ${projectedIds.length} nodes project exactly as they ship`);
  }
}

function firstDifference(a, b) {
  const max = Math.min(a.length, b.length);
  for (let i = 0; i < max; i++) if (a[i] !== b[i]) return i;
  return max;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (failures) {
  console.error(`\n${failures} route(s) show something other than what ships`);
  process.exit(1);
}
console.log(`\nprojection matches compilation on ${routesChecked} route(s) — what you see is what ships`);
