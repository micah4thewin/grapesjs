# Lattice

A fork of [GrapesJS](https://github.com/GrapesJS/grapesjs) being transformed into a site builder
whose source of truth is a closed, schema-validated IR and whose only emitter is a compiler.

GrapesJS's own README is at [`packages/core/README.md`](packages/core/README.md); that package is
unmodified and remains BSD-3-Clause. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

## Why fork rather than start over

Canvas iframe management, drag-and-drop sorting, selection overlays and offset math are years of
accumulated edge-case fixes, and they are exactly the parts that make a greenfield editor feel
broken for its first year. So the plan keeps the editor's body and replaces its heart: the document
model becomes an IR with an op log, and the export path becomes a Rust compiler. The GrapesJS
component tree is demoted to a disposable _projection_ of the IR — and the projection is built from
the compiler's own output, so what the canvas shows and what ships are the same bytes.

## Quick start

```bash
cargo run -p lattice-cli -- check corpus/sites               # every compiler pass, no output
cargo run -p lattice-cli -- dev corpus/sites/landing.json    # build, serve, rebuild on change
cargo run -p lattice-cli -- build corpus/sites/blog.json --out dist/blog
cd dist/blog && npm ci && npm start                          # the export, with no network back to us
```

The editor itself still boots as stock GrapesJS (`pnpm start`); the Lattice paths are behind the
flag rail in `packages/shell/src/flags.ts` and land dark until each stage's exit gate passes.

## Documentation

- **[docs/lattice/README.md](docs/lattice/README.md)** — what is here, how to run the gates, and
  the fork drift policy. **Read the drift policy before rebasing on upstream.**
- [Transformation status](docs/lattice/status.md) — every step of the plan and where it stands.
- [The determinism style guide](docs/lattice/determinism.md).
- [A1 — fork divergence audit](docs/lattice/A1-fork-divergence.md).

## The rules

1. The IR is the source of truth; the component tree is a projection of it.
2. There is exactly one emitter, and the editor calls it rather than reimplementing it.
3. Builds are deterministic, byte for byte, on every machine.
4. The export runs with the network to us unplugged.
5. Quality — contrast, alt text, heading order, descriptions, byte budgets — is a build error that
   names the node responsible, not a report someone reads later.

Each is checked by CI on every pull request (`.github/workflows/lattice.yml`).
