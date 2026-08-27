#!/usr/bin/env node
/**
 * CI job 3 — same-binary parity (Stage B4 done-when).
 *
 * Compiles every corpus site natively (the CLI) and through the WASM host (what the editor uses),
 * then diffs every emitted byte. If these two ever disagree, the canvas is lying about what ships.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCompiler, DEFAULT_WASM_PATH } from '../../packages/engine/src/wasm-host.ts';

const sites = readdirSync('corpus/sites')
  .filter((f) => f.endsWith('.json') && !f.endsWith('.data.json') && !f.endsWith('.exposure.json'))
  .sort();

if (!existsSync(DEFAULT_WASM_PATH)) {
  console.error(
    `missing ${DEFAULT_WASM_PATH}\nrun: cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown`,
  );
  process.exit(1);
}

const compiler = await loadCompiler(DEFAULT_WASM_PATH);
const version = compiler.schemaVersion();
console.log(`wasm host speaks schema ${version}`);

let failures = 0;
for (const site of sites) {
  const path = join('corpus/sites', site);
  const dataPath = path.replace(/\.json$/, '.data.json');

  const out = mkdtempSync(join(tmpdir(), 'lattice-parity-'));
  try {
    execFileSync('cargo', ['run', '-q', '-p', 'lattice-cli', '--', 'build', path, '--out', out, '--quiet'], {
      stdio: ['ignore', 'inherit', 'inherit'],
    });

    const wasm = compiler.compile({
      document: readFileSync(path, 'utf8'),
      data: existsSync(dataPath) ? readFileSync(dataPath, 'utf8') : null,
      profile: 'full',
      emit_app: true,
    });

    if (!wasm.ok) {
      console.error(
        `✗ ${site}: wasm build failed\n${wasm.diagnostics.map((d) => `  ${d.code}: ${d.message}`).join('\n')}`,
      );
      failures++;
      continue;
    }

    let mismatched = 0;
    for (const [file, content] of Object.entries(wasm.files)) {
      const native = readFileSync(join(out, file), 'utf8');
      if (native !== content) {
        console.error(`✗ ${site}: ${file} differs between native and wasm hosts`);
        mismatched++;
      }
    }
    // Two things the native build writes that the compiler does not emit: the manifest (the wasm
    // facade returns it as structured data instead) and the asset copies (the compiler is given
    // asset *sizes*, never bytes, so that the editor never has to ship pixels across the ABI).
    const nativeFiles = listFiles(out).filter((f) => f !== '.lattice-manifest.json' && !f.startsWith('assets/'));
    const missing = nativeFiles.filter((f) => !(f in wasm.files));
    if (missing.length) {
      console.error(`✗ ${site}: native emitted files the wasm host did not: ${missing.join(', ')}`);
      mismatched++;
    }
    if (mismatched === 0) console.log(`✓ ${site}: ${Object.keys(wasm.files).length} files identical across hosts`);
    else failures++;
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
}

function listFiles(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(join(dir, entry.name), `${prefix}${entry.name}/`) : [`${prefix}${entry.name}`],
  );
}

if (failures) {
  console.error(`\n${failures} site(s) differ across hosts`);
  process.exit(1);
}
console.log(`\nsame-binary parity holds across ${sites.length} site(s)`);
