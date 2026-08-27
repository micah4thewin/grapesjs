# C1 — the CRDT substrate: what is built, and what the spike still has to decide

The plan (Stage C1) says to pick between Loro and Yjs "via a one-week spike with the real op set".
That decision is **not** made here, and this note exists so nobody assumes it was.

## What is implemented today

`packages/engine/src/store.ts` holds an op log with a Lamport clock per replica, and merges by
replaying the union of logs from a common base in one total order — `(lamport, replica, position)`.
Concretely:

* **Convergence** — two replicas that have seen the same set of ops compute the same document,
  regardless of the order they *received* them. Property-tested in `test/ops.test.ts`.
* **Tree safety** — a `moveNode` that would make a node its own ancestor is refused, identically on
  every replica (the order is total, so every replica refuses the same op). This is the standard
  move-op rule; without it, concurrent moves can detach a subtree into a cycle.
* **Op refusal is surfaced, never silent** — `DocumentStore.merge` returns the refused ops so the
  UI can tell someone their edit lost a race rather than quietly dropping it.
* **Undo is inverse ops on one stack**, spanning structure, style, text and tokens (Stage C4).

## What this does *not* give us

1. **Character-level text merging.** `setText` is last-writer-wins over the whole span list. Two
   people editing the same paragraph concurrently will lose one edit's characters. Acceptable while
   text commits are op-batches on blur (Stage C4), unacceptable for real co-editing.
2. **Log compaction.** The log grows without bound; there is a `snapshot()` but no compaction
   policy. Stage C5 needs one.
3. **Efficient list merging.** Concurrent inserts into the same children array resolve by total
   order, not by a list CRDT, so relative order can surprise. A movable-list type would fix it.
4. **Causal delivery.** The merge assumes it can see whole logs. Real sync needs version vectors.

Items 1, 3 and 4 are exactly what Loro's tree and movable-list types (or Yjs's Y.Text and Y.Array)
exist to solve, which is why the plan wants the spike.

## What the spike must answer

* Does Loro's movable tree express `moveNode` + `insertSubtree` + `removeSubtree` without a
  translation layer that reintroduces the cycle problem?
* What is the wire size of a day's editing on the 2,000-node benchmark page, per library?
* Does either force a document shape that fights the flat node table (which the ops, the projector
  and the compiler all assume)?
* Can undo stay *one stack across data and design*, or does the library's undo manager insist on
  owning history?

The op vocabulary in `packages/engine/src/ops.ts` is deliberately library-independent so that
whichever wins plugs in under `DocumentStore` without touching gesture capture, the projector, or
the compiler.
