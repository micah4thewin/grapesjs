# Transformation status

Every step of the transformation plan, and where it actually stands in this repository. The plan is
a multi-year programme; this file exists so nobody has to guess which parts are load-bearing today
and which are still a sentence in a document.

**Legend** — ✅ done and tested · 🟡 partial (scope stated) · ⬜ not started

## Stage A — foundation

| Step | State | Where |
|---|---|---|
| A1 audit the fork's divergence | ✅ | [`A1-fork-divergence.md`](A1-fork-divergence.md). The fork is an unmodified mirror of upstream `dev` at v0.23.6 within a 50-commit clone; no preservation decisions, no rebase. The upstream remote could not be attached (session GitHub scope covers one repository), which the report states rather than papers over. |
| A2 restructure the monorepo | ✅ | `packages/engine`, `packages/shell`, `packages/lattice-cli`, `crates/{compiler,compiler-wasm,cli}`, `corpus/`, cargo workspace beside the pnpm one, `justfile` over both. `packages/core` untouched. |
| A3 CI with the non-negotiables | ✅ | `.github/workflows/lattice.yml`: determinism, export-and-run, same-binary parity, projection parity, plus codegen freshness and the test suites. The GrapesJS suites stay in the required set as the regression net. |
| A4 feature-flag rail | ✅ | `packages/shell/src/flags.ts`. Boots pure-GrapesJS or flags-on from one build; impossible combinations are corrected, not permitted. |

**Deviation:** the plan names `packages/cli` for the Lattice CLI; that path is the GrapesJS fork's
own CLI, so the shim is `packages/lattice-cli` and the binary lives in `crates/cli`.

## Stage B — IR + compiler, standalone

| Step | State | Where |
|---|---|---|
| B1 IR schema | ✅ | `packages/engine/schema/lattice-ir.schema.json` — one source, generating TS (`packages/engine/src/generated/ir.ts`) and Rust (`crates/compiler/src/generated/ir.rs`) via `tools/codegen.mjs`; CI fails on drift. Version stamp, stable ids, token-ref-only styles with counted `escape`, required alt and intrinsic dimensions, `bind` paths, dormant redirect ledger, collections. Ten corpus sites validate; thirteen invalid fixtures each fail with the specific named diagnostic a test pins. |
| B2 passes 1–2, 4 + emit | ✅ | `crates/compiler/src/passes/{resolve,typecheck,style_flatten}.rs` + `emit.rs`. Atomic classes with stable readable names, per-route critical CSS, deterministic output. Pass 3 (lower) is reserved for Stage E5. |
| B3 budget gate + prove v0 | ✅ | `budget.rs` (terminal, names the route; html/css/js/image/total) and `prove.rs` (contrast against WCAG thresholds using the type token to pick the large-text rule; alt completeness; **plus** heading order and route descriptions, added after a Lighthouse run found them). |
| B4 WASM build | ✅ | `crates/compiler-wasm` over a raw length-prefixed ABI — no bindgen toolchain. `packages/engine/src/wasm-host.ts` is the whole JS side. `scripts/lattice/wasm-parity.mjs` diffs native against WASM across the corpus. |
| B5 `lattice` CLI v0 | ✅ | `crates/cli`: `build`, `check`, `dev` (build + serve + poll-watch), zero dependencies. |
| **Stage B exit gate** | ✅ | `scripts/lattice/lighthouse.mjs` scores every route of all ten corpus sites from the export, in Chromium: **24 routes, 100/100/100/100** on performance, accessibility, best practices and SEO. Export-and-run holds for all ten. |

## Stage C — the graft

| Step | State | Where |
|---|---|---|
| C1 IR store + ops log | 🟡 | `packages/engine/src/{ops,store}.ts`. Typed invertible ops, append-only log, one history stack, deterministic total-order merge with cycle-safe moves. Property tests cover all three done-when claims. **The Loro/Yjs spike is not done**: see [`C1-crdt-spike.md`](C1-crdt-spike.md) for exactly what today's substrate does not give (character-level text merge, log compaction, list-CRDT ordering, causal delivery). |
| C2 read-only projection | ✅ | `packages/shell/src/projection/`. The projector does not render: it asks the compiler (WASM) for the route and turns that output into a locked id-addressed tree, so canvas and export cannot drift by construction. `scripts/lattice/projection-parity.mjs` proves round-trip equality, node coverage and class equality on every route — a permanent job. |
| C3 gesture capture | 🟡 | `packages/shell/src/gestures.ts` (selection, text commit, drag/drop through the grid solver, block insert as IR fragments, resize), `projection/canvas.ts` (the drop interception) and `projection/tripwire.ts`. **The live spike runs**: `scripts/lattice/c3-spike.mjs` boots a real GrapesJS editor in headless Chromium and drives a scripted session with real mouse input — 14/14 checks, including a real drag through GrapesJS's own sorter that produced ops and no model mutation. Eight real defects were found and fixed this way; see [`C3-graft-spike.md`](C3-graft-spike.md). **Still 🟡 because** the plan's gate is a person building a five-page site, and the RTE, layer manager, clipboard and block-palette drag paths are not yet exercised. |
| C4 undo/redo cutover | 🟡 | Ops-log undo, one stack across text/structure/style/tokens, redo cleared on branch, batching so one gesture is one undo — all tested. The `undo_manager` disable and the RTE interop live in the shell app that C3's spike will boot. |
| C5 persistence + offline | ✅ | `packages/engine/src/persistence.ts`: the durable thing is the op log, not a project blob. `SessionPersistence` appends every op, compacts into a snapshot past a threshold, reports failed writes instead of pretending, and keeps the unsent ops as the offline queue; `restore()` folds snapshot + log back into a store. Memory and IndexedDB backends. Tested for the plan's done-when — **the spike kills the tab mid-edit in a real browser, reopens, and the unsaved edit is there** (13 ops recovered) — and for two offline sessions converging on reconnect. |
| C6 incremental projection | 🟡 | `ProjectionCanvas.applyChange()` patches by node id for content changes and re-mounts for structural ones; `ProjectionScheduler` coalesces a burst of ops into one projection. **The 2,000-node benchmark exists and runs in CI** ([`benchmarks.md`](benchmarks.md)): op apply is p95 1.16ms (after moving validation off the whole document and onto the touched nodes — it was 14.7ms), but the op→canvas round trip is p95 32ms because the preview recompiles the whole route. The plan's 16ms target for the picture is therefore **not met**; the options are written down rather than papered over. |

