#!/usr/bin/env node
/**
 * Stage C3 — the graft-vs-greenfield spike, run headless.
 *
 * The plan gates the whole transformation here: if, after intercepting every mutation path we can
 * find, the tripwire still fires from places we cannot reach, the answer is to stop grafting and
 * rebuild the canvas greenfield. That decision deserves evidence rather than a feeling, so this
 * script boots a real GrapesJS editor showing a projection of a real corpus site, runs a scripted
 * editing session with real mouse events, and reports what the tripwire saw.
 *
 *   node scripts/lattice/c3-spike.mjs [--headed] [--site corpus/sites/landing.json]
 *
 * Prerequisites (the script checks and tells you): the GrapesJS build, the compiler's wasm build,
 * and the bundled harness (`node packages/shell/dev/build.mjs`).
 */
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const site = args.includes('--site') ? args[args.indexOf('--site') + 1] : 'corpus/sites/landing.json';
const headed = args.includes('--headed');
const repoRoot = resolve(import.meta.dirname, '../..');
const distDir = join(repoRoot, 'packages/shell/dev/dist');

const anchored = createRequire(join(repoRoot, 'packages/shell/package.json'));
let chromium;
try {
  // Playwright's ESM entry re-exports its internals; the CommonJS entry is the one that carries
  // the browser types, so it is required rather than imported.
  ({ chromium } = anchored('playwright'));
} catch {
  console.error('playwright is not installed (pnpm --filter @lattice/shell install)');
  process.exit(1);
}
if (!chromium) {
  console.error('playwright resolved without a chromium binding');
  process.exit(1);
}

