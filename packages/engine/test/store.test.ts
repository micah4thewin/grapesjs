/**
 * Stage C4 — one history stack for everything.
 *
 * The test that matters is the mixed sequence: a text edit, a move, a block insert and a token
 * change undone in order. Under the old model those live in different subsystems; here they are
 * one log, so this is a property of the design rather than a coincidence of the implementation.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DocumentStore, ValidationFailure } from '../src/store.ts';
import { schemaValidator } from '../src/validate.ts';
import type { Node } from '../src/generated/ir.ts';
import { loadSite } from './helpers.ts';

const validator = await schemaValidator();
const base = loadSite('landing.json');

const card = (id: string): Node[] => [
  { id, kind: 'stack', place: { col: 1, span: 4 }, children: [`${id}-h`] },
  {
    id: `${id}-h`,
    kind: 'heading',
    level: 2,
    spans: [{ text: 'Inserted' }],
    style: { type: 'type.h3', fg: 'color.fg' },
  },
];

test('undo replays a mixed sequence in reverse', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });

  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'New headline' }] });
  store.apply({ kind: 'moveNode', id: 'f-mobile', parent: 'features', index: 0 });
  store.apply({ kind: 'insertSubtree', nodes: card('inserted'), root: 'inserted', parent: 'features', index: 1 });
  store.apply({ kind: 'setToken', group: 'color', name: 'accent', value: { value: '#0f766e' } });

  assert.equal(store.document.tokens.color.accent.value, '#0f766e');
  assert.equal(store.document.nodes.features.children?.[0], 'f-mobile');
  assert.ok(store.document.nodes.inserted);

  store.undo();
  assert.equal(store.document.tokens.color.accent.value, '#1d4ed8');
  store.undo();
  assert.equal(store.document.nodes.inserted, undefined);
  store.undo();
  assert.equal(store.document.nodes.features.children?.[0], 'f-sched');
  store.undo();
  assert.deepEqual(store.document, base);
  assert.equal(store.canUndo, false);
});

test('redo after a branch is discarded', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });
  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'A' }] });
  store.undo();
  assert.equal(store.canRedo, true);
  store.redo();
  assert.equal(store.document.nodes['hero-title'].spans?.[0].text, 'A');

  store.undo();
  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'B' }] });
  assert.equal(store.canRedo, false, 'a new edit clears the redo branch');
});

test('one user action is one undo, however many ops it takes', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });
  store.apply([
    { kind: 'setStyle', id: 'hero', key: 'bg', value: 'color.accent' },
    { kind: 'setStyle', id: 'hero-title', key: 'fg', value: 'color.on-accent' },
    { kind: 'setStyle', id: 'hero-sub', key: 'fg', value: 'color.on-accent' },
  ]);
  store.undo();
  assert.deepEqual(store.document, base);
});

test('an op that would invalidate the document is refused, and changes nothing', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });
  assert.throws(
    () => store.apply({ kind: 'setStyle', id: 'hero', key: 'bg', value: '#ff0000' }),
    (error: unknown) => error instanceof ValidationFailure,
  );
  assert.equal(store.document.nodes.hero.style?.bg, 'color.surface');
});

test('subscribers learn which nodes to re-project', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });
  const changes: string[][] = [];
  const unsubscribe = store.subscribe((change) => changes.push(change.touched));

  store.apply({ kind: 'setText', id: 'hero-sub', spans: [{ text: 'x' }] });
  assert.deepEqual(changes[0], ['hero-sub']);

  store.apply({ kind: 'moveNode', id: 'f-mobile', parent: 'features', index: 0 });
  assert.deepEqual(changes[1].sort(), ['f-mobile', 'features']);

  store.apply({ kind: 'setToken', group: 'space', name: '5', value: { px: 20 } });
  assert.deepEqual(changes[2], [], 'a token change re-projects the route, not one node');

  unsubscribe();
  store.apply({ kind: 'setText', id: 'hero-sub', spans: [{ text: 'y' }] });
  assert.equal(changes.length, 3);
});

test('a snapshot round-trips through persistence', () => {
  const store = new DocumentStore(base, { replica: 'test', validator });
  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'Persisted' }] });
  const revived = DocumentStore.fromSnapshot(JSON.parse(JSON.stringify(store.snapshot())), { validator });
  assert.deepEqual(revived.document, store.document);
  assert.equal(revived.log.length, store.log.length);
});
