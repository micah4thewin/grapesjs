/**
 * Stage B1 done-when: the corpus validates, and the invalid fixtures fail with the *named node*.
 * A validator that says "document invalid" is not a validator anyone can act on.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { schemaValidator, formatErrors } from '../src/validate.ts';
import { repoFile } from './helpers.ts';

const validator = await schemaValidator();

test('every corpus site validates', () => {
  const dir = repoFile('corpus/sites');
  const sites = readdirSync(dir).filter(
    (f) => f.endsWith('.json') && !f.endsWith('.data.json') && !f.endsWith('.exposure.json'),
  );
  assert.ok(sites.length > 0);
  for (const site of sites) {
    const doc = JSON.parse(readFileSync(join(dir, site), 'utf8'));
    const errors = validator.validate(doc);
    assert.equal(errors.length, 0, `${site}:\n${formatErrors(errors)}`);
  }
});

test('a raw hex where a token belongs fails, naming the node', () => {
  const doc = JSON.parse(readFileSync(repoFile('corpus/invalid/raw-hex-color.json'), 'utf8'));
  const errors = validator.validate(doc);
  assert.ok(errors.length > 0);
  assert.equal(errors[0].node, 'root');
  assert.match(errors[0].message, /#ff0000/);
});

test('unknown properties are rejected: the world is closed', () => {
  const doc = JSON.parse(readFileSync(repoFile('corpus/sites/landing.json'), 'utf8'));
  doc.nodes.hero.shadow = 'big';
  const errors = validator.validate(doc);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].node, 'hero');
  assert.match(errors[0].message, /unknown property shadow/);
});

test('missing required fields are named by path', () => {
  const doc = JSON.parse(readFileSync(repoFile('corpus/sites/landing.json'), 'utf8'));
  delete doc.tokens;
  assert.match(formatErrors(validator.validate(doc)), /required property tokens is missing/);
});

test('out-of-range values fail', () => {
  const doc = JSON.parse(readFileSync(repoFile('corpus/sites/landing.json'), 'utf8'));
  doc.nodes['hero-title'].level = 9;
  const errors = validator.validate(doc);
  assert.equal(errors[0].node, 'hero-title');
  assert.match(errors[0].message, /must be <= 6/);
});
