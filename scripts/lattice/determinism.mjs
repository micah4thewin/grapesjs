#!/usr/bin/env node
/**
 * CI job 1 — determinism (Stage A3, guarded from commit one).
 *
 * Builds the whole corpus twice into separate directories and diffs every byte. Determinism is
 * lost to a stray HashMap or a timestamp, never to a decision, so it has to be checked
 * mechanically and on every PR — including on an empty corpus, where it passes trivially.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sites = existsSync('corpus/sites')
  ? readdirSync('corpus/sites')
      .filter((f) => f.endsWith('.json') && !f.endsWith('.data.json') && !f.endsWith('.exposure.json'))
      .sort()
  : [];

const build = (site, out) =>
  execFileSync(
    'cargo',
    ['run', '-q', '-p', 'lattice-cli', '--', 'build', join('corpus/sites', site), '--out', out, '--quiet'],
    {
      stdio: ['ignore', 'inherit', 'inherit'],
    },
  );

const listFiles = (dir, prefix = '') =>
  readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? listFiles(join(dir, e.name), `${prefix}${e.name}/`) : [`${prefix}${e.name}`]))
    .sort();

let failures = 0;
for (const site of sites) {
  const a = mkdtempSync(join(tmpdir(), 'lattice-det-a-'));
  const b = mkdtempSync(join(tmpdir(), 'lattice-det-b-'));
  try {
    build(site, a);
    build(site, b);
    const filesA = listFiles(a);
    const filesB = listFiles(b);
    if (filesA.join('\n') !== filesB.join('\n')) {
      console.error(`✗ ${site}: the two builds emitted different file lists`);
      failures++;
      continue;
    }
    const differing = filesA.filter((f) => !readFileSync(join(a, f)).equals(readFileSync(join(b, f))));
    if (differing.length) {
      console.error(`✗ ${site}: ${differing.length} file(s) differ between identical builds: ${differing.join(', ')}`);
      failures++;
      continue;
    }
    console.log(`✓ ${site}: ${filesA.length} files byte-identical across builds`);
  } finally {
    rmSync(a, { recursive: true, force: true });
    rmSync(b, { recursive: true, force: true });
  }
}

if (failures) {
  console.error(`\n${failures} site(s) are not deterministic`);
  process.exit(1);
}
console.log(`\ndeterminism holds across ${sites.length} site(s)`);
