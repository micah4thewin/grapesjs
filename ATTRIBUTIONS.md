# Attributions

## GrapesJS

This repository began as a fork of [GrapesJS](https://github.com/GrapesJS/grapesjs) and retains a
substantial amount of its code, principally the canvas, the sorter, the layer manager, the rich
text editor, the panels and the plugin host (`packages/core/`).

GrapesJS is distributed under the BSD 3-Clause License. Its copyright notice and licence text are
retained in `packages/core/LICENSE` and apply to all code in `packages/core/` and to any file
elsewhere in this repository that derives from it.

```
Copyright (c) 2016-present, Artur Arseniev
All rights reserved.
```

The BSD 3-Clause licence's third clause is a non-endorsement clause: the names of the GrapesJS
project or its contributors may not be used to endorse or promote products derived from this
software without prior written permission. This project therefore does not use the GrapesJS name
in its own naming, marketing, or documentation except to state, factually, that it is derived from
GrapesJS — as here.

## Licensing of the new packages

BSD 3-Clause and MIT are compatible. The packages written for this project and intended to be
published independently:

| Package                                                 | Licence      | Contains GrapesJS code?                                                                                                                 |
| ------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/engine` (`@lattice/engine`)                   | MIT          | **No.** It imports nothing from `packages/core` and never will; the dependency arrow points one way, and CI would fail if that changed. |
| `crates/compiler`, `crates/compiler-wasm`, `crates/cli` | MIT          | No. Written from scratch.                                                                                                               |
| `packages/shell` (`@lattice/shell`)                     | BSD-3-Clause | Yes, by composition — it is the editor app that binds the engine to the GrapesJS fork.                                                  |

Per the transformation plan, `@lattice/engine` and `@lattice/compiler` are published only after the
interpreter organs are physically removed from the build (Stage H), so the embeddable core never
ships with them inside it.

## Third-party tooling

- [Lighthouse](https://github.com/GoogleChrome/lighthouse) (Apache-2.0) — a dev dependency of
  `packages/lattice-cli`, used by `scripts/lattice/lighthouse.mjs` to measure the Stage B exit gate.

No other runtime dependencies are added by the Lattice packages. The compiled export has none at
all, which is checked by CI on every pull request.
