/**
 * Stage C5's done-when, minus the browser: kill the session mid-edit and lose nothing; edit in two
 * places offline, reconnect, converge.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DocumentStore } from '../src/store.ts';
import { MemoryOpLogStorage, SessionPersistence, restore } from '../src/persistence.ts';
import { schemaValidator } from '../src/validate.ts';
import { loadSite } from './helpers.ts';

const validator = await schemaValidator();
const base = loadSite('landing.json');

test('killing the session mid-edit loses nothing', async () => {
  const storage = new MemoryOpLogStorage();
  const store = new DocumentStore(base, { replica: 'alice', validator });
  const persistence = new SessionPersistence(store, storage);
  persistence.start();

  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'Half-written headline' }] });
  store.apply({ kind: 'setStyle', id: 'hero', key: 'bg', value: 'color.accent' });
  store.apply({ kind: 'moveNode', id: 'f-mobile', parent: 'features', index: 0 });
  await persistence.settled();
  // The tab dies here: no explicit save, no unload handler, nothing tidy.

  const { store: revived, recoveredOps } = await restore(storage, base, { validator: { validator } });
  assert.equal(recoveredOps, 3);
  assert.deepEqual(revived.document, store.document);
});

test('compaction keeps the log bounded without losing the document', async () => {
  const storage = new MemoryOpLogStorage();
  const store = new DocumentStore(base, { replica: 'alice', validator });
  const persistence = new SessionPersistence(store, storage, { compactAfter: 10 });
  persistence.start();

  for (let i = 0; i < 25; i++) {
    store.apply({ kind: 'setText', id: 'hero-sub', spans: [{ text: `revision ${i}` }] });
  }
  await persistence.settled();

  const ops = await storage.loadOps();
  const snapshot = await storage.loadSnapshot();
  assert.ok(snapshot, 'compaction writes a snapshot');
  assert.ok(ops.length < 25, `the log compacts (${ops.length} ops left)`);

  const { store: revived } = await restore(storage, base, { validator: { validator } });
  assert.deepEqual(revived.document, store.document);
});

test('a failed write is reported, not swallowed', async () => {
  const storage = new MemoryOpLogStorage();
  const errors: unknown[] = [];
  const store = new DocumentStore(base, { replica: 'alice', validator });
  const persistence = new SessionPersistence(store, storage, { onError: (error) => errors.push(error) });
  persistence.start();

  storage.failNextAppend = true;
  store.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'Never saved' }] });
  await persistence.settled();
  assert.equal(errors.length, 1, 'the UI can say "not saved" rather than pretending');
});

test('two offline sessions converge when they reconnect', async () => {
  const left = new DocumentStore(base, { replica: 'alice', validator });
  const right = new DocumentStore(base, { replica: 'bob', validator });
  const leftStorage = new MemoryOpLogStorage();
  const rightStorage = new MemoryOpLogStorage();
  const leftPersistence = new SessionPersistence(left, leftStorage);
  const rightPersistence = new SessionPersistence(right, rightStorage);
  leftPersistence.start();
  rightPersistence.start();

  // Both edit with no connection between them.
  left.apply({ kind: 'setText', id: 'hero-title', spans: [{ text: 'Alice was here' }] });
  left.apply({ kind: 'setStyle', id: 'hero', key: 'pad', value: 'space.7' });
  right.apply({ kind: 'setText', id: 'hero-sub', spans: [{ text: 'Bob was here' }] });
  right.apply({ kind: 'moveNode', id: 'f-sched', parent: 'features', index: 2 });
  await Promise.all([leftPersistence.settled(), rightPersistence.settled()]);

  assert.equal(leftPersistence.pending.length, 2, 'unsent ops are the offline queue');
  assert.equal(rightPersistence.pending.length, 2);

  // Reconnect: each side replays the other's log from the shared base.
  const merged = DocumentStore.merge(base, [await leftStorage.loadOps(), await rightStorage.loadOps()]);
  const mergedOtherOrder = DocumentStore.merge(base, [await rightStorage.loadOps(), await leftStorage.loadOps()]);
  assert.deepEqual(merged.document, mergedOtherOrder.document);
  assert.equal(validator.validate(merged.document).length, 0);
  assert.equal(merged.document.nodes['hero-title'].spans?.[0].text, 'Alice was here');
  assert.equal(merged.document.nodes['hero-sub'].spans?.[0].text, 'Bob was here');

  leftPersistence.acknowledge(await leftStorage.loadOps());
  assert.equal(leftPersistence.pending.length, 0, 'acknowledged ops leave the queue');
});

test('restoring an empty storage starts from the given document', async () => {
  const { store, recoveredOps } = await restore(new MemoryOpLogStorage(), base, { validator: { validator } });
  assert.equal(recoveredOps, 0);
  assert.deepEqual(store.document, base);
});
