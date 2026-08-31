/**
 * Stage C3.5 — the instrument the graft-vs-greenfield gate is read from.
 *
 * If this can be fooled, the gate is decided on vibes. So: a write from inside the projector is
 * fine, a write from anywhere else is a thrown error naming the node, and the report accumulates
 * leaks in soft mode so a triage run can list every leaking path in one session instead of one
 * per crash.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { asProjector, createTripwire, guardModel, ProjectionLeak } from '../src/projection/tripwire.ts';

const fakeModel = () => {
  const calls: string[] = [];
  return {
    calls,
    model: {
      set: (...args: unknown[]) => calls.push(`set:${JSON.stringify(args)}`),
      add: () => calls.push('add'),
      remove: () => calls.push('remove'),
    },
  };
};

test('a write from outside the projector throws, naming the node', () => {
  const { model } = fakeModel();
  const report = createTripwire();
  guardModel(model, 'hero', report);
  assert.throws(
    () => model.set('content', 'edited'),
    (error: unknown) => {
      assert.ok(error instanceof ProjectionLeak);
      assert.equal(error.nodeId, 'hero');
      assert.equal(error.method, 'set');
      assert.match(error.message, /must be an op instead/);
      return true;
    },
  );
});

test('the projector may write; that is the whole point of the exemption', () => {
  const { model, calls } = fakeModel();
  const report = createTripwire();
  guardModel(model, 'hero', report);
  asProjector(() => model.set('content', 'projected'));
  assert.deepEqual(calls, ['set:["content","projected"]']);
  assert.equal(report.leaks.length, 0);
});

test('the exemption does not leak past a throw inside the projector', () => {
  const { model } = fakeModel();
  const report = createTripwire();
  guardModel(model, 'hero', report);
  assert.throws(
    () =>
      asProjector(() => {
        throw new Error('projection failed');
      }),
    /projection failed/,
  );
  assert.throws(() => model.set('content', 'after'), ProjectionLeak);
});

test('view state is not a leak; document state is', () => {
  // Selecting a node writes `status` on the model on every click. A tripwire that fired on that
  // would be ignored within a day, so it distinguishes the two kinds of write.
  const { model, calls } = fakeModel();
  const report = createTripwire({ throwOnLeak: false });
  guardModel(model, 'hero', report);
  model.set('status', 'selected');
  model.set('hovered', true);
  model.set({ open: true, toolbar: [] });
  assert.equal(report.leaks.length, 0, 'view-state writes are not leaks');
  model.set('content', 'edited');
  model.set({ attributes: { id: 'x' } });
  assert.deepEqual(
    report.leaks.map((l) => l.method),
    ['set', 'set'],
  );
  assert.equal(calls.length, 5, 'every call still reaches the model');
});

test('soft mode collects every leaking path instead of stopping at the first', () => {
  const { model, calls } = fakeModel();
  const report = createTripwire({ throwOnLeak: false });
  guardModel(model, 'hero-title', report);
  model.set('content', 'a');
  model.add();
  model.remove();
  assert.deepEqual(
    report.leaks.map((l) => l.method),
    ['set', 'add', 'remove'],
  );
  assert.equal(calls.length, 3, 'soft mode still lets the underlying call through, for triage runs');
});

test('nested projector scopes unwind correctly', () => {
  const { model } = fakeModel();
  const report = createTripwire();
  guardModel(model, 'n', report);
  asProjector(() => {
    asProjector(() => model.set('content', 1));
    model.set('content', 2);
  });
  assert.throws(() => model.set('content', 3), ProjectionLeak);
});