## Stage D — design system

| Step | State | Where |
|---|---|---|
| D1 tokens module | 🟡 | `packages/engine/src/tokens.ts`: token CRUD as ops (undoable, multiplayer-safe), usage queries, resolution, design-debt query. The inspector renders colour tokens as swatches and applies them as ops; a dedicated token *editor* (add/rename/retire a token) is not built. |
| D2 token-constrained panels | 🟡 | `packages/shell/src/panels.ts` derives each node type's panel from the schema and the document's own tokens; every control produces an op, and the audit test ("no code path from any panel writes a style string") walks every option of every field of every node in the corpus. **The panels are rendered** in `packages/shell/dev` — colour swatches, spacing steps, type roles, grid column/span — beside a live design-debt counter. **Not done:** the expert drawer's UI and `trait_manager`'s retirement. |
| D3 grid constraint solver | ✅ | `packages/engine/src/grid.ts` — pure and testable, called by drop and resize so illegal placements are unrepresentable at the op level. The done-when monkey test (1,000 random drags → 1,000 valid documents, zero raw positions) passes. |
| D4 responsive cutover | 🟡 | Container-query-first is in the emitted CSS (`container-type: inline-size` on every layout primitive). Breakpoint-overrides-as-diffs and the device-toolbar rework are not started. |
| D5 live performance meter | 🟡 | The shell's top bar shows the route's shipped bytes against the budget (turning amber past 80%), from the same fast-profile compile the canvas is showing; the spike asserts the meter reads what the gate reads. Click-to-select-the-offender is not wired; the compiler exposes `budget::headroom` for it. |

## Stage E — data and the proofs that need it

| Step | State | Where |
|---|---|---|
| E1 collections + schema-checked binds | 🟡 | Collections are in the IR and the typecheck pass resolves every `bind` against them: a dangling bind, a wrong-scope bind and an unknown field are named build errors. `data_sources` remains excluded from the build, per plan. Renaming a field breaks the build today. |
| E2 backend service | ⬜ | Not started. Build-time records come from a JSON snapshot beside the site (`corpus/sites/blog.data.json`), which is deliberately the same shape the database will hand over. |
| E3 real data on canvas | 🟡 | The shell loads the site's record snapshot and the canvas shows real rows — the blog site's list renders three real posts, and a dynamic route projects the first record's page rather than a placeholder. Editing a bound value back to a record needs E2. |
| E4 exposure diff | 🟡 | **The half that needs no backend is done.** `prove_exposure` computes the anonymous-readable `collection.field` set per route and fails the build when a route renders a field marked `private`, or any field of a collection not marked `publicRead` — naming the node, the field and the route. Two corpus fixtures pin it (`exposed-private-field.json`, `unpublished-collection.json`). `lattice exposure [--baseline] [--accept]` diffs the set against the last published one, fails on any widening, and requires a deliberate `--accept` to record a wider set; every corpus site carries its baseline, and CI checks them. **Not done:** permissions from a real backend, the publish-time pause-and-review UI, and the hand-audit-vs-prover suite. |
| E5 forms, workflows, observability | ⬜ | Not started. |

## Stages F, G, H

⬜ Not started, with two exceptions worth noting: the redirect ledger is schema'd and emitted
(`_redirects`, honoured by the export's server) ready for F2, and the compiler already persists the
route dependency graph the F1 incremental rebuild needs (`.lattice-manifest.json`).

## What the Lighthouse run changed

Running the gate for the first time found three things the compiler was not proving, all of which
are now build errors or warnings rather than something to notice in a browser later:

* **Heading order** — the restaurant and CV corpus sites jumped h1 → h3. Now `prove.heading-order`.
* **Route descriptions** — seven routes had none. Now `prove.seo.description`.
* **The site icon** — every first page view 404'd on `/favicon.ico`. `icon` is now part of the IR,
  emitted as a `<link rel="icon">`, shipped as an asset and counted against the image budget;
  `prove.icon.missing` warns when a document has none.

That sequence is the intended one: a gate finds a class of defect, the compiler learns to prove it,
and the gate stops being the thing that catches it.

## The gates, and what they say today

| Gate | Verdict |
|---|---|
| Stage B exit (95+ Lighthouse on ten sites, 100% export-and-run) | **Met.** 24 routes scored in Chromium at 100 in every category; every site boots from `npm ci --offline && npm start` and serves every route it declares. |
| Stage C3 graft-vs-greenfield | **Reading clean, not yet called.** A scripted session in a real editor produces ops for every gesture and zero leaks (`scripts/lattice/c3-spike.mjs`, in CI on every PR). The paths it does not cover — RTE, layer manager, clipboard, palette drag, long sessions — are listed in [`C3-graft-spike.md`](C3-graft-spike.md), and the greenfield fallback stays available until they are. |
| Weekend test (Stage E+F) | Not applicable yet. |
