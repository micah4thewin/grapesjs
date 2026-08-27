#!/usr/bin/env node
/**
 * Bundles the spike harness into `dev/dist`, alongside everything it needs to run offline: the
 * GrapesJS build, the compiler's wasm, the IR schema and one corpus site.
 */
import { build } from 'esbuild';
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const out = resolve(here, 'dist');
const site = process.argv[2] ?? 'corpus/sites/landing.json';

mkdirSync(out, { recursive: true });

const required = [
  [resolve(repoRoot, 'packages/core/dist/grapes.min.js'), 'grapes.min.js', 'pnpm --filter grapesjs build'],
  [resolve(repoRoot, 'packages/core/dist/css/grapes.min.css'), 'grapes.min.css', 'pnpm --filter grapesjs build'],
  [
    resolve(repoRoot, 'target/wasm32-unknown-unknown/release/lattice_compiler_wasm.wasm'),
    'compiler.wasm',
    'cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown',
  ],
  [resolve(repoRoot, 'packages/engine/schema/lattice-ir.schema.json'), 'schema.json', null],
  [resolve(repoRoot, site), 'site.json', null],
];

// Stage E3: if the site has a record snapshot, ship it — the canvas shows real rows, never lorem.
const dataFrom = resolve(repoRoot, site.replace(/\.json$/, '.data.json'));
if (existsSync(dataFrom)) copyFileSync(dataFrom, resolve(out, 'data.json'));

for (const [from, to, how] of required) {
  if (!existsSync(from)) {
    console.error(`missing ${from}${how ? `\n  build it with: ${how}` : ''}`);
    process.exit(1);
  }
  copyFileSync(from, resolve(out, to));
}
copyFileSync(resolve(here, 'index.html'), resolve(out, 'index.html'));
copyFileSync(resolve(here, 'shell.css'), resolve(out, 'shell.css'));

// The projected page references real assets; without them the canvas shows broken images and the
// spike's "no console errors" check would be measuring the harness, not the graft.
const assetsFrom = resolve(repoRoot, 'corpus/assets');
if (existsSync(assetsFrom)) {
  mkdirSync(resolve(out, 'assets'), { recursive: true });
  for (const file of readdirSync(assetsFrom)) copyFileSync(resolve(assetsFrom, file), resolve(out, 'assets', file));
}

await build({
  entryPoints: [resolve(here, 'main.ts')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  outfile: resolve(out, 'main.js'),
  sourcemap: true,
  // The engine's Node conveniences (reading the schema, loading the wasm from disk) are dynamic
  // imports of node builtins; the browser path fetches those instead, so they are dropped here.
  external: ['node:fs/promises', 'node:url', 'node:module'],
  logLevel: 'warning',
});

console.log(`spike harness built in ${out} (site: ${site})`);
