#!/usr/bin/env node
/**
 * Stage B exit gate — 95+ Lighthouse on every corpus site, from the export, in a real browser.
 *
 * This is the plan's Phase-0 kill criterion, so it is a script anyone can run rather than a claim
 * in a document. It builds each corpus site, serves it with the export's own `server.js` (the same
 * one a customer would run), and scores every route.
 *
 *   node scripts/lattice/lighthouse.mjs            # skips with a note if lighthouse is absent
 *   node scripts/lattice/lighthouse.mjs --require  # CI: a missing lighthouse fails the job
 *
 * CHROME_PATH must point at a Chromium binary.
 */
import { execFileSync, spawn } from 'node:child_process';
import { readdirSync, readFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const THRESHOLD = Number(process.env.LATTICE_LIGHTHOUSE_MIN ?? 95);
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const require_ = process.argv.includes('--require');

/**
 * Lighthouse is a devDependency of packages/lattice-cli rather than of the repository root: it is
 * a Lattice gate, and the GrapesJS fork's own install should not grow a browser test harness.
 */
const anchored = createRequire(new URL('../../packages/lattice-cli/package.json', import.meta.url));
const importFrom = async (name) => import(pathToFileURL(anchored.resolve(name)).href);

let lighthouse;
let launch;
try {
  ({ default: lighthouse } = await importFrom('lighthouse'));
  ({ launch } = await importFrom('chrome-launcher'));
} catch {
  const message = 'lighthouse is not installed (npm i -D lighthouse); the Stage B exit gate was not measured';
  if (require_) {
    console.error(`✗ ${message}`);
    process.exit(1);
  }
  console.log(`- skipped: ${message}`);
  process.exit(0);
}
const sites = readdirSync('corpus/sites')
  .filter((f) => f.endsWith('.json') && !f.endsWith('.data.json'))
  .sort();
const chrome = await launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

const results = [];
let failures = 0;
let port = 8500;

try {
  for (const site of sites) {
    const out = mkdtempSync(join(tmpdir(), 'lattice-lh-'));
    let server;
    try {
      execFileSync(
        'cargo',
        ['run', '-q', '-p', 'lattice-cli', '--', 'build', join('corpus/sites', site), '--out', out, '--quiet'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
        },
      );
      writeFileSync(
        join(out, 'package-lock.json'),
        JSON.stringify({
          name: 'export',
          lockfileVersion: 3,
          requires: true,
          packages: { '': { name: 'export', version: '0.0.0' } },
        }),
      );
      const sitePort = port++;
      server = spawn('node', ['server.js'], {
        cwd: out,
        env: { ...process.env, PORT: String(sitePort) },
        stdio: 'ignore',
        detached: true,
      });

      let ready = false;
      for (let attempt = 0; attempt < 50 && !ready; attempt++) {
        await delay(100);
        try {
          ready = (await fetch(`http://127.0.0.1:${sitePort}/`)).ok;
        } catch {
          /* still starting */
        }
      }
      if (!ready) throw new Error('export did not start');

      const routes = Object.keys(JSON.parse(readFileSync(join(out, '.lattice-manifest.json'), 'utf8')).routeBytes);
      for (const route of routes) {
        const run = await lighthouse(`http://127.0.0.1:${sitePort}${route}`, {
          port: chrome.port,
          output: 'json',
          logLevel: 'error',
          onlyCategories: CATEGORIES,
        });
        const scores = Object.fromEntries(
          CATEGORIES.map((c) => [c, Math.round((run.lhr.categories[c]?.score ?? 0) * 100)]),
        );
        const worst = Math.min(...Object.values(scores));
        const line = `${site} ${route}: ${CATEGORIES.map((c) => `${c[0]}${scores[c]}`).join(' ')}`;
        results.push({ site, route, scores });
        if (worst < THRESHOLD) {
          failures++;
          console.error(`✗ ${line} — below ${THRESHOLD}`);
          for (const [id, audit] of Object.entries(run.lhr.audits)) {
            if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'informative') {
              console.error(`    ${id}: ${audit.title}`);
            }
          }
        } else {
          console.log(`✓ ${line}`);
        }
      }
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
} finally {
  await chrome.kill();
}

const lowest = results.length ? Math.min(...results.flatMap((r) => Object.values(r.scores))) : 0;
console.log(`\n${results.length} route(s) scored; lowest category score ${lowest}`);
if (failures) {
  console.error(`${failures} route(s) below ${THRESHOLD} — the Stage B exit gate is not met`);
  process.exit(1);
}
process.exit(0);
