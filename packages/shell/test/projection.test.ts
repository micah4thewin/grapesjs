/**
 * Stage C2 — the projection is a faithful, lossless view of what ships.
 *
 * These are the unit-level checks; the whole-corpus version runs in CI as a permanent job
 * (scripts/lattice/projection-parity.mjs).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fromHtml, projectRoute, projectionHtml, routeFilePath, ProjectionError } from '../src/projection/projector.ts';
import { loadCompiler, DEFAULT_WASM_PATH } from '@lattice/engine';

const repoFile = (relative: string) => new URL(`../../../${relative}`, import.meta.url);

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>t</title>
<style>.pad-4{padding:var(--space-4)}</style>
</head>
<body>
<main data-lattice-id="home" class="l-section"><h1 data-lattice-id="t" class="type-h1">Hello &amp; welcome</h1><img data-lattice-id="i" src="a.png" alt="An alt" width="10" height="10" loading="lazy" decoding="async"></main>
</body>
</html>
`;

test('a compiled page projects to an id-addressed tree', () => {
  const projection = fromHtml('/', PAGE);
  assert.deepEqual([...projection.index.keys()], ['home', 't', 'i']);
  assert.equal(projection.roots[0].tag, 'main');
  assert.deepEqual(projection.roots[0].classes, ['l-section']);
  assert.equal(projection.index.get('t')![0].children[0].text, 'Hello & welcome');
  assert.equal(projection.css, '.pad-4{padding:var(--space-4)}');
});

test('the projection round-trips to the exact bytes that ship', () => {
  const projection = fromHtml('/', PAGE);
  const body = PAGE.slice(PAGE.indexOf('<body>') + 6, PAGE.lastIndexOf('</body>')).trim();
  assert.equal(projectionHtml(projection), body);
});

test('route paths map to the files the compiler writes', () => {
  assert.equal(routeFilePath('/'), 'index.html');
  assert.equal(routeFilePath('/pricing'), 'pricing/index.html');
  assert.equal(routeFilePath('/blog/hello/'), 'blog/hello/index.html');
});

test('a document that does not compile projects nothing at all', () => {
  const failing = {
    compile: () => ({
      ok: false,
      files: {},
      diagnostics: [{ severity: 'error', code: 'typecheck.image.alt', message: 'image "i" has no alt text', node: 'i', route: null }],
      route_bytes: {},
    }),
  };
  assert.throws(
    () => projectRoute(failing, { routes: [] } as never, '/'),
    (error: unknown) => error instanceof ProjectionError && error.diagnostics[0].node === 'i',
  );
});

test('projecting a corpus route through the real compiler matches its compiled page', { skip: !existsSync(new URL(`../../../${DEFAULT_WASM_PATH}`, import.meta.url)) }, async () => {
  const compiler = await loadCompiler(new URL(`../../../${DEFAULT_WASM_PATH}`, import.meta.url).pathname);
  const doc = JSON.parse(readFileSync(repoFile('corpus/sites/landing.json'), 'utf8'));
  const projection = projectRoute(compiler, doc, '/');
  const compiled = compiler.compile({ document: JSON.stringify(doc), profile: 'full' });
  const page = compiled.files['index.html'];
  const body = page.slice(page.indexOf('<body>') + 6, page.lastIndexOf('</body>')).trim();
  assert.equal(projectionHtml(projection), body);
  assert.ok(projection.index.has('hero-title'));
});
