#!/usr/bin/env node
/**
 * CI job 2 — export-and-run (Stage A3).
 *
 * The promise is that a Lattice site keeps running when we are gone. This job proves it the only
 * way that means anything: compile a corpus site, then in a directory with *no* network route back
 * to us run `npm ci && npm start` and fetch every route the manifest says exists.
 *
 * `npm ci` is run with `--offline --no-audit --no-fund`: the export has no dependencies, so if it
 * ever grows one this job fails rather than quietly reaching for a registry.
 */
import { execFileSync, spawn } from 'node:child_process';
import { readdirSync, readFileSync, mkdtempSync, rmSync, existsSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const sites = existsSync('corpus/sites')
  ? readdirSync('corpus/sites')
      .filter((f) => f.endsWith('.json') && !f.endsWith('.data.json') && !f.endsWith('.exposure.json'))
      .sort()
  : [];

let failures = 0;
let port = 8391;

for (const site of sites) {
  const out = mkdtempSync(join(tmpdir(), 'lattice-export-'));
  let server;
  try {
    execFileSync(
      'cargo',
      ['run', '-q', '-p', 'lattice-cli', '--', 'build', join('corpus/sites', site), '--out', out, '--quiet'],
      {
        stdio: ['ignore', 'inherit', 'inherit'],
      },
    );

    // An empty lockfile keeps `npm ci` honest: it will refuse rather than resolve anything.
    writeFileSync(
      join(out, 'package-lock.json'),
      JSON.stringify(
        {
          name: site.replace(/\.json$/, ''),
          lockfileVersion: 3,
          requires: true,
          packages: { '': { name: site.replace(/\.json$/, ''), version: '0.0.0' } },
        },
        null,
        2,
      ),
    );
    execFileSync('npm', ['ci', '--offline', '--no-audit', '--no-fund'], {
      cwd: out,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const sitePort = port++;
    // Detached so the whole process group can be killed: `npm start` spawns node, and killing
    // only npm would leave the server holding the port and this script's event loop open.
    server = spawn('npm', ['start'], {
      cwd: out,
      env: { ...process.env, PORT: String(sitePort) },
      stdio: ['ignore', 'ignore', 'ignore'],
      detached: true,
    });

    const routes = Object.keys(JSON.parse(readFileSync(join(out, '.lattice-manifest.json'), 'utf8')).routeBytes);
    let ready = false;
    for (let attempt = 0; attempt < 50 && !ready; attempt++) {
      await delay(100);
      try {
        const probe = await fetch(`http://127.0.0.1:${sitePort}/`);
        ready = probe.ok;
      } catch {
        /* still starting */
      }
    }
    if (!ready) throw new Error('export did not start');

    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${sitePort}${route}`);
      if (!response.ok) throw new Error(`route ${route} returned ${response.status}`);
      const body = await response.text();
      if (!body.includes('data-lattice-id'))
        throw new Error(`route ${route} served a page with no IR-addressed content`);
    }
    const missing = await fetch(`http://127.0.0.1:${sitePort}/definitely-not-a-route`);
    if (missing.status !== 404) throw new Error(`unknown route returned ${missing.status}, expected 404`);

    console.log(`✓ ${site}: ${routes.length} route(s) served from a dependency-free export`);
  } catch (error) {
    console.error(`✗ ${site}: ${error.message}`);
    failures++;
  } finally {
    if (server?.pid) {
      try {
        process.kill(-server.pid, 'SIGKILL');
      } catch {
        server.kill('SIGKILL');
      }
    }
    rmSync(out, { recursive: true, force: true });
  }
}

if (failures) {
  console.error(`\n${failures} site(s) failed export-and-run`);
  process.exit(1);
}
console.log(`\nexport-and-run holds across ${sites.length} site(s)`);
process.exit(0);
