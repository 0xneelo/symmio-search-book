# Goal — Generative encoding-cue index (flagship)

**Agent:** `agent-fable-6`  ·  **Principle:** Encoding specificity (cue-matching)
**Merge order:** 3rd (after fable-10 and fable-9)
**Read first:** [`README.md`](README.md) — the determinism contract matters MOST here.

## One-line goal
At build time, generate for each chunk/page the set of questions it answers plus its entity
aliases, commit them as a new `data/answer-cues.json` artifact, and have `scoreChunk()` score
query terms against those cues — so retrieval stops failing on vocabulary mismatch without
importing a black-box dense retriever.

## Why (the failure it fixes)
`scoreChunk()` scores query-token overlap against `title + text + sourceKeys` (~564–572). It fails
exactly where encoding specificity predicts: when the user's phrasing doesn't overlap the
document's wording. The current mitigation is manual — 890 hand-seeded `question-routes.json` rows,
each an exact normalized-question → page mapping that only fires on verbatim matches. This goal
**systematizes** that asset: generate the cues instead of hand-authoring them, and score against
them fuzzily.

## The determinism subtlety (this is the crux — get it right)
- ❌ **Generating cues at query time (HyDE-style) breaks purity.** Do not call an LLM inside
  `retrieve()`/`scoreChunk()`.
- ✅ **Generating cues at build time and committing the output keeps retrieval pure.** The
  generation step (LLM or heuristic) is offline; its output is `data/answer-cues.json`, a
  committed, diffable artifact reviewed like `question-routes.json`. A bad cue becomes a
  reviewable line, gated by the fixture eval. Runtime only reads committed JSON.
- ✅ **Precision guard:** a generated cue may *boost* a chunk but must not *solely* create a false
  route. Cues must be grounded in / validated against their chunk, and must pass citation
  validation and the 47 fixtures — especially the 20 adversarial cases (a cue that makes a
  refusal-expected query start answering is a regression, not a win).

## Scope
**In:**
- A **new** `scripts/build-answer-cues.mjs` that reads `answer-chunks.json` (+ `glossary.json` for
  entity aliases) and emits `data/answer-cues.json` + `.js`, deterministic-build stamped, keyed by
  chunkId/pageId → { questions[], aliases[] }.
- If generation uses an LLM: it runs **offline** in the build script, output committed; the build
  must be reproducible (record model + prompt; the committed artifact is the source of truth, not
  the LLM call). A heuristic/templated generator is acceptable and simpler to keep deterministic —
  justify your choice.
- `scoreChunk()` gains a **cue-scoring term** weighted above body text (title is 3×; cues ≈ 5×) —
  a bounded addition in region B.
- **Soften route matching:** today an exact normalized-question miss loses the +20 route hint
  entirely. Add threshold-based token-overlap matching against the 890 route questions (+ the new
  cues) so paraphrases still earn the hint; report the matched route + score in `--include-debug`
  so every hint is explainable. (Coordinate: keep the hard +20 for exact matches; fuzzy matches
  get the hint only above a justified threshold.)
- Load `data/answer-cues.json` in `loadRuntime()` (append-only; rebase on fable-9's crosslinks
  addition).
- Tests: paraphrase queries that used to miss now route; adversarial fixtures still refuse;
  retrieval-only A/B; determinism double-run.

**Out:**
- Dense vectors / embeddings in retrieval (explicitly rejected by design).
- Editing `build-answer-chunks.mjs` (that's fable-7's file — use a SEPARATE build script by design).
- Query-time generation of any kind.

## Owned surface (region B + new build script + loadRuntime)
New `scripts/build-answer-cues.mjs` + `data/answer-cues.json`/`.js`; `scoreChunk()` (~564–572) and
its call site; the route-match softening in `retrieve()`/`findGlossaryRoute` scoring; append-only
`loadRuntime()` addition. Do not edit regions C, D, or `build-answer-chunks.mjs`.

## Determinism
Pure at runtime; nondeterminism confined to the offline build step whose output is committed. The
committed artifact must rebuild to identical bytes from identical inputs. Add double-run assertion.

## Acceptance / definition of done
- [ ] `data/answer-cues.json` committed, deterministic-build stamped, schema-validated (like the
      other `data/*.json` builders: fail the build on dangling chunkIds / unknown source keys).
- [ ] ≥1 paraphrase query per topic that previously missed now retrieves the correct page (shown
      via retrieval-only A/B).
- [ ] All 47 fixtures pass; **zero** adversarial regressions (no refusal-expected query starts
      answering because of a cue).
- [ ] Route-hint decisions are explainable in `--include-debug` (matched route + score).
- [ ] Same query twice → byte-identical `--json`; artifact rebuilds to identical bytes.
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Build the generator (start heuristic/templated from titles + glossary aliases + existing route
   questions; consider an offline LLM pass only if the heuristic under-covers — and only if you can
   keep the committed output reproducible).
2. Add schema validation mirroring `build-answer-chunks.mjs` (dangling ids / unknown keys throw).
3. Wire the cue term into `scoreChunk()`; add fuzzy route matching with an explainable threshold.
4. A/B on retrieval-only, then full 47-fixture live eval. Watch the adversarial set like a hawk.

## Execution protocol (embedded)
Claim `agent-fable-6`. Branch `rag-quality/fable-6-cue-index` off `main` (rebase before merge so
fable-10 + fable-9 are present). One Linear issue under the epic, labelled
`project:symmio-search-book` + `subproject:rag-quality` + `agent:agent-fable-6`; **In Progress** on
start. Commit milestones `(SYN-###)`. Finish → **Done** + report (generator choice, cue counts,
A/B, adversarial results) + push. Blocked → linked `needs:*` issue, **Blocked**.
