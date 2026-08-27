/**
 * Stage C6 — a burst of ops must cost one projection, not one each.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ProjectionScheduler } from '../src/projection/scheduler.ts';

const make = (onProject: (batch: any) => void) => {
  const queue: (() => void)[] = [];
  const scheduler = new ProjectionScheduler<{ kind: string; touched: string[] }>({
    project: onProject,
    isStructural: (change) => ['moveNode', 'insertSubtree', 'removeSubtree'].includes(change.kind),
    touchedOf: (change) => change.touched,
    schedule: (run) => queue.push(run),
  });
  return { scheduler, tick: () => queue.splice(0).forEach((run) => run()) };
};

test('a burst of ops produces exactly one projection', () => {
  const batches: any[] = [];
  const { scheduler, tick } = make((batch) => batches.push(batch));

  for (let i = 0; i < 40; i++) scheduler.push({ kind: 'setText', touched: [`n${i % 4}`] });
  assert.equal(batches.length, 0, 'nothing projects before the frame');
  tick();
  assert.equal(batches.length, 1);
  assert.deepEqual(batches[0].touched.sort(), ['n0', 'n1', 'n2', 'n3']);
  assert.equal(batches[0].changes.length, 40);
  assert.equal(batches[0].structural, false);
});

test('one structural op in the batch makes the whole batch structural', () => {
  const batches: any[] = [];
  const { scheduler, tick } = make((batch) => batches.push(batch));
  scheduler.push({ kind: 'setText', touched: ['a'] });
  scheduler.push({ kind: 'moveNode', touched: ['a', 'b'] });
  tick();
  assert.equal(batches[0].structural, true);
});

test('a document-wide change (empty touched list) is structural', () => {
  const batches: any[] = [];
  const { scheduler, tick } = make((batch) => batches.push(batch));
  scheduler.push({ kind: 'setToken', touched: [] });
  tick();
  assert.equal(batches[0].structural, true);
});

test('flush projects immediately, and a second flush does nothing', () => {
  const batches: any[] = [];
  const { scheduler } = make((batch) => batches.push(batch));
  scheduler.push({ kind: 'setText', touched: ['a'] });
  scheduler.flush();
  scheduler.flush();
  assert.equal(batches.length, 1);
  assert.equal(scheduler.pending, 0);
});
