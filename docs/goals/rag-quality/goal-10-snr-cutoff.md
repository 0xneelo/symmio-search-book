# Goal — Distractor suppression via score-gap cutoff

**Agent:** `agent-fable-10`  ·  **Principle:** Interference / signal-to-noise
**Merge order:** 1st (do this first — smallest, nearly conflict-free)
**Read first:** [`README.md`](README.md) (determinism contract + ownership map + eval protocol)

## One-line goal
In `retrieve()`, drop retrieved chunks whose score is far below the top score before applying
the fixed budget, so the LLM stops receiving low-relevance distractors alongside the one strong
chunk.

## Why (the failure it fixes)
`retrieve()` sorts by score, then fills a fixed budget — top-8 chunks up to 1600 words
(`maxChunks: 8` / `maxContextWords: 1600`, the loop at `run-llm-rag-answer.mjs` ~596–602). Any
chunk with `score > 0` is eligible (~line 591). So a query with one strong chunk and seven
weak-but-nonzero ones still hands all eight to the model. Those distractors degrade `factCoverage`
judgments and citation selection even when the correct chunk is present — the classic
noise-lowers-SNR effect, and it worsens monotonically as the corpus grows (2,884 chunks today).

## Scope
**In:**
- A **relative score-gap cutoff** applied in `retrieve()` after the sort and before the budget
  loop: keep the top chunk, then drop any chunk scoring below `ratio × topScore` (start `ratio`
  ≈ 0.25; make it configurable via a runtime default + CLI flag + env, defaulting to a value you
  justify from the fixture A/B).
- The cutoff must be a no-op that never empties the result (always keep ≥1 chunk; never let it
  turn an answerable query into a refusal).
- Debug visibility: surface the top score and the dropped chunk ids/scores in the
  `--include-debug` retrieval context.
- Tests: retrieval-only before/after on the fixtures + a determinism double-run assertion.

**Out:**
- Changing scoring itself (that's `agent-fable-6`, region B — do not touch `scoreChunk()`).
- Changing `maxChunks` / `maxContextWords` semantics (keep the budget loop; add the cutoff
  *before* it).
- Any absolute threshold — must be **relative** to the top score so it's scale-free as scores grow.

## Owned surface (region C)
`scripts/run-llm-rag-answer.mjs` → `retrieve()` selection/truncation loop (~596–602) and the
`defaults`/`parseArgs` config for the ratio. Do not edit regions A, B, or D.

## Determinism
Pure. No time/usage/network inputs — this is arithmetic over already-committed scores. Add the
double-run byte-identical assertion to your tests.

## Acceptance / definition of done
- [ ] All 47 fixtures still pass (no regression); include the before/after retrieval-only diff.
- [ ] At least one fixture (add one if needed) demonstrably drops a distractor chunk it used to
      include, with the correct answer unaffected.
- [ ] Cutoff `ratio` is configurable and its default is justified from the A/B, documented inline
      and in this goal's Linear issue.
- [ ] Never produces an empty retrieval for a previously-answerable query.
- [ ] Same query twice → byte-identical `--json`.
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Reproduce: pick 3–5 fixture queries, dump `retrieve()` chunk scores with `--include-debug`,
   identify the score gap between the strong chunk(s) and the tail.
2. Implement the cutoff as a small pure helper; wire the ratio through `defaults` → `parseArgs`.
3. Sweep `ratio` ∈ {0.15, 0.25, 0.35, 0.5} on the retrieval-only eval; pick the value that
   removes tail distractors without dropping any expected `pageId`.
4. Run the full 47-fixture live eval to confirm no regression; commit.

## Execution protocol (embedded)
Claim `agent-fable-10`. Branch `rag-quality/fable-10-snr-cutoff` off `main`. One Linear issue
under the rag-quality epic, labelled `project:symmio-search-book` + `subproject:rag-quality` +
`agent:agent-fable-10`; **In Progress** on start. Commit each milestone `(SYN-###)`. On finish:
**Done** + report (what changed, the chosen ratio, the A/B numbers, how verified) + push. Blocked
→ file a linked issue tagged `needs:operator` / `needs:agent:<tag>` / `needs:general`, set
**Blocked**.
