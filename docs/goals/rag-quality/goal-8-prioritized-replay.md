# Goal — Prioritized replay in the living-docs loop

**Agent:** `agent-fable-8`  ·  **Principle:** Prioritized replay (consolidate what's at-risk, not what's popular)
**Merge order:** parallel (orthogonal to the retriever — zero merge risk against 6/7/9/10)
**Read first:** [`README.md`](README.md)

## One-line goal
Rank the living-docs consolidation queue by **weakness/at-risk-ness** — partial coverage, low
confidence, refusals-that-should-answer, thumbs-down — instead of by volume/popularity, so
authoring effort flows to the memories most at risk of being wrong or missing, not the ones
already well-covered.

## Why (the failure it fixes)
The gap queue (`build-gap-queue.mjs` → `priorityScore`, `topItems`, `byStatus`) and the
thumbs-down rating loop are the substrate for consolidation, but today prioritization is largely a
static priority map (`priorityScores` at ~line 114) plus counts. Prioritized-replay theory says a
memory system should preferentially consolidate the traces most at risk of loss — not the most
frequently hit. Concretely, the pipeline is at risk of re-consolidating what's already strong while
low-confidence routes, partial-coverage answers, and refusals-that-should-answer keep failing users.

## Signals already available (no new infra needed)
- `question-routes.json`: `byConfidence` (High/Medium/Low — 47/584/259) and per-route `confidence`
  + `notes` (many flag freshness/verification debt).
- `answer-validation-report.json` + `factCoverage` semantics (`full`/`partial`/`absent`): "absent"
  is a first-class missing-fact demand signal (already emitted as `asked-fact-not-in-corpus` gap
  events by the runtime).
- Server-side gap/rating tables (`search_book_gaps`, `search_book_ratings`): thumbs-down,
  `low-rated-answer`, `page-feedback-needs-work`, repeated unanswered questions — exposed via the
  moderation export.

## Scope
**In:**
- A **weakness-ranked** view of the consolidation queue: extend `build-gap-queue.mjs` (or add a
  sibling build step) to compute an at-risk score that up-weights partial coverage, Low/Medium
  confidence, refusals-that-should-answer, and thumbs-down — and down-weights already-strong,
  well-covered items. Emit a committed, diffable ranked artifact.
- Clear documentation of the ranking formula so operators can see *why* an item is prioritized
  (auditable, like everything else here).
- Optionally: fold the "absent" factCoverage demand signal and repeated-question signal from the
  moderation export into the ranking (design the interface; if it requires reading the live DB,
  keep that in a build/export step, not the pure retrieval path).

**Out:**
- Anything in `scoreChunk()` / `retrieve()` — this goal does NOT touch the retriever (that's what
  makes it fully parallel).
- Auto-authoring pages (this ranks the work; humans/other agents do the authoring).
- Live-DB reads inside the pure retrieval path.

## Owned surface
`scripts/build-gap-queue.mjs` (and/or a new sibling living-docs build step) + its output artifact.
No overlap with the retriever goals.

## Determinism
The ranked artifact is build-time and committed. If it consumes live server signals (ratings/gaps),
that consumption lives in the build/export step and the *output* is frozen + committed — never read
live during retrieval.

## Acceptance / definition of done
- [ ] A committed, ranked "at-risk consolidation" artifact whose ordering demonstrably differs from
      pure priority/volume ordering, with the top items being genuinely weak (partial coverage / low
      confidence / thumbs-down), not merely popular.
- [ ] The ranking formula is documented and auditable.
- [ ] Rebuild is deterministic (identical bytes from identical inputs).
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Inventory the weakness signals above; define an at-risk score (document the weights).
2. Extend `build-gap-queue.mjs` to emit the ranked artifact; validate deterministic rebuild.
3. Show a before/after ordering diff proving it surfaces weak-but-unpopular items the old ordering
   buried.

## Execution protocol (embedded)
Claim `agent-fable-8`. Branch `rag-quality/fable-8-prioritized-replay` off `main` (no rebase
dependency — orthogonal). One Linear issue under the epic, labelled `project:symmio-search-book` +
`subproject:rag-quality` + `agent:agent-fable-8`; **In Progress** on start. Commit milestones
`(SYN-###)`. Finish → **Done** + report + push. Blocked → linked `needs:*` issue, **Blocked**.
