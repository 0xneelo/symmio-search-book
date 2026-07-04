# Goal — Associative expansion + two-tier retrieval

**Agent:** `agent-fable-9`  ·  **Principles:** Pattern completion (3) + indexing/two-tier (2, folded in)
**Merge order:** 2nd (after fable-10's cutoff)
**Read first:** [`README.md`](README.md)

## One-line goal
When a chunk is selected, deterministically pull in its co-stored neighbors (adjacent chunks on
the same page, and best chunks of directly linked pages) so a single-chunk hit stops losing the
surrounding context it needs to answer completely.

## Why (the failure it fixes)
Chunks are fixed 220-word windows with 35-word overlap (`build-answer-chunks.mjs` → `chunkPage`).
Extractive mode answers from the first ~86 words of the top one or two chunks
(`extractiveAnswer()` → `excerpt`). So an answer that straddles a chunk boundary gets truncated,
and a chunk that cites companions loses them. The metadata to fix this already exists and is
unused by retrieval: chunk `id` is `pageId::NNN` and `chunkIndex` gives exact adjacency;
`data/crosslinks.json` → `pageById[id]` carries `previousPageId` / `nextPageId` / `relatedPageIds`
for 1,595 pages.

## Scope
**In:**
- **Adjacent-chunk completion:** when a chunk is in the selected set, pull `chunkIndex ± 1` from
  the same page if the word budget allows. Deterministic order (by `chunkId` ASC). This directly
  repairs the extractive lane.
- **Crosslink expansion (A/B-gated, low weight):** when the top page is strongly matched, admit
  the single best chunk of its `relatedPageIds` neighbors at low priority — only if it displaces
  budget headroom, never stacking noise on top of a full window (respect fable-10's cutoff, which
  lands first).
- **Two-tier framing (2):** formalize the existing latent tiers — page = coarse summary, chunk =
  detail — as a "route a partial cue to the page, then to its chunks" path. Keep it lightweight;
  at 2,884 chunks a brute-force scan is cheap, so do NOT build a heavyweight index. This is mostly
  a code-organization + expansion-ordering concern, not new infrastructure.
- Load `data/crosslinks.json` in `loadRuntime()` (append-only; rebase if fable-6 landed a
  `loadRuntime` addition first).
- Tests: a boundary-straddling fixture that now answers completely; determinism double-run.

**Out:**
- Vector/embedding neighbors (retrieval stays lexical + metadata).
- Unbounded expansion — every expansion is capped by the existing word budget and by fable-10's
  cutoff; expansion must **displace weak distractors, not add to them**.
- Editing scoring (`scoreChunk`, region B — fable-6) or the cutoff loop (region C — fable-10).

## Owned surface (region D + extractiveAnswer + loadRuntime)
`scripts/run-llm-rag-answer.mjs`: a **new** post-selection expansion stage inserted after the
selection loop (~after 602, before `candidatePages`), the neighbor pull inside
`extractiveAnswer()` (~661–711), and an append-only `crosslinks` load in `loadRuntime()`. Do not
edit regions A, B, C.

## Determinism
Pure — reads committed chunk metadata + `crosslinks.json`. The one risk is ordering:
**every expansion must use a fixed tie-break** (chunkId ASC). Add the double-run byte-identical
assertion.

## Acceptance / definition of done
- [ ] All 47 fixtures still pass.
- [ ] A boundary-straddling query (add a fixture) now returns the complete fact instead of a
      truncated one, shown via before/after retrieval-only diff.
- [ ] Expansion is budget-bounded and deterministically ordered; crosslink expansion is behind a
      flag/config and A/B-shown to help (or is left off by default with the numbers recorded).
- [ ] Same query twice → byte-identical `--json`.
- [ ] Milestone commits reference the issue; final report on the Linear issue.

## Suggested approach
1. Start with adjacent-chunk completion only (highest-confidence win, smallest change); prove it
   on the extractive lane.
2. Add crosslink expansion behind config; A/B on the fixtures; keep it only if it helps.
3. Confirm it composes cleanly on top of fable-10's cutoff (rebase on main first).

## Execution protocol (embedded)
Claim `agent-fable-9`. Branch `rag-quality/fable-9-associative-expansion` off `main` (rebase
before merge so fable-10's cutoff is present). One Linear issue under the epic, labelled
`project:symmio-search-book` + `subproject:rag-quality` + `agent:agent-fable-9`; **In Progress**
on start. Commit milestones `(SYN-###)`. Finish → **Done** + report + push. Blocked → linked
`needs:*` issue, **Blocked**.
