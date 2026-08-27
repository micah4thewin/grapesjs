/**
 * Stage A4 — the shell boots in either mode from the same build, and impossible combinations of
 * flags are corrected rather than allowed to exist.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LATTICE, LEGACY, describe, enforce, resolveFlags } from '../src/flags.ts';

test('the default is pure GrapesJS', () => {
  assert.deepEqual(resolveFlags(undefined, {}, ''), LEGACY);
  assert.equal(describe(LEGACY), 'lattice flags: none (pure GrapesJS)');
});

test('?lattice=on turns the transformation on wholesale', () => {
  assert.deepEqual(resolveFlags(LEGACY, {}, '?lattice=on'), LATTICE);
  assert.deepEqual(resolveFlags(LATTICE, {}, '?lattice=off'), LEGACY);
});

test('individual flags can be named in the query, for bug reports', () => {
  const flags = resolveFlags(LEGACY, { irSourceOfTruth: true }, '?lattice=tokenPanels,designDebtPanel');
  assert.equal(flags.tokenPanels, true);
  assert.equal(flags.designDebtPanel, true);
  assert.equal(flags.compiledPreview, false);
});

test('a compiled preview without the IR as source of truth cannot be configured', () => {
  const flags = enforce({ ...LEGACY, compiledPreview: true, performanceMeter: true, opsUndo: true });
  assert.equal(flags.compiledPreview, false);
  assert.equal(flags.performanceMeter, false);
  assert.equal(flags.opsUndo, false);
});

test('unknown flag names are ignored, not crashed on', () => {
  assert.deepEqual(resolveFlags(LEGACY, {}, '?lattice=notAFlag'), LEGACY);
});
