# Lattice — one pipeline over the pnpm workspace and the cargo workspace.
# `just` is optional sugar; every recipe is a plain command CI runs directly.

default: check

# --- build -------------------------------------------------------------------

build: build-js build-rust

build-js:
    pnpm install
    pnpm build

build-rust:
    cargo build --workspace --release

build-wasm:
    cargo build -p lattice-compiler-wasm --release --target wasm32-unknown-unknown

# --- test / check ------------------------------------------------------------

check: check-codegen test-engine test-rust

# The IR schema is the single source of truth; TS and Rust types are generated
# from it. This fails if either generated file has drifted (Stage B1).
check-codegen:
    node packages/engine/tools/codegen.mjs --check

test-engine:
    node --test 'packages/engine/test/*.test.ts'

test-shell:
    node --test 'packages/shell/test/*.test.ts'

test-rust:
    cargo test --workspace

# --- the non-negotiables (Stage A3) ------------------------------------------

# 1. Determinism: build the corpus twice, diff every byte.
determinism:
    node scripts/lattice/determinism.mjs

# 2. Export-and-run: compiled output boots with the network to us unplugged.
export-and-run:
    node scripts/lattice/export-and-run.mjs

# 3. Same-binary parity: native and WASM hosts emit identical bytes (Stage B4).
wasm-parity: build-wasm
    node scripts/lattice/wasm-parity.mjs

# 4. Projection parity: what the canvas shows is what the compiler ships (Stage C2).
projection-parity:
    node scripts/lattice/projection-parity.mjs

# 5. The graft gate: a scripted editing session in a real editor, read by the tripwire (Stage C3).
spike:
    node scripts/lattice/c3-spike.mjs

# 6. Latency thresholds on a 2,000-node page (Stage C6, Part IV risk 6).
bench:
    node scripts/lattice/bench.mjs

# 7. The Stage B exit gate: Lighthouse over every corpus route, from the export.
lighthouse:
    node scripts/lattice/lighthouse.mjs

# What each route makes readable to an anonymous visitor, diffed against the published set (E4).
exposure:
    cargo run -q -p lattice-cli -- exposure corpus/sites

corpus:
    cargo run -q -p lattice-cli -- build --corpus

fmt:
    pnpm format
    cargo fmt --all
