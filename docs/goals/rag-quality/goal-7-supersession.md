# Goal — Adaptive forgetting via explicit supersession

**Agent:** `agent-fable-7`  ·  **Principle:** Availability vs. accessibility (deterministic half only)
**Merge order:** 4th (after 10, 9, 6)
**Read first:** [`README.md`](README.md) — note the time-decay trap.

## One-line goal
Give chunks an explicit `supersededBy` field, computed at build time and frozen into the committed
chunk artifact, so stale/superseded chunks drop out of DEFAULT retrieval while staying stored and
operator-resurfaceable — without any wall-clock decay.

## Why (the failure it fixes)
There is no freshness mechanism today: chunks are immortal until a manual rebuild. As the corpus
grows, superseded/near-duplicate chunks become exactly the distractors that fable-10's cutoff then
has to suppress. The page-state model already encodes the right shape — availability
(`retrievalEligible`, stored) vs. accessibility (surfaced in default retrieval). This goal extends
that distinction to supersession at the chunk level. Route notes already flag freshness-sensitive
claims (e.g. "390+ markets… refresh before final publication"), but retrieval treats all eligible
pages equally forever.

## The determinism boundary (read carefully)
- ✅ **Explicit supersession is in scope** and fully deterministic: a chunk/page marked
  `supersededBy: <id>` is dropped from default retrieval, still stored, still resurfaceable via an
  `--include-superseded` flag. Reproducible per git-SHA.
- ❌ **Wall-clock time-decay is OUT of scope** — "same query, different answer next week" violates
  the core invariant. If staleness must factor in time at all, it is computed **at build time from
  source timestamps and frozen** into the committed artifact, so a given SHA is reproducible. Do
  not read the clock in `retrieve()`.

## Scope
**In:**
- A `supersededBy` (and optional build-time-frozen `freshness`) field emitted per chunk by
  `build-answer-chunks.mjs`, and/or a supersession field on the page-state registry, sourced from
  explicit operator/authoring signals (e.g. a page marked superseded, or a route note flagged
  stale). Committed + schema-validated.
- A gate in `retrieve()`'s **eligibility filter (region A, ~587–589)**: superseded chunks are
  excluded from default retrieval but included when `--include-superseded` (runtime default + CLI
  flag + env) is set.
- Tests: a superseded chunk is absent by default and present with the flag; determinism double-run.

**Out:**
- Wall-clock decay at query time (forbidden — see above).
- Usage-based forgetting (never-useful → demote) driven by live DB — that's a build-time/replay
  concern; coordinate with fable-8 if a signal is wanted, keep it out of the pure path.
- Deleting anything — supersession is demotion, never deletion (availability preserved).
- Editing scoring (region B), the cutoff (region C), or expansion (region D).

## Owned surface (region A + build-answer-chunks.mjs + page-state-registry)
`scripts/build-answer-chunks.mjs` (emit the field), the page-state registry data + its builder,
and `retrieve()`'s eligibility filter (~587–589) + the `--include-superseded` config. Do not edit
regions B, C, D, or `build-answer-cues.mjs`.

## Determinism
Pure — supersession is a committed, build-time field; the flag is explicit input, not ambient
state. Add the double-run byte-identical assertion.

## Acceptance / definition of done
- [ ] Chunks carry a committed `supersededBy` field; the build schema-validates it (referenced ids
      must exist).
- [ ] Superseded chunks are excluded from default retrieval and resurfaced by `--include-superseded`.
- [ ] All 47 fixtures still pass (supersession must not hide any chunk a fixture depends on — pick
      superseded candidates carefully, or add a fixture proving the demotion is correct).
- [ ] No wall-clock time enters ranking; same query twice → byte-identical `--json`.
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Decide the supersession source of truth (explicit page-state flag is simplest and most
   auditable). Wire it through `build-answer-chunks.mjs` → chunk field.
2. Add the eligibility gate + `--include-superseded` flag in `retrieve()` region A.
3. Seed a small, real supersession case (a genuinely stale/duplicated page) and prove
   demote-by-default + resurface-on-flag on the retrieval-only eval.
4. Full 47-fixture run; commit.

## Execution protocol (embedded)
Claim `agent-fable-7`. Branch `rag-quality/fable-7-supersession` off `main` (rebase before merge).
One Linear issue under the epic, labelled `project:symmio-search-book` + `subproject:rag-quality` +
`agent:agent-fable-7`; **In Progress** on start. Commit milestones `(SYN-###)`. Finish → **Done** +
report + push. Blocked → linked `needs:*` issue, **Blocked**.
