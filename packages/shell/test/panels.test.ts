/**
 * Stage D2's audit, as a test: **no code path from any panel writes a style string.**
 *
 * The test walks every node of every corpus site, builds its panel, applies every option every
 * control offers, and asserts two things — the document stays schema-valid, and the op produced is
 * always a token reference or a typed value, never a raw declaration.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DocumentStore, apply, schemaValidator } from '@lattice/engine';
import { designDebt, expertDrawer, panelForNode } from '../src/panels.ts';

const validator = await schemaValidator();
const corpus = new URL('../../../corpus/sites/', import.meta.url).pathname;
const sites = readdirSync(corpus).filter(
  (f) => f.endsWith('.json') && !f.endsWith('.data.json') && !f.endsWith('.exposure.json'),
);

test('every option every panel offers produces a valid document', () => {
  let applied = 0;
  for (const site of sites) {
    const doc = JSON.parse(readFileSync(join(corpus, site), 'utf8'));
    for (const nodeId of Object.keys(doc.nodes)) {
      for (const section of panelForNode(doc, nodeId)) {
        for (const field of section.fields) {
          const options =
            field.control === 'token' ? field.options.map((o) => o.ref) : field.options.map((o) => o.value);
          for (const option of options) {
            const op = field.toOp(option as never);
            const next = apply(doc, op);
            const errors = validator.validate(next);
            assert.equal(errors.length, 0, `${site} ${nodeId} ${field.key}=${option}: ${JSON.stringify(errors[0])}`);
            applied++;
          }
        }
      }
    }
  }
  assert.ok(applied > 500, `expected the corpus to exercise the panels properly, got ${applied} applications`);
});

test('no panel control can express a raw value', () => {
  for (const site of sites) {
    const doc = JSON.parse(readFileSync(join(corpus, site), 'utf8'));
    for (const nodeId of Object.keys(doc.nodes)) {
      for (const section of panelForNode(doc, nodeId)) {
        for (const field of section.fields) {
          if (field.control === 'token') {
            for (const option of field.options) {
              assert.match(option.ref, /^[a-z]+\.[a-z0-9-]+$/, 'a token control offers token refs only');
            }
            const op = field.toOp('color.accent');
            assert.equal(op.kind, 'setStyle');
            assert.notEqual(op.key, 'escape', 'no ordinary control may reach the escape hatch');
          } else {
            const op = field.toOp(field.options[0].value);
            assert.ok(['setField', 'setStyle', 'setPlace'].includes(op.kind));
            if (op.kind === 'setStyle') assert.notEqual(op.key, 'escape');
          }
        }
      }
    }
  }
});

test('a heading panel offers levels and type roles, not font sizes', () => {
  const doc = JSON.parse(readFileSync(join(corpus, 'landing.json'), 'utf8'));
  const sections = panelForNode(doc, 'hero-title');
  const fields = sections.flatMap((s) => s.fields.map((f) => f.key));
  assert.deepEqual(fields.sort(), ['fg', 'level', 'type']);
  const typeField = sections[0].fields.find((f) => f.key === 'type')!;
  assert.deepEqual(
    typeField.options.map((o) => o.ref),
    ['type.body', 'type.h1', 'type.h2', 'type.h3', 'type.lead', 'type.small'],
  );
});

test('the escape hatch is reachable only from the expert drawer, and is counted', () => {
  const doc = JSON.parse(readFileSync(join(corpus, 'landing.json'), 'utf8'));
  assert.equal(designDebt(doc).count, 0, 'the corpus carries no design debt');

  const store = new DocumentStore(doc, { validator });
  const drawer = expertDrawer(store.document, 'hero-shot');
  store.apply(drawer.setEscape('mix-blend-mode', 'multiply'));

  const debt = designDebt(store.document);
  assert.equal(debt.count, 1);
  assert.deepEqual(debt.entries[0], { node: 'hero-shot', property: 'mix-blend-mode', value: 'multiply' });

  store.undo();
  assert.equal(designDebt(store.document).count, 0, 'debt is undoable like any other op');
});
