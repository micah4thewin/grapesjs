# The determinism style guide

Determinism is the property everything else in Lattice leans on: content-addressed publishes,
byte-diff rollback, "the same IR gives the same site", the escrow export a customer can rebuild
themselves. It is also the property that gets lost silently — to a `HashMap`, a timestamp, or a
float formatted two ways — and only shows up as a mysterious diff months later.

So it is a build rule, checked by CI on every PR (`scripts/lattice/determinism.mjs`), and these are
the rules the compiler is written to.

## 1. No unordered iteration reaches an output

`BTreeMap` and `BTreeSet`, never `HashMap`/`HashSet`, anywhere a value can influence emitted bytes.
This includes intermediate collections: a `HashMap` iterated to build a `Vec` that is later sorted
is fine in principle and a trap in practice, because the sort key is usually not total.

Where a `Vec` carries author order (a node's children, a document's routes), that order is data and
must be preserved exactly — never "stabilised" by sorting.

## 2. Nothing reads a clock, a locale, or the environment

No `SystemTime`, no build ids, no hostnames, no `env!()` beyond the crate version, no locale-aware
formatting. A build run twice one second apart, and a build run on two machines, are the same
bytes. The manifest the CLI writes has no timestamp for this reason.

## 3. Every number is formatted through `num::px` / `num::ratio`

At most three decimals, trailing zeros trimmed, no `-0`. `16` and `16.0` must never both be
possible for the same token depending on how it was authored.

## 4. Class names are pure functions of what they came from

`pad-5` comes from `space.5`. No counters, no hashes of iteration order, no "first seen" numbering.
Two builds of two slightly different documents produce class sets that diff meaningfully — which is
what makes a review of the emitted CSS possible at all.

## 5. Float arithmetic stays out of the emitted path where it can

Contrast ratios are computed in `f64` and compared against a threshold with an epsilon; they are
never emitted. Lengths are token values passed through, not computed.

## 6. The same rules apply to the WASM host

`crates/compiler-wasm` is a facade with no logic. `scripts/lattice/wasm-parity.mjs` compiles the
corpus in both hosts and diffs every byte, so a determinism bug that only shows up under a
different allocator or pointer width is caught by CI rather than by a customer.

## Checking your change

```
just determinism        # build the corpus twice, diff every byte
just wasm-parity        # native vs wasm, same bytes
cargo test --workspace  # includes the in-crate determinism test
```

If you need to introduce something genuinely non-deterministic (a random id, say), it belongs in
the *editor*, as an op input, not in the compiler. The compiler is a function.
