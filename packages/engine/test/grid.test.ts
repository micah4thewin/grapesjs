/**
 * Stage D3 done-when: 1,000 random drags produce 1,000 schema-valid documents and zero raw
 * positions. The point is not that the UI discourages `left: 347px` — it is that no sequence of
 * drags can produce one, because the only op a drop can emit is a placement.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as grid from '../src/grid.ts';
import { DocumentStore } from '../src/store.ts';
import { schemaValidator } from '../src/validate.ts';
import { loadSite, rng } from './helpers.ts';

const validator = await schemaValidator();
const base = loadSite('landing.json');

test('a thousand random drags stay legal', () => {
  const store = new DocumentStore(base, { replica: 'monkey', validator });
  const random = rng(20250827);
  const cards = ['f-sched', 'f-invoice', 'f-mobile'];
  let applied = 0;

  for (let i = 0; i < 1000; i++) {
    const id = cards[i % cards.length];
    const span = store.document.nodes[id].place?.span ?? 4;
    const place = grid.solveDrop(store.document, 'features', { x: random() * 1.4 - 0.2, y: random() * 3 }, span);
    assert.ok(place, 'a drop inside a grid always resolves to a placement');
    store.apply({ kind: 'setPlace', id, place });
    applied++;

    const node = store.document.nodes[id];
    assert.ok(grid.isLegal(store.document.nodes.features, node.place!), `drag ${i} produced an illegal placement`);
    assert.equal(node.style?.escape, undefined, 'a drag must never write a raw declaration');
  }

  assert.equal(applied, 1000);
  assert.equal(validator.validate(store.document).length, 0);
  const rawPositions = Object.values(store.document.nodes).filter((n) => Object.keys(n.style?.escape ?? {}).length > 0);
  assert.equal(rawPositions.length, 0, 'no drag produced a raw position');
});

test('a drop past the right edge is pulled back inside the grid', () => {
  const place = grid.solveDrop(base, 'features', { x: 1.5, y: 0 }, 4);
  assert.deepEqual(place, { col: 9, span: 4, row: 1 });
});

test('a span wider than the grid is clamped, never overflowed', () => {
  const place = grid.solveDrop(base, 'features', { x: 0.5, y: 0 }, 40);
  assert.deepEqual(place, { col: 1, span: 12, row: 1 });
  assert.ok(grid.isLegal(base.nodes.features, place!));
});

test('resizing stops at the grid edge instead of going invalid', () => {
  const features = base.nodes.features;
  assert.deepEqual(grid.solveResize(features, { col: 9, span: 4 }, 'end', 3), { col: 9, span: 4 });
  assert.deepEqual(grid.solveResize(features, { col: 1, span: 4 }, 'end', 2), { col: 1, span: 6 });
  assert.deepEqual(grid.solveResize(features, { col: 5, span: 4 }, 'start', -2), { col: 3, span: 6 });
  assert.deepEqual(grid.solveResize(features, { col: 5, span: 4 }, 'start', 10), { col: 8, span: 1 });
});

test('occupancy reports what a row already holds', () => {
  assert.deepEqual(grid.occupancy(base, 'features', 1), [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  assert.deepEqual(grid.occupancy(base, 'features', 2), new Array(12).fill(false));
});

test('drops outside a grid produce no op at all', () => {
  assert.equal(grid.solveDrop(base, 'hero', { x: 0.5, y: 0 }, 4), null);
  assert.equal(grid.solveDrop(base, 'nope', { x: 0.5, y: 0 }, 4), null);
});
