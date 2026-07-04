# Research / backlog — deferred and net-new retrieval ideas

**Type:** research issue (not a build goal)  ·  **Owner:** unassigned (`needs:general`)
**Read first:** [`README.md`](README.md)

This captures the "any more ideas" bucket the operator asked for: items deliberately kept out of
the five core goals because they're deferred, scale-dependent, or need investigation before
committing to a build. Each is a candidate to graduate into its own goal later. **Item 1 is a
confirmed correctness bug, not just an idea — treat it as the highest-priority item here.**

## 1. Reuse-cache serves stale citations (CONFIRMED BUG — do first)
`findReusableAnswer()` in `scripts/serve-answer-engine.mjs` (~634) serves cached `answer_json`
verbatim after only a cosine-similarity check. Fresh answers pass the full citation validator, but
cached answers are **never revalidated**. If a page is unpublished, a source key removed, or chunks
rebuilt after a cache row was written, the reuse lane keeps serving that answer with now-invalid
citations for up to the 180-day retention window. This is off the pure retrieval path (the reuse
cache is correctly quarantined), but it's a real correctness hole.
**Fix (cheap):** before serving, verify `primaryPageId` is still candidate/published and every
citation `sourceKey` still exists in the current source catalog; on failure, evict or force a fresh
answer. Storing the corpus build hash in cache rows makes the check exact rather than heuristic.

## 2. Negative-cue index (Principle 7 extension — engram "inhibitory memory")
The refusal + reconciliation lanes are first-class "what-not-to-answer" memory, but they largely
match blocked questions exactly (regex/normalized). Give blocked questions the same generated-cue
treatment as goal-6: a committed `data/negative-cues.json` compiled from reconciliation/refusal data
so near-miss *paraphrases* of a blocked question are caught, not just verbatim matches. Applied in
`preflight()` (not `scoreChunk`, to avoid colliding with goal-6). Deterministic, build-time,
operator-reviewed. Add a precision guard so it can't over-block legitimate queries. Hardens the
adversarial eval lane. **Strong candidate to graduate into its own goal.**

## 3. True BM25 / IDF scoring + token-boundary matching
The retriever is described as "BM25-lite" but `scoreChunk()` is binary substring inclusion with no
document-frequency weighting: every token counts +1 regardless of rarity, and `haystack.includes()`
is substring (so "intent" matches "unintentional"). No IDF = no signal-to-noise control, and it
degrades as the corpus grows.
**Idea:** compute document frequencies at build time, emit a `termStats` block into
`answer-chunks.json`, weight token hits by `log(N/df)`, and tokenize haystacks at build time
(token-boundary matching, also a speed win). Fully deterministic. **Pairs naturally with goal-6's
`scoreChunk()` work** — coordinate so they don't both rewrite the same function blindly. Also: fix
the "BM25-lite" label or make it true; the accuracy of the description is itself an auditability
concern.

## 4. Usage-based retrievability — the determinism trap (keep deferred)
Feeding `helpful_count` / ratings into `scoreChunk()` would make the same query return different
chunks as traffic accumulates — breaks the pure-path invariant, and the traffic signal is thin.
**Only** allowed form: a deterministic tie-breaker among already-equal-score chunks, versioned to a
committed corpus snapshot; or a build-time-compiled `learned-route-hints.json` (operator-reviewed,
capped below the hand-seeded +20 so popularity can't outrank editorial intent). Keep usage in the
reuse cache (where it already correctly lives) unless/until there's a compelling, safe design.

## 5. Retrieval-only eval harness (infrastructure — unblocks fast A/B for all goals)
The fixture eval (`runLiveEval`) asserts `expectedPageId` but burns LLM tokens per run. A
deterministic, free, retrieval-only mode — query → expected top-K `pageId`s asserted directly
against `retrieve()` output (the `--include-debug` context already exposes it) — turns every
scoring/selection change (goals 10/9/6/7) into a red/green diff instead of a token-costly judgment
call. **Highest-leverage infra item; worth building early so the core goals can lean on it.**

## Suggested triage
1 (bug) → 5 (unblocks the others) → 2 (graduate to a goal) → 3 (coordinate with goal-6) → 4 (stay
deferred).

## Execution protocol (embedded)
This is a research issue under the rag-quality epic, labelled `project:symmio-search-book` +
`subproject:rag-quality` + `needs:general`. Whoever picks up an item claims an agent tag, spins it
into its own goal/issue (or a sub-issue), and follows the standard protocol in
[`README.md`](README.md). Item 1 should be filed as a bug and fixed promptly regardless of the rest.
