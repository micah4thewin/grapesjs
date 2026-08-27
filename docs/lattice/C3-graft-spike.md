# C3 — the graft spike: does Backbone write back?

The plan gates the whole transformation here. Part IV names it as the boss fight: if, after
intercepting every mutation path we can find, the component tree still gets written to from places
we cannot reach, the answer is to stop grafting, keep the engine and the compiler, and rebuild the
canvas greenfield with the fork as a parts bin.

That decision deserves evidence. `scripts/lattice/c3-spike.mjs` boots a real GrapesJS editor with
flags on, shows a projection of a real corpus site, runs a scripted editing session with real mouse
input in headless Chromium, and reports what the tripwire saw.

```
node scripts/lattice/c3-spike.mjs          # headless
node scripts/lattice/c3-spike.mjs --headed # watch it
```

## Current reading

**14/14 checks pass. Every gesture in the session became an op, and nothing wrote to a projected
model behind our back.** The session covers: mounting the projection, clicking to select, a real
drag through GrapesJS's own `tlb-move` command and sorter (ghost, placeholder, geometry and all),
a text commit, a block insert, a resize, and undoing the whole session back to the starting
document. The tripwire is then deliberately tripped, to prove its silence meant something.

The instrumentation the run prints — `intercepted: 1`, `drops: 1`, `dragEnds: 1` — is what
distinguishes a clean graft from an unarmed instrument. A run that reports zero interceptions and
zero leaks has proved nothing.

## What the spike found (and what changed because of it)

Each of these was a real defect, found by running the thing rather than by reasoning about it.

1. **The interception point is `Components.canMove`, at the moment of release.**
   `ComponentSorter.handleNodeAddition` asks it before every model move; a `false` answer means the
   model is never touched, while the ghost and placeholder have already done their work.
   `DropLocationDeterminer` asks the *same* question during the drag to place the placeholder — so
   the interception has to answer truthfully while dragging and refuse only at the drop. The drop is
   detected by a capture-phase `pointerup`/`mouseup` listener.

2. **Listening on one document is not enough.** The canvas is an iframe, but GrapesJS floats its
   tools layer above it in the host document, so the release event may never reach the frame. The
   first version listened only on the canvas document; drags slipped past it and mutated the model,
   which looked exactly like a clean graft until the tripwire named the stack.

3. **The interception must key on the *source*, not the target.** A drop released over the wrapper
   or the body has a target that is not an IR node; keying on the target let those through, and
   GrapesJS reparented the component to the page root. A projected component may never be moved by
   the model layer, wherever it was released — and a drop that the IR cannot express does nothing at
   all, rather than quietly landing somewhere.

4. **Every projected element was getting the same component type.** Nine types each claimed every
   addressed element via `isComponent`, so whichever registered last won — and with it, its drop
   rules. Fixed by carrying each node's IR kind into the canvas HTML as `data-gjs-type`, taken from
   the document rather than from the shipped page (which still carries no editor metadata beyond
   the node id). Per-kind rules only became real once this was fixed: a heading is not a drop
   target, a grid is.

5. **A leaf must not be droppable, in the ops layer as well as the canvas.** Before the fix, a
   heading could be dropped inside a heading; the op layer faithfully executed it and the document
   stopped compiling. `dropToOps`/`blockToOps` now refuse a parent that cannot hold children — the
   same rule the compiler's typecheck enforces — and the canvas no longer offers the position.

6. **The tripwire had to learn the difference between document state and view state.** Selecting a
   node writes `status` on a component model on every click. A tripwire that fired on that would be
   ignored within a day, so it flags writes to document-bearing attributes and structural
   `add`/`remove`, and ignores view state. The allowlist is in `tripwire.ts`, deliberately narrow.

7. **Structure re-mounts; content patches.** Patching DOM under GrapesJS after a structural change
   leaves its component models pointing at elements that no longer exist — a stale second source of
   truth, which is the thing this design exists to avoid.

8. **Two upstream defaults have to go off in a Lattice shell**: the icon font is fetched from a CDN,
   and the editor sends telemetry. An editor that cannot boot on a plane, or that reports on the
   person using it, contradicts the product being built (`cssIcons: ''`, `telemetry: false`).

## What this reading does *not* cover

The gate as the plan states it is "one full editing session — build a real five-page corpus site in
the editor — with zero tripwire hits". This is a scripted session on one route, not a person
building a site for an afternoon. Specifically still unproven:

* the RTE (text is committed through the op boundary here, not typed into GrapesJS's editor);
* the layer manager, which is a second sorter with its own `canMove` path (`LayerNode`);
* copy/paste, keyboard commands, multi-selection;
* long sessions, where a leak may need a particular sequence to appear;
* the block palette's own drag (`Droppable`/`CanvasNewComponentNode`), which enters through a
  different sorter path than a canvas move.

Each of those is a place the tripwire should be pointed next, and the harness exists to point it.
Until then the honest statement is: **the graft holds on the paths a scripted session exercises,
with the fixes above; the greenfield fallback stays available and un-forfeited, because Stages A–B
and `packages/engine` are editor-independent by design.**
