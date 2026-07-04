# RAG Quality — engram-derived retrieval upgrades (shared contract)

**Project:** `symmio-search-book`  ·  **Sub-project:** `rag-quality`
**Repo:** `0xneelo/symmio-search-book`  ·  **Branch base:** `main` @ `53a185c`
**Linear epic:** [SYN-375](https://linear.app/synchronicity/issue/SYN-375)  ·  **Umbrella:** related to `SYN-209` (Search Book → Production)

This directory holds five parallel worker-agent goals plus one research/backlog goal. Every
agent reads THIS file first, then its own `goal-*.md`. The five goals came out of an
engram-theory reading of the deterministic RAG pipeline (treated strictly as
information-retrieval design hypotheses, not neuroscience). Each is independently shippable
and independently A/B-able against the fixture eval.

---

## The five goals and their owners

| Agent tag | Linear | Goal | Principle | Merge order | Primary surface |
|-----------|--------|------|-----------|-------------|-----------------|
| `agent-fable-10` | SYN-376 | [Distractor suppression — score-gap cutoff](goal-10-snr-cutoff.md) | Interference / SNR | **1st** (do first) | `retrieve()` selection loop |
| `agent-fable-9` | SYN-377 | [Associative expansion + two-tier](goal-9-associative-expansion.md) | Pattern completion + indexing | 2nd | new post-selection stage + `extractiveAnswer()` |
| `agent-fable-6` | SYN-378 | [Generative encoding-cue index](goal-6-cue-index.md) | Encoding specificity (flagship) | 3rd | new build script + `scoreChunk()` |
| `agent-fable-7` | SYN-379 | [Adaptive forgetting — supersession](goal-7-supersession.md) | Availability vs. accessibility | 4th | `build-answer-chunks.mjs` + `retrieve()` eligibility filter |
| `agent-fable-8` | SYN-380 | [Prioritized replay in the living-docs loop](goal-8-prioritized-replay.md) | Prioritized replay | **parallel** (orthogonal) | `build-gap-queue.mjs` / living-docs |

The sixth package, [research-backlog](goal-research-backlog.md) (SYN-381), captures the deferred /
"more ideas" items (negative-cue index, reuse-cache stale-citation bug, true BM25/IDF,
usage-boost-as-tiebreaker, retrieval-only eval harness). It is a research issue, not a build
goal, and is where net-new ideas land.

---

## The determinism contract (non-negotiable — read this twice)

The retrieval path is **pure**: `same query + same committed data + same code → byte-identical
JSON answer`. This is the whole reason the system exists (auditable, reproducible-per-git-SHA
answers). Every goal here preserves it. The one rule that keeps it true:

> **State that changes over time must live at BUILD time (frozen into a committed, diffable
> artifact) or in the reuse cache (already off the pure path) — NEVER inside `scoreChunk()` /
> `retrieve()`.**

Concretely, in `scripts/run-llm-rag-answer.mjs`:

- ✅ Allowed in the pure path: reading committed JSON artifacts (`answer-chunks.json`,
  `question-routes.json`, new `answer-cues.json`, etc.), deterministic scoring, deterministic
  tie-breaks (the codebase already sorts ties by `id` — keep that habit everywhere).
- ❌ Forbidden in the pure path: wall-clock time (`Date.now()` affecting ranking), live DB
  reads (`helpful_count`, ratings) affecting ranking, network calls (embeddings/LLM) inside
  retrieval, `Math.random()`. Anything whose value differs between two runs of the same query.
- ✅ The offline escape hatch: an LLM/heuristic may GENERATE ranking inputs (cues, supersession
  flags, replay priorities) **at build time**, as long as the output is committed JSON that a
  reviewer can diff and the fixture eval gates. The nondeterminism is confined to an offline,
  reviewable step — exactly like the 890 hand-authored `question-routes.json` rows are today.

**Two known traps, both fail the same way** (documented so nobody rebuilds them):

1. Query-time HyDE / LLM cue generation → breaks purity. Cues must be build-time + committed.
2. Wall-clock time-decay on chunk freshness → "same query, different answer next week." Only
   the explicit-supersession half of adaptive forgetting is in scope; time-decay is deferred
   and, if ever built, must be computed at build time and frozen into the committed artifact.

If your change needs a usage/traffic signal in ranking, the ONLY allowed form is a
**deterministic tie-breaker among already-equal-score chunks, versioned to a corpus snapshot** —
see the research-backlog goal. Do not reach for it inside a core goal.

---

## Shared eval protocol (how every goal proves itself)

- **Fixture eval — 47 cases, the acceptance gate.** 20 adversarial cases
  (`data/llm-rag-contract.json` → `adversarialEvaluation.cases`) + 27 answer-validation
  fixtures (`data/answer-validation-report.json` → `fixtures`). No goal may regress a passing
  fixture. The live path runs via `node scripts/run-llm-rag-answer.mjs --eval-live all --json`
  (needs LLM env; the runtime degrades to extractive without it).
- **Retrieval-only A/B (build this if it doesn't exist — see research-backlog).** The fixture
  eval burns LLM tokens. For scoring/selection changes (goals 10, 9, 6, 7) the fast, free,
  fully-deterministic check is: for a fixture query, assert the expected `pageId` appears in
  `retrieve().chunks` (or in the top-K). Use `--include-debug` — it already emits the retrieval
  context. Add before/after retrieval snapshots to each goal's PR so a scoring change is a
  red/green diff, not a judgment call.
- **Determinism assertion.** Run the same query twice; assert byte-identical `--json` output.
  Add this to your goal's tests. Any new artifact must produce identical bytes on rebuild from
  the same inputs (the build scripts already stamp `generatedAt: "deterministic-build"`).

---

## Ownership map (how five agents edit overlapping files without colliding)

The hot file is `scripts/run-llm-rag-answer.mjs`. Four goals touch it, but in **distinct,
non-overlapping regions**. Edit only your region; keep hunks minimal.

| Region | Location (as of `53a185c`) | Owner |
|--------|----------------------------|-------|
| A — per-chunk eligibility filter | `retrieve()` ~ line 587–589 (`pageState` / `sourceKeys` gate) | `agent-fable-7` (add supersession gate) |
| B — scoring | `scoreChunk()` ~ 564–572 + its call site ~590 | `agent-fable-6` (add cue term) |
| C — selection / truncation loop | `retrieve()` ~ 596–602 (`maxChunks` / `maxContextWords`) | `agent-fable-10` (add score-gap cutoff) |
| D — post-selection expansion (new) | after ~602, before `candidatePages` | `agent-fable-9` (neighbor/crosslink expansion) |
| `loadRuntime()` additions | ~373–409 (append new artifact loads) | `agent-fable-6` (cues) + `agent-fable-9` (crosslinks) — **append-only**, rebase on prior |
| `extractiveAnswer()` | ~661–711 | `agent-fable-9` (neighbor pull) |
| new build script `build-answer-cues.mjs` + `data/answer-cues.json` | new files | `agent-fable-6` only |
| `build-answer-chunks.mjs` + `page-state-registry` supersession field | existing | `agent-fable-7` only |
| `build-gap-queue.mjs` / living-docs prioritization | existing | `agent-fable-8` only |

**Deliberate seam decisions:**
- `agent-fable-6` (cues) uses a **separate** `build-answer-cues.mjs`, NOT `build-answer-chunks.mjs`,
  precisely so it never collides with `agent-fable-7`'s chunk-builder edits.
- `agent-fable-8` is **orthogonal** to the retriever entirely (build/living-docs side) → runs
  fully in parallel with zero merge risk against 6/7/9/10.
- `loadRuntime()` is the one shared function 6 and 9 both extend; treat additions as
  **append-only** (add your artifact path to `defaults`, add your key to the returned runtime
  object) and rebase on whoever landed first.

**Merge order: 10 → 9 → 6 → 7** (fable-8 parallel). Rationale: 10 is the smallest and nearly
conflict-free (do first, get the SNR win immediately); 9 adds a new stage below 10's; 6 changes
scoring, which 9's expansion and 10's cutoff both consume, so it lands after them; 7 changes the
eligibility filter at the top of `retrieve()` last. Each agent: branch off `main`, and **rebase
on `main` before opening your merge** so the prior goal's landed hunks are already present. If a
prior goal hasn't landed when you're ready, coordinate in Linear (`needs:agent:<tag>`), don't
force-merge over an unlanded seam.

---

## Branch + Linear conventions

- **One branch per agent**, off `main`: suggested `rag-quality/<agent-tag>-<slug>`
  (e.g. `rag-quality/fable-10-snr-cutoff`).
- **One Linear issue per subtask**, all under the rag-quality epic, every issue labelled
  `project:symmio-search-book` + `subproject:rag-quality` + `agent:<your-tag>`. Set **In
  Progress** on start, **Done** + report on finish.
- **Commit every milestone**, referencing the issue id (e.g. `(SYN-###)`), with the repo's
  commit trailer.
- **Blocked?** File a Linear issue, label `needs:operator` / `needs:agent:<tag>` / `needs:general`,
  set **Blocked**, link it to your issue. A blocker that isn't a Linear issue doesn't exist.

Full protocol: [`execution-protocol.md`](../../../.claude/skills/introduce-goal/references/execution-protocol.md)
(embedded per-goal below).

---

## Label divergence flag (for the operator)

Existing search-book work is tagged `project:onboarding-app` / `subproject:search-book` (legacy
monorepo path). This sub-project deliberately uses the **new** `project:symmio-search-book` /
`subproject:rag-quality` grouping to reflect the standalone repo. Both label families now exist
in the Synchronicity team. If you'd rather fold rag-quality under the legacy `subproject:search-book`,
that's a one-line relabel per issue — flagged here so it's a conscious choice, not drift.
