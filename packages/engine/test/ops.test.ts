/**
 * Stage C1 done-when, in three properties:
 *   1. random op sequences preserve schema validity
 *   2. op + inverse is identity
 *   3. two replicas converge under concurrent edits
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { apply, invert, subtree, type Op } from '../src/ops.ts';
import { DocumentStore } from '../src/store.ts';
import { schemaValidator } from '../src/validate.ts';
import type { Document, Node } from '../src/generated/ir.ts';
import { loadSite, rng, pick } from './helpers.ts';

const validator = await schemaValidator();
const base = loadSite('landing.json');

const containers = (doc: Document) =>
  Object.values(doc.nodes)
    .filter((n) => ['section', 'stack', 'grid', 'frame'].includes(n.kind))
    .map((n) => n.id);

const textNodes = (doc: Document) =>
  Object.values(doc.nodes)
    .filter((n) => n.kind === 'text' || n.kind === 'heading')
    .map((n) => n.id);

let counter = 0;
function randomOp(doc: Document, random: () => number): Op | null {
  const roll = random();
  if (roll < 0.3) {
    const id = pick(random, textNodes(doc));
    return { kind: 'setText', id, spans: [{ text: `edited ${++counter}` }] };
  }
  if (roll < 0.5) {
    const id = pick(random, textNodes(doc));
    return { kind: 'setStyle', id, key: 'fg', value: pick(random, ['color.fg', 'color.muted', 'color.accent']) };
  }
  if (roll < 0.7) {
    // Insert a text node into a non-grid container (a grid child would need a placement).
    const parents = containers(doc).filter((id) => doc.nodes[id].kind !== 'grid');
    const parent = pick(random, parents);
    const node: Node = { id: `gen-${++counter}`, kind: 'text', spans: [{ text: 'generated' }] };
    return { kind: 'insertSubtree', nodes: [node], root: node.id, parent, index: Math.floor(random() * 4) };
  }
  if (roll < 0.85) {
    const movable = Object.values(doc.nodes).filter((n) => n.id.startsWith('gen-'));
    if (!movable.length) return null;
    const node = pick(random, movable);
    const parents = containers(doc).filter((id) => doc.nodes[id].kind !== 'grid');
    return { kind: 'moveNode', id: node.id, parent: pick(random, parents), index: Math.floor(random() * 3) };
  }
  const removable = Object.values(doc.nodes).filter((n) => n.id.startsWith('gen-'));
  if (!removable.length) return null;
  return { kind: 'removeSubtree', root: pick(random, removable).id };
}

test('random op sequences keep the document schema-valid', () => {
  for (let seed = 1; seed <= 25; seed++) {
    const random = rng(seed);
    let doc = base;
    for (let step = 0; step < 40; step++) {
      const op = randomOp(doc, random);
      if (!op) continue;
      try {
        doc = apply(doc, op);
      } catch {
        continue; // refused ops (cycles, missing targets) leave the document untouched, by design
      }
      const errors = validator.validate(doc);
      assert.equal(errors.length, 0, `seed ${seed} step ${step}: ${JSON.stringify(errors.slice(0, 2))}`);
    }
  }
});

test('op then inverse is the identity, for every op kind', () => {
  for (let seed = 1; seed <= 40; seed++) {
    const random = rng(seed * 7919);
    let doc = base;
    for (let step = 0; step < 25; step++) {
      const op = randomOp(doc, random);
      if (!op) continue;
      let inverse: Op;
      let next: Document;
      try {
        inverse = invert(doc, op);
        next = apply(doc, op);
      } catch {
        continue;
      }
      const restored = apply(next, inverse);
      assert.deepEqual(restored, doc, `seed ${seed} step ${step}: ${op.kind} was not undone cleanly`);
      doc = next;
    }
  }
});

test('token and route ops invert cleanly too', () => {
  const withToken = apply(base, { kind: 'setToken', group: 'color', name: 'accent', value: { value: '#aa0000' } });
  assert.equal(withToken.tokens.color.accent.value, '#aa0000');
  const back = apply(
    withToken,
    invert(base, { kind: 'setToken', group: 'color', name: 'accent', value: { value: '#aa0000' } }),
  );
  assert.deepEqual(back, base);

  const route = { path: '/about', title: 'About', root: 'home' };
  const added = apply(base, { kind: 'setRoute', path: '/about', route });
  assert.equal(added.routes.length, base.routes.length + 1);
  assert.deepEqual(apply(added, invert(base, { kind: 'setRoute', path: '/about', route })), base);
});

test('a move that would make a node its own ancestor is refused', () => {
  assert.throws(() => apply(base, { kind: 'moveNode', id: 'hero', parent: 'hero-title', index: 0 }), /own ancestor/);
  assert.throws(() => apply(base, { kind: 'moveNode', id: 'home', parent: 'f-sched-b', index: 0 }), /own ancestor/);
});

test('two replicas converge on concurrent edits', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const left = new DocumentStore(base, { replica: 'alice' });
    const right = new DocumentStore(base, { replica: 'bob' });
    const randomLeft = rng(seed);
    const randomRight = rng(seed + 1000);

    for (let step = 0; step < 12; step++) {
      const a = randomOp(left.document, randomLeft);
      const b = randomOp(right.document, randomRight);
      if (a)
        try {
          left.apply(a);
        } catch {
          /* refused locally */
        }
      if (b)
        try {
          right.apply(b);
        } catch {
          /* refused locally */
        }
    }

    const merged = DocumentStore.merge(base, [left.log, right.log]);
    const mergedOther = DocumentStore.merge(base, [right.log, left.log]);
    assert.deepEqual(merged.document, mergedOther.document, `seed ${seed}: merge order changed the result`);
    assert.equal(validator.validate(merged.document).length, 0, `seed ${seed}: merged document is invalid`);
  }
});

test('subtree returns a node and its descendants in document order', () => {
  assert.deepEqual(subtree(base, 'f-sched'), ['f-sched', 'f-sched-h', 'f-sched-b']);
});
