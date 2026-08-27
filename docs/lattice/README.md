# Lattice

This repository is a fork of [GrapesJS](https://github.com/GrapesJS/grapesjs) being transformed,
by the strangler pattern, into **Lattice**: a site builder whose source of truth is a closed,
schema-validated IR, and whose only emitter is a compiler.

If you are reading this because you were about to rebase on upstream, read
[Fork drift policy](#fork-drift-policy) first.

## The one-paragraph version

GrapesJS is an *interpreter*: a Backbone model tree of arbitrary HTML with arbitrary CSS, edited by
two-way binding and exported by serialising that tree. Every Lattice guarantee — token-only styles,
grids where illegal states are unrepresentable, contrast and exposure proofs, deterministic
compilation, budget gates — depends on the source of truth being a closed IR instead. So the plan
is an organ transplant with the patient alive: keep the editor's body (canvas, drag and drop,
selection, panels), replace its heart (the document model) and its voice (the export path), and
delete the old organs only once their replacements carry load.

## What is here

| Path | What it is |
|---|---|
| `packages/engine` | `@lattice/engine` — the IR, the op vocabulary, the document store, the grid solver, the token model, the WASM host. No GrapesJS imports, ever. |
| `packages/engine/schema` | The IR schema. The single source of truth; TS and Rust types are generated from it. |
| `packages/shell` | The editor shell — flags, the IR→canvas projection, gesture capture, the tripwire, the schema-derived inspector. |
| `packages/shell/dev` | The runnable shell: a real GrapesJS editor showing a projection, with structure tree, block palette, token-only inspector, design-debt panel and budget meter. |
| `packages/lattice-cli` | `npx lattice` shim over the Rust binary. |
| `packages/core` | The GrapesJS fork, untouched. |
| `crates/compiler` | The compiler: resolve → typecheck → style-flatten → emit → prove → budget. The only emitter. |
| `crates/compiler-wasm` | The same compiler, second host. A facade with no logic of its own. |
| `crates/cli` | `lattice build \| check \| dev`. |
| `corpus/` | Ten hand-authored sites and the invalid fixtures each named diagnostic is pinned by. |
| `scripts/lattice/` | The CI gates: determinism, export-and-run, same-binary parity, projection parity, Lighthouse. |

## Run the editor

```
pnpm run build:cli && pnpm run build:core                                  # the GrapesJS fork
cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown
node packages/shell/dev/build.mjs corpus/sites/blog.json                    # bundle the shell
npx serve packages/shell/dev/dist          # or any static server; open the page
```

The shell boots with the Lattice flags on: the canvas is a projection of the IR compiled by the
same binary `lattice build` runs, every control in the inspector emits an op, ⌘Z is the engine's
history, and the session persists to IndexedDB as an op log. `?fresh=1` starts a clean session.

## Try the compiler

```
cargo run -p lattice-cli -- check corpus/sites        # every pass, no output
cargo run -p lattice-cli -- build corpus/sites/blog.json --out dist/blog
cargo run -p lattice-cli -- dev corpus/sites/landing.json   # build + serve + watch
cd dist/blog && npm ci && npm start                   # the export, with no network back to us
```

```
just check              # codegen freshness, engine tests, cargo tests
just determinism        # build the corpus twice, diff every byte
just export-and-run     # npm ci --offline && npm start, fetch every route
just wasm-parity        # native vs wasm, byte for byte
just projection-parity  # what the canvas shows vs what ships
CHROME_PATH=… node scripts/lattice/lighthouse.mjs    # the Stage B exit gate
node scripts/lattice/c3-spike.mjs                    # the C3 graft gate, in a real editor
node scripts/lattice/bench.mjs                       # latency thresholds on a 2,000-node page
```

The spike needs three things built first: `pnpm run build:cli && pnpm run build:core`,
`cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown`, and a Chromium
(`CHROME_PATH`, or `playwright install chromium`).

## The rules that are not negotiable

1. **The IR is the source of truth.** The component tree is a disposable projection of it. The
   tripwire (`packages/shell/src/projection/tripwire.ts`) throws if anything else writes to it.
2. **There is one emitter.** The editor does not serialise HTML; it asks the compiler, through
   WASM, for the same bytes `lattice build` produces. CI diffs the two on every route.
3. **Builds are deterministic.** See [determinism.md](determinism.md). Checked on every PR.
4. **The export runs with us unplugged.** No dependencies, `npm ci --offline && npm start`, checked
   on every PR.
5. **Quality is a build error, not a report.** Contrast, alt text, heading order, page descriptions
   and byte budgets fail the build and name the node or route responsible.

## Fork drift policy

Once `dom_components` is demoted to a projection target (Stage C exit), upstream GrapesJS
improvements mostly target organs this project is removing, and a wholesale rebase becomes cost
rather than gift.

**Policy:** after the Stage C exit gate, do not merge upstream wholesale. Cherry-pick fixes to
`canvas/`, `utils/sorter`, and `rich_text_editor/` only. `docs/lattice/A1-fork-divergence.md`
records where the fork stood at the start (an unmodified mirror of upstream `dev` at v0.23.6).

## Documents

* [A1 — fork divergence audit](A1-fork-divergence.md)
* [The determinism style guide](determinism.md)
* [C1 — the CRDT substrate: what is built, what the spike must decide](C1-crdt-spike.md)
* [C3 — the graft spike: does Backbone write back?](C3-graft-spike.md)
* [Latency benchmarks](benchmarks.md) — what is measured, and where the thresholds land
* [Transformation status](status.md) — every step of the plan, and where it actually stands
* [ATTRIBUTIONS](../../ATTRIBUTIONS.md) — licences, and why the engine is publishable as MIT
