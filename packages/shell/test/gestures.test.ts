/**
 * Stage C3 — every gesture becomes an op, and the illegal ones become no op at all.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DocumentStore, schemaValidator } from '@lattice/engine';
import { blockToOps, dropToOps, nodeIdFromElement, resizeToOps, textCommitToOps } from '../src/gestures.ts';

const validator = await schemaValidator();
const base = JSON.parse(readFileSync(new URL('../../../corpus/sites/landing.json', import.meta.url), 'utf8'));

test('dropping a card into a grid emits a placement, never a position', () => {
  const ops = dropToOps(base, 'f-mobile', { parent: 'features', index: 0, point: { x: 0.05, y: 0 } });
  assert.deepEqual(ops, [
    { kind: 'moveNode', id: 'f-mobile', parent: 'features', index: 0 },
    { kind: 'setPlace', id: 'f-mobile', place: { col: 1, span: 4, row: 1 } },
  ]);
  assert.ok(!JSON.stringify(ops).includes('escape'));
});

test('dragging a card out of a grid drops its placement with it', () => {
  const ops = dropToOps(base, 'f-mobile', { parent: 'hero', index: 1 });
  assert.deepEqual(ops, [
    { kind: 'moveNode', id: 'f-mobile', parent: 'hero', index: 1 },
    { kind: 'setPlace', id: 'f-mobile', place: null },
  ]);
});

test('a drop that would nest a node inside itself produces no op', () => {
  assert.deepEqual(dropToOps(base, 'features', { parent: 'f-sched', index: 0 }), []);
  assert.deepEqual(dropToOps(base, 'hero', { parent: 'hero', index: 0 }), []);
  assert.deepEqual(dropToOps(base, 'nope', { parent: 'hero', index: 0 }), []);
});

test('a dropped block carries an IR fragment with fresh ids, not HTML', () => {
  let n = 0;
  const fragment = {
    root: 'card',
    nodes: [
      { id: 'card', kind: 'stack' as const, children: ['card-h'], place: { col: 1, span: 6 } },
      { id: 'card-h', kind: 'heading' as const, level: 2, spans: [{ text: 'New card' }] },
    ],
  };
  const ops = blockToOps(
    base,
    fragment,
    { parent: 'features', index: 1, point: { x: 0.5, y: 0 } },
    () => `mint-${++n}`,
  );
  assert.equal(ops[0].kind, 'insertSubtree');
  const insert = ops[0] as Extract<(typeof ops)[number], { kind: 'insertSubtree' }>;
  assert.deepEqual(
    insert.nodes.map((node) => node.id),
    ['mint-1', 'mint-2'],
  );
  assert.deepEqual(insert.nodes[0].children, ['mint-2']);
  assert.deepEqual(ops[1], { kind: 'setPlace', id: 'mint-1', place: { col: 7, span: 6, row: 1 } });

  const store = new DocumentStore(base, { validator });
  store.apply(ops);
  assert.equal(validator.validate(store.document).length, 0);
});

test('a text commit with no change emits nothing', () => {
  const unchanged = textCommitToOps(base, 'hero-title', base.nodes['hero-title'].spans);
  assert.deepEqual(unchanged, []);
  const changed = textCommitToOps(base, 'hero-title', [{ text: 'Rewritten' }]);
  assert.deepEqual(changed, [{ kind: 'setText', id: 'hero-title', spans: [{ text: 'Rewritten' }] }]);
});

test('a resize that would leave the grid produces no op', () => {
  assert.deepEqual(resizeToOps(base, 'f-mobile', 'end', 1), []);
  assert.deepEqual(resizeToOps(base, 'f-sched', 'end', 2), [
    { kind: 'setPlace', id: 'f-sched', place: { col: 1, span: 6 } },
  ]);
  assert.deepEqual(resizeToOps(base, 'hero', 'end', 1), [], 'a node outside a grid has nothing to resize');
});

test('a click anywhere inside a node resolves to that node', () => {
  const inner = {
    getAttribute: () => null,
    parentElement: { getAttribute: (n: string) => (n === 'data-lattice-id' ? 'hero' : null), parentElement: null },
  };
  assert.equal(nodeIdFromElement(inner as never), 'hero');
  assert.equal(nodeIdFromElement(null), null);
});

test('a full editing session leaves a document that still validates', () => {
  const store = new DocumentStore(base, { replica: 'session', validator });
  store.apply(dropToOps(store.document, 'f-mobile', { parent: 'features', index: 0, point: { x: 0, y: 0 } }));
  store.apply(textCommitToOps(store.document, 'hero-title', [{ text: 'Dispatch, sorted' }]));
  store.apply(resizeToOps(store.document, 'f-mobile', 'end', 2));
  store.apply(
    blockToOps(
      store.document,
      {
        root: 'b',
        nodes: [{ id: 'b', kind: 'text' as const, spans: [{ text: 'Added from the palette' }] }],
      },
      { parent: 'hero', index: 2 },
      () => 'palette-1',
    ),
  );

  assert.equal(validator.validate(store.document).length, 0);
  while (store.canUndo) store.undo();
  assert.deepEqual(store.document, base, 'every gesture in the session was undoable');
});
