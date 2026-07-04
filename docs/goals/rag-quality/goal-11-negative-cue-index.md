# Goal — Negative-cue index (inhibitory memory extension)

**Agent:** `agent-fable-11`  ·  **Principle:** Negative memory (7) — the "7-extension" in the refined framing
**Merge order:** parallel (owns `preflight()` — orthogonal to the four `retrieve()`/`scoreChunk()` regions)
**Read first:** [`README.md`](README.md)

## One-line goal
Give blocked questions the same build-time generated-cue treatment as goal-6 — a committed
`data/negative-cues.json` compiled from the refusal + reconciliation lanes — so near-miss
*paraphrases* of a blocked question are caught in `preflight()`, not just verbatim matches.

## Why (the failure it fixes)
The refusal + reconciliation lanes are already first-class "what-not-to-answer" memory
(`riskRules` at `run-llm-rag-answer.mjs` ~102–193; `reconciliationByQuestion`; the discord /
notion / whitepaper / opyn / phase-b rules). But they match blocked questions largely by regex or
exact normalized-question equality (`reconciliationByQuestion.get(normalize(query))` in
`preflight()` ~488–522). A paraphrase that dodges the pattern slips through. Negative/inhibitory
memory says "what NOT to answer" deserves the same cue-matching reach that goal-6 gives positive
answers — otherwise the adversarial surface only holds against the exact phrasings someone already
thought to block.

## The determinism boundary (same discipline as goal-6)
- ❌ Query-time LLM generation of negative cues breaks purity — FORBIDDEN.
- ✅ Generate negative cues **offline at build time**, commit `data/negative-cues.json` (diffable,
  operator-reviewed like the reconciliation lanes), runtime reads only committed JSON.
- ✅ **Precision guard (critical here — false positives block real answers):** a negative cue must
  not over-block. It may only strengthen an *existing* refusal/reconciliation reason for near-miss
  phrasings of an already-blocked topic; it must never turn a legitimate, answerable query into a
  refusal. The 27 answer-validation fixtures (legitimate answers) are the over-block tripwire — all
  must still answer.

## Scope
**In:**
- A **new** `scripts/build-negative-cues.mjs` that compiles `data/negative-cues.json` from the
  refusal `riskRules` + `question-routes.json` `reconciliation` entries: for each blocked topic,
  the blocked question(s) + generated paraphrases/aliases, each carrying the refusal reason +
  gapId it maps to. Deterministic-build stamped + schema-validated (every cue references a real
  refusal reason / gapId).
- A near-miss match step in `preflight()`: when a query paraphrase-matches a negative cue above a
  justified threshold, return the **same** refusal (status/reason/message/gapId) that the exact
  match would have produced. Order/threshold deterministic; matched cue + score surfaced in
  `--include-debug` so every block is explainable.
- Load `data/negative-cues.json` in `loadRuntime()` (append-only; rebase on whoever added a
  `loadRuntime` load first).
- Tests: paraphrases of blocked questions (discord, phase-b revenue, secrets, whitepaper origin,
  opyn, vibe covered-call) now refuse with the right reason; the 27 legit answers still answer;
  determinism double-run.

**Out:**
- Editing `scoreChunk()` (region B — goal-6). Negative cues live in `preflight()`, deliberately, to
  avoid colliding with goal-6's cue term.
- Touching `retrieve()` regions A/C/D or the reuse cache.
- Query-time generation of any kind.
- Loosening any existing refusal — this only *adds* paraphrase coverage to existing blocks.

## Owned surface (region E — `preflight()`)
New `scripts/build-negative-cues.mjs` + `data/negative-cues.json`/`.js`; the near-miss match in
`preflight()` (~488–522); append-only `loadRuntime()` load. Region E (`preflight`) is touched by no
other goal, so this is effectively parallel with 6/7/9/10 (only the append-only `loadRuntime`
addition is shared — rebase on prior).

## Determinism
Pure at runtime; nondeterminism confined to the offline build step whose output is committed. The
artifact must rebuild to identical bytes. Add the double-run byte-identical assertion.

## Acceptance / definition of done
- [ ] `data/negative-cues.json` committed, deterministic-build stamped, schema-validated (every cue
      maps to an existing refusal reason / gapId).
- [ ] ≥1 paraphrase per blocked topic that previously slipped through now refuses with the correct
      reason + gapId (shown via before/after).
- [ ] **Zero over-blocking:** all 47 fixtures pass — the 20 adversarial still refuse AND the 27
      answer-validation legit answers still answer.
- [ ] Every block is explainable in `--include-debug` (matched cue + score).
- [ ] Artifact rebuilds to identical bytes; same query twice → byte-identical `--json`.
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Inventory the blocked topics from `riskRules` + reconciliation entries; that's your positive set
   of "must-block" phrasings.
2. Build the generator (heuristic/templated paraphrases first; an offline LLM pass only if
   under-covering, with reproducible committed output). Schema-validate against real reasons/gapIds.
3. Wire near-miss matching into `preflight()` with an explainable threshold; return the exact
   existing refusal object.
4. Guard precision hard: run the 27 legit fixtures as an over-block tripwire on every threshold
   choice. A/B, then full 47-fixture live eval.

## Execution protocol (embedded)
Claim `agent-fable-11`. Branch `rag-quality/fable-11-negative-cue-index` off `main` (rebase before
merge for the `loadRuntime` seam). One Linear issue under the epic, labelled
`project:symmio-search-book` + `subproject:rag-quality` + `agent:agent-fable-11`; **In Progress** on
start. Commit milestones `(SYN-###)`. Finish → **Done** + report (generator choice, cue counts,
over-block results, A/B) + push. Blocked → linked `needs:*` issue, **Blocked**.