console.log('building the harness…');
execFileSync('node', [join(repoRoot, 'packages/shell/dev/build.mjs'), site], { stdio: 'inherit', cwd: repoRoot });
if (!existsSync(join(distDir, 'main.js'))) process.exit(1);

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.map': 'application/json',
};
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = join(distDir, url.pathname === '/' ? 'index.html' : url.pathname.slice(1));
  try {
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((done) => server.listen(0, done));
const port = server.address().port;

// Use an explicit Chromium when one is configured (CI images and this sandbox both ship one);
// otherwise let Playwright use the browser it installed.
const explicitChrome =
  process.env.CHROME_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({
  headless: !headed,
  ...(explicitChrome ? { executablePath: explicitChrome } : {}),
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const consoleErrors = [];
page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
page.on('pageerror', (error) => consoleErrors.push(String(error)));
const failedRequests = [];
page.on('requestfailed', (request) => failedRequests.push(`${request.url()} (${request.failure()?.errorText})`));

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

try {
  // `?fresh=1` clears any persisted session, so the run starts from the corpus site every time.
  await page.goto(`http://127.0.0.1:${port}/?fresh=1`);
  await page.waitForFunction(() => window.latticeReady === true, null, { timeout: 30000 });

  // 1. The projection reaches the canvas, and it is the compiled page.
  const projected = await page.evaluate(() => window.lattice.projectedIds());
  const canvasIds = await page.evaluate(() =>
    [...window.lattice.canvasHtml().matchAll(/data-lattice-id="([^"]+)"/g)].map((m) => m[1]),
  );
  const missing = projected.filter((id) => !canvasIds.includes(id));
  check(
    'the projection reaches the canvas intact',
    missing.length === 0 && projected.length > 10,
    `${projected.length} nodes, ${missing.length} missing`,
  );

  const compiledIds = await page.evaluate(() =>
    [...window.lattice.compiledHtml().matchAll(/data-lattice-id="([^"]+)"/g)].map((m) => m[1]),
  );
  const drift = compiledIds.filter((id) => !canvasIds.includes(id));
  check(
    'what the canvas shows is what the compiler ships',
    drift.length === 0,
    `${compiledIds.length} nodes compiled, ${drift.length} not on canvas`,
  );

  // 2. Selection: a real click in the canvas resolves to an IR node.
  const bounds = await page.evaluate(() => window.lattice.boundsOf('f-invoice-h'));
  if (bounds) await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.waitForTimeout(200);
  const selected = await page.evaluate(() => window.lattice.selected);
  check(
    'clicking the canvas selects an IR node',
    selected === 'f-invoice-h' || selected === 'f-invoice',
    `selected ${selected}`,
  );

  // 3. The hostile one: a real drag, with the sorter's own ghost and placeholder, whose *effect*
  //    must arrive as ops rather than as a model mutation.
  const before = await page.evaluate(() => JSON.stringify(window.lattice.document.nodes['f-mobile'].place));
  // A component is moved through GrapesJS's own `tlb-move` command — what the toolbar's move
  // handle runs — so the sorter, its placeholder and its geometry all do their real work.
  const from = await page.evaluate(() => window.lattice.boundsOf('f-mobile'));
  const started = await page.evaluate(() => window.lattice.startMove('f-mobile'));
  check('the editor starts its own move interaction', started === true);
  const to = await page.evaluate(() => window.lattice.boundsOf('f-sched'));
  console.log(`  from ${JSON.stringify(from)} to ${JSON.stringify(to)}`);
  if (started && from && to) {
    await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
    for (let step = 1; step <= 12; step++) {
      await page.mouse.move(
        from.x + from.width / 2 + ((to.x + 12 - (from.x + from.width / 2)) * step) / 12,
        from.y + from.height / 2 + ((to.y + to.height / 2 - (from.y + from.height / 2)) * step) / 12,
      );
      await page.waitForTimeout(30);
    }
    // The canvas scrolls while sorting, so aim at where the target is *now* rather than where it
    // was when the drag began, then settle before releasing.
    const settled = await page.evaluate(() => window.lattice.boundsOf('f-sched'));
    if (settled) {
      await page.mouse.move(settled.x + 14, settled.y + settled.height / 2);
      await page.waitForTimeout(60);
      await page.mouse.move(settled.x + 16, settled.y + settled.height / 2);
      await page.waitForTimeout(120);
    }
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(500);
  }
  const dragOps = await page.evaluate(() => window.lattice.ops.filter((entry) => entry.reason === 'drop'));
  const after = await page.evaluate(() => JSON.stringify(window.lattice.document.nodes['f-mobile'].place));
  const dragDetail = dragOps.length
    ? dragOps
        .map((entry) => entry.ops.map((op) => `${op.kind}(${op.id ?? op.root ?? ''}→${op.parent ?? ''})`).join(' + '))
        .join('; ')
    : 'no drop ops emitted';
  check(
    'a real drag arrives as ops, not as a model mutation',
    dragOps.length > 0,
    `${dragDetail}; f-mobile place ${before} → ${after}`,
  );

  // A gesture may never leave the document in a state that will not compile — the canvas would be
  // showing a page that cannot ship.
  const afterDragErrors = await page.evaluate(() => window.lattice.errors);
  check(
    'the document still compiles after the drag',
    afterDragErrors.length === 0,
    afterDragErrors.map((e) => `${e.code}: ${e.message}`).join(' | '),
  );
  const interception = await page.evaluate(() => window.lattice.interception());
  check('the drop interception is installed', interception === 'installed', interception);

  // 4. The other gestures, through the same op layer.
  const textOps = await page.evaluate(() => window.lattice.commitText('hero-title', 'Edited in the canvas'));
  check('a text commit is one op', textOps.length === 1 && textOps[0].kind === 'setText');

  const blockOps = await page.evaluate(() =>
    window.lattice.dropBlock(
      {
        root: 'card',
        nodes: [
          { id: 'card', kind: 'stack', children: ['card-h'], place: { col: 1, span: 4 }, style: { gap: 'space.2' } },
          {
            id: 'card-h',
            kind: 'heading',
            level: 2,
            spans: [{ text: 'Dropped block' }],
            style: { type: 'type.h3', fg: 'color.fg' },
          },
        ],
      },
      'features',
      1,
    ),
  );
  check(
    'a dropped block inserts an IR fragment',
    blockOps.some((op) => op.kind === 'insertSubtree'),
    blockOps.map((o) => o.kind).join(' + '),
  );

  const resizeOps = await page.evaluate(() => window.lattice.resize('f-sched', 'end', 2));
  check('a resize becomes a placement change', resizeOps.length === 1 && resizeOps[0].kind === 'setPlace');

  // 5. Undo the whole session; the document must return to exactly what it was.
  const undone = await page.evaluate(async () => {
    // Key order is not meaning: an op that clears and restores a field can leave the same document
    // with its keys in a different order, so the comparison is order-independent.
    const stable = (value) =>
      JSON.stringify(value, (_, v) =>
        v && typeof v === 'object' && !Array.isArray(v)
          ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : 1)))
          : v,
      );
    let guard = 0;
    while (window.lattice.undo() && guard++ < 200);
    const pristine = await fetch('./site.json').then((r) => r.json());
    return { same: stable(window.lattice.document) === stable(pristine), undos: guard };
  });
  check('undo returns the document to where the session started', undone.same, `${undone.undos} undo(s)`);

  // The interception counters belong to the page that did the dragging; read them before the
  // reload replaces it.
  const stats = await page.evaluate(() => window.lattice.stats());
  console.log(`  interception stats: ${JSON.stringify(stats)}`);
  check(
    'the drop was refused at the model layer, not merely followed',
    stats.intercepted >= 1,
    JSON.stringify({ intercepted: stats.intercepted, drops: stats.drops }),
  );

  // 6. Stage C5: kill the tab mid-edit and reopen. The op log is the durable thing, so the edit
  //    that was never explicitly saved is still there.
  await page.evaluate(() => window.lattice.commitText('hero-sub', 'Written just before the tab died'));
  await page.evaluate(() => window.lattice.settled());
  // Reopening means loading the app again *without* `?fresh=1`: the session is whatever storage
  // held when the tab went away.
  await page.goto(`http://127.0.0.1:${port}/`);
  await page.waitForFunction(() => window.latticeReady === true, null, { timeout: 30000 });
  const recovered = await page.evaluate(() => ({
    text: window.lattice.document.nodes['hero-sub'].spans?.[0]?.text,
    persistence: window.lattice.persistence,
  }));
  check(
    'an edit survives the tab dying, with no explicit save',
    recovered.text === 'Written just before the tab died',
    `${recovered.persistence.recovered} op(s) recovered from storage`,
  );

  const budget = await page.evaluate(() => window.lattice.budget());
  const home = budget?.['/'];
  check(
    'the budget meter reads the same bytes the gate does',
    !!home && home.html > 0 && home.css > 0,
    home ? `html ${(home.html / 1024).toFixed(1)}KB, css ${(home.css / 1024).toFixed(1)}KB` : 'no route bytes',
  );

  // 7. The session's verdict: did anything write to a projected model behind our back?
  const sessionLeaks = await page.evaluate(() => window.lattice.leaks);
  check(
    'the tripwire saw no leaks during the session',
    sessionLeaks.length === 0,
    sessionLeaks.map((l) => `${l.method} on ${l.nodeId}`).join(', '),
  );
  for (const leak of sessionLeaks.slice(0, 3)) {
    console.log(`    leak: ${leak.method} on ${leak.nodeId}\n${leak.stack.replace(/^/gm, '      ')}`);
  }

  // 8. And is the tripwire actually armed? Poke a model deliberately; it must be caught.
  const afterPoke = await page.evaluate(() => window.lattice.pokeModel('hero-title'));
  check('the tripwire catches a deliberate write, so its silence means something', afterPoke > sessionLeaks.length);

  check(
    'no failed requests or uncaught errors in the editor',
    consoleErrors.length === 0 && failedRequests.length === 0,
    [...failedRequests.slice(0, 2), ...consoleErrors.slice(0, 2)].join(' | '),
  );
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log('\nGate reading: the graft is NOT clean on these paths —');
  for (const failure of failed) console.log(`  · ${failure.name}${failure.detail ? ` (${failure.detail})` : ''}`);
  process.exit(1);
}
console.log(
  '\nGate reading: every gesture in this session became an op, and nothing wrote to the projection behind our back.',
);
process.exit(0);
