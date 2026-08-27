#!/usr/bin/env node
/**
 * `npx lattice …` — a thin shim so the CLI is reachable from the JS workspace without anyone
 * needing to know where cargo put the binary. The compiler itself is Rust; this file must never
 * grow logic of its own.
 *
 * (Named @lattice/cli rather than occupying packages/cli, which is the GrapesJS fork's own CLI.
 * See docs/lattice/README.md.)
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const candidates = [
  resolve(repoRoot, 'target/release/lattice'),
  resolve(repoRoot, 'target/debug/lattice'),
];
const binary = candidates.find((path) => existsSync(path));
const args = process.argv.slice(2);

try {
  if (binary) {
    execFileSync(binary, args, { stdio: 'inherit' });
  } else {
    // No build yet — go through cargo so a fresh clone still works.
    execFileSync('cargo', ['run', '-q', '-p', 'lattice-cli', '--', ...args], { stdio: 'inherit', cwd: repoRoot });
  }
} catch (error) {
  process.exit(typeof error.status === 'number' ? error.status : 1);
}
