# Latency: what is measured, and where the plan's thresholds actually land

`scripts/lattice/bench.mjs` generates a 2,000-node page — the shape big sites have, sections of
grids of cards of text — and measures the paths the editor's feel depends on. It runs in CI with
thresholds, so a regression is a failed job rather than a complaint six months later.

```
node scripts/lattice/bench.mjs                     # default: 2,000 nodes, 60 iterations
node scripts/lattice/bench.mjs --nodes 5000 --json
```

## Current numbers

Measured on the development container (a shared cloud runner, not a fast laptop; treat these as an
upper bound for a developer machine and a lower bound for a low-end one).

| Path | p50 | p95 | Threshold | Source of the threshold |
|---|---|---|---|---|
| op apply, validated | 0.55ms | **1.16ms** | 16ms | Stage C6 |
| op apply, unvalidated | 0.49ms | 0.73ms | 16ms | — |
| WASM compile, fast profile, per route | 20.2ms | **28.2ms** | 150ms | Part IV risk 6 |
| WASM compile, full profile, per route | 19.9ms | 25.6ms | 400ms | — |
| projection built from the compiled page | 6.2ms | 14.4ms | 50ms | — |
| op → canvas round trip (op + full recompile + projection) | 27.7ms | **32.2ms** | 150ms | see below |

## Two findings worth stating plainly

**1. Full-document validation on every op was most of a frame.** Validating the whole document after
each op measured p95 14.7ms on this page — for a change that touched one node. Since ops address
nodes, `DocumentStore` now validates only what the op touched (`Validator.validateNodes`), and a
document-wide op validates its section. That moved p95 from 14.7ms to 1.16ms. Cross-node invariants
— dangling children, cycles, unreachable nodes — were never the validator's job anyway; they belong
to the compiler's resolve pass, which runs on every projection.

**2. The plan's "p95 op → canvas < 16ms" is not met by recompiling per op, and should not be.**
A full route recompile is ~28ms at p95 here, so op-then-recompile lands at ~32ms. Two things follow:

* The op itself is well inside a frame (1.16ms), which is what the *editing* feel depends on —
  selection, dragging and typing never wait on the compiler.
* The picture is coalesced rather than recomputed per op. `ProjectionScheduler` batches every op
  that arrives before the next frame and projects once, so a drag (dozens of ops) costs one
  projection, not dozens.

That leaves a real gap against the letter of the C6 target for the *first* frame after an edit on a
2,000-node page. The honest options, in order of preference, are: incremental compilation (compile
the affected subtree rather than the route — the resolve pass already computes the dependency
graph), a smaller compile unit for the preview, or accepting ~30ms for the picture while keeping the
gesture itself at ~1ms. This is not resolved, and the number above is what it is today.

## Note on the machine

The plan's risk 6 asks for p95 < 150ms per route on a *reference low-end box*. This container is not
that box, so the 28.2ms figure does not discharge the risk — it says the design has roughly 5×
headroom on a mid-range machine. The reference box needs to be a named piece of hardware in CI
before that threshold means anything.
