#!/usr/bin/env node
/**
 * One file, no server: bundles the shell, the GrapesJS build, the compiler's wasm, the IR schema,
 * a corpus site and its records into a single HTML page that runs with nothing beside it.
 *
 * This is how the editor travels — into an artifact, a bug report, an offline demo — and it is the
 * same code the dev server and the headless spike run, not a mock of it.
 *
 *   node packages/shell/dev/build-artifact.mjs [site] [out.html]
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const sitePath = process.argv[2] ?? 'corpus/sites/landing.json';
const outPath = resolve(repoRoot, process.argv[3] ?? 'packages/shell/dev/dist/lattice-shell.html');

const need = (path, how) => {
  const full = resolve(repoRoot, path);
  if (!existsSync(full)) {
    console.error(`missing ${path}\n  build it with: ${how}`);
    process.exit(1);
  }
  return full;
};

const grapesJs = need('packages/core/dist/grapes.min.js', 'pnpm run build:cli && pnpm run build:core');
const grapesCss = need('packages/core/dist/css/grapes.min.css', 'pnpm run build:cli && pnpm run build:core');
const wasmPath = need(
  'target/wasm32-unknown-unknown/release/lattice_compiler_wasm.wasm',
  'cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown',
);

const site = JSON.parse(readFileSync(resolve(repoRoot, sitePath), 'utf8'));
const dataPath = resolve(repoRoot, sitePath.replace(/\.json$/, '.data.json'));
const records = existsSync(dataPath) ? readFileSync(dataPath, 'utf8') : null;

// Assets travel as data URIs: with no server there is nothing to fetch them from, and a broken
// image in a demo of a compiler that refuses broken images would be its own joke.
const mime = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};
const inlineAsset = (reference) => {
  const file = resolve(repoRoot, 'corpus', reference);
  if (!existsSync(file)) return reference;
  const type = mime[extname(file)] ?? 'application/octet-stream';
  return `data:${type};base64,${readFileSync(file).toString('base64')}`;
};
for (const node of Object.values(site.nodes)) {
  if (node.kind === 'image' && node.src) node.src = inlineAsset(node.src);
}
if (site.icon) delete site.icon; // the page has its own; the site's icon has nothing to attach to here

const bundle = await build({
  entryPoints: [resolve(here, 'main.ts')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  write: false,
  minify: true,
  external: ['node:fs/promises', 'node:url', 'node:module'],
  logLevel: 'warning',
});

const payload = {
  schema: JSON.parse(readFileSync(resolve(repoRoot, 'packages/engine/schema/lattice-ir.schema.json'), 'utf8')),
  site,
  data: records,
  wasmBase64: readFileSync(wasmPath).toString('base64'),
};

const page = `<title>Lattice Shell</title>
<style>${readFileSync(grapesCss, 'utf8')}</style>
<style>${readFileSync(resolve(here, 'shell.css'), 'utf8')}</style>
<style>${readFileSync(resolve(here, 'artifact.css'), 'utf8')}</style>
${readFileSync(resolve(here, 'artifact.html'), 'utf8')}
<script>${readFileSync(grapesJs, 'utf8')}</script>
<script id="lattice-payload" type="application/json">${JSON.stringify(payload).replace(/</g, '\\u003c')}</script>
<script type="module">
  window.__LATTICE_INLINE__ = JSON.parse(document.getElementById('lattice-payload').textContent);
${bundle.outputFiles[0].text}
</script>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, page);
console.log(`${basename(outPath)}: ${(page.length / 1024 / 1024).toFixed(2)}MB (site: ${sitePath})`);
