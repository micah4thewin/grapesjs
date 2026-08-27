# A1 — Fork divergence audit

**Question the step answers:** what did `micah4thewin/grapesjs@dev` change relative to upstream
`GrapesJS/grapesjs@dev`, and does any of it land in a module the transformation plan intends to *keep*?

## Method and its limits

The session's GitHub scope covers `micah4thewin/grapesjs` only; attaching `GrapesJS/grapesjs` as a second
source was refused (cross-owner adds are not supported), so **no `git diff upstream/dev...dev` was run**.
The audit below is therefore derived from evidence available inside the fork's own clone:

```
git rev-list --count HEAD            # 50 (clone is depth-limited)
git log --format='%an <%ae>' | sort | uniq -c | sort -rn
git log --all --format='%H %an %s' | grep -iE 'micah|yousellingyou'
git rev-list --count origin/dev..HEAD
```

## Findings

| Signal | Result |
|---|---|
| HEAD | `2bdeda8 Release GrapesJS core latest: v0.23.6 (#6822)` — an upstream release commit |
| `origin/dev` vs working branch | identical (0 commits ahead at branch creation) |
| Commit authors in fetched history | upstream maintainers, contributors and dependabot only (Artur Arseniev ×31, dependabot ×7, …) |
| Commits authored by the fork owner | **none** in the fetched history |
| Local tags / stray refs | none |
| Package identity | `packages/core/package.json` still `grapesjs`, version `0.23.6` |

**Conclusion: the fork is an unmodified mirror of upstream `dev` at v0.23.6** — within the limits of a
depth-limited clone. No divergence lands in a "keep" module, so there is no preservation decision to make
and no rebase to plan. The plan's graft points (`dom_components`, `css_composer`, `parser`, `storage_manager`,
`undo_manager`, `code_manager`, `data_sources`) are upstream code as documented.

**Residual risk:** history is 50 commits deep. A divergence older than that would be invisible here. Confirm
with `git fetch --unshallow` plus an upstream remote from a session scoped to both repositories before
relying on this for anything irreversible (e.g. a wholesale upstream rebase).

## Era check (assumptions the plan makes about upstream)

Verified present in this tree, so the plan's graft points are real:

| Plan assumption | Verified |
|---|---|
| TypeScript, pnpm monorepo under `packages/core` | yes — `packages/core/src/**/*.ts`, `pnpm-workspace.yaml` |
| Custom HTML parser hook (F3's quarantine boundary) | yes — `packages/core/src/parser/` with configurable `parserHtml` |
| Runtime-dynamic plugins | yes — `packages/core/src/plugin_manager/` |
| Experimental DataSources module | yes — `packages/core/src/data_sources/` (study-then-exclude, per plan §E1) |
| Device manager breakpoint-copies model | yes — `packages/core/src/device_manager/` |

## Decision

**No rebase.** Development proceeded from that commit (`2bdeda8`) on
`claude/grapesjs-lattice-transform-k3x6o5`, which is now merged into `main`, the fork's trunk. The
`dev` branch itself has been retired; `2bdeda8` remains in `main`'s history as the mirror point.
Per Part IV risk 3, upstream tracking stops being a wholesale merge after the Stage C exit gate; from then on
only `canvas/`, `utils/sorter`, and `rich_text_editor/` fixes are cherry-picked. This policy is stated in
`docs/lattice/README.md` so nobody spends a week on a doomed rebase.
