# Launch prompts — rag-quality worker agents

Paste-ready prompts (target: `claude`, ~4000 char budget each). One per worker agent. Each is
self-contained but points at the doc pack + Linear issue for full detail. Dispatch fable-8
anytime (orthogonal); dispatch 10 → 9 → 6 → 7 in merge order (they can develop in parallel but
merge in sequence — see the contract).

---

## agent-fable-10 — SNR cutoff (SYN-376) — do first

```
You are agent-fable-10, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md (determinism contract + ownership map + eval protocol),
then your full contract docs/goals/rag-quality/goal-10-snr-cutoff.md. Linear issue: SYN-376.

GOAL: In retrieve() (scripts/run-llm-rag-answer.mjs), drop retrieved chunks whose score is far below
the top score BEFORE the fixed budget loop, so the LLM stops getting low-relevance distractors next
to the one strong chunk. Today the selection loop (~596–602) fills top-8 / 1600 words and admits any
score>0 (~591).

OWNED SURFACE (region C only): the selection/truncation loop + a configurable relative-cutoff ratio
in defaults/parseArgs. Do NOT touch scoreChunk() (region B), the eligibility filter (region A), or
add expansion (region D) — other agents own those.

DETERMINISM: pure — arithmetic over already-committed scores. No wall-clock, no DB, no network in the
retrieval path. Add a test asserting the same query twice → byte-identical --json.

ACCEPTANCE: all 47 fixtures pass (20 adversarial in data/llm-rag-contract.json + 27 in
data/answer-validation-report.json); ≥1 fixture demonstrably drops a distractor with the answer
unaffected; cutoff ratio configurable with a default justified from an A/B (start ratio≈0.25, relative
to top score, never absolute); never empties a previously-answerable retrieval. Use --include-debug
for fast retrieval-only A/B.

PROTOCOL: claim tag agent-fable-10; branch rag-quality/fable-10-snr-cutoff off main; set SYN-376 In
Progress; commit each milestone referencing (SYN-376); on finish set Done, write a report comment
(what changed, chosen ratio, A/B numbers, how verified), push. Blocked → file a linked Linear issue
labelled needs:operator / needs:agent:<tag> / needs:general, set Blocked. Label every issue
project:symmio-search-book + subproject:rag-quality + agent:agent-fable-10.
```

---

## agent-fable-9 — associative expansion + two-tier (SYN-377)

```
You are agent-fable-9, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md, then docs/goals/rag-quality/goal-9-associative-expansion.md.
Linear issue: SYN-377. Merge order 2nd — rebase on main so fable-10's cutoff (SYN-376) is present.

GOAL: When a chunk is selected, deterministically pull in its co-stored neighbors — adjacent chunks on
the same page (chunkIndex ±1; chunk id is `pageId::NNN`) and the best chunk of linked pages
(data/crosslinks.json → pageById[id].relatedPageIds) — so a single-chunk hit stops losing context.
Chunks are fixed 220-word windows; extractive mode answers from the first ~86 words of the top 1–2
chunks, truncating boundary-straddling answers.

OWNED SURFACE (region D + extractiveAnswer + loadRuntime): a NEW post-selection expansion stage in
retrieve() (after ~602, before candidatePages), the neighbor pull in extractiveAnswer() (~661–711),
and an append-only crosslinks load in loadRuntime(). Do NOT touch regions A/B/C. loadRuntime additions
are append-only — rebase if fable-6 landed one first.

DETERMINISM: pure — reads committed chunk metadata + crosslinks.json. EVERY expansion must use a fixed
tie-break (chunkId ASC). Budget-bounded; expansion must displace weak distractors, not stack on them
(it composes on top of fable-10's cutoff). Add the double-run byte-identical assertion.

ACCEPTANCE: all 47 fixtures pass; add a boundary-straddling fixture that now answers completely (shown
via before/after retrieval-only diff, --include-debug); crosslink expansion behind config and
A/B-shown to help, or left off by default with the numbers recorded. Start with adjacent-chunk
completion only (highest-confidence win), then add crosslink expansion behind a flag.

PROTOCOL: claim agent-fable-9; branch rag-quality/fable-9-associative-expansion off main (rebase before
merge); SYN-377 In Progress; commit milestones (SYN-377); Done + report + push. Blocked → linked
needs:* issue, Blocked. Label issues project:symmio-search-book + subproject:rag-quality + agent:agent-fable-9.
```

---

## agent-fable-6 — generative encoding-cue index / flagship (SYN-378)

```
You are agent-fable-6, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md (the determinism contract matters MOST here), then
docs/goals/rag-quality/goal-6-cue-index.md. Linear issue: SYN-378. Merge order 3rd — rebase so
fable-10 (SYN-376) + fable-9 (SYN-377) are present.

GOAL: At BUILD TIME generate for each chunk/page the questions it answers + entity aliases, commit them
as data/answer-cues.json, and have scoreChunk() score query terms against those cues — fixing
vocabulary-mismatch retrieval without a dense retriever. scoreChunk() today scores overlap against
title+text+sourceKeys and fails on paraphrase; the current fix is 890 hand-seeded exact-match routes.

DETERMINISM (CRUX): query-time HyDE/LLM cue generation BREAKS purity — FORBIDDEN. Generate cues OFFLINE
in the build script; commit the artifact (diffable, reviewed like question-routes.json); runtime reads
ONLY committed JSON. Precision guard: a cue may boost but must not solely create a false route; cues
must be grounded in their chunk and pass citation validation + the 47 fixtures — ESPECIALLY the 20
adversarial cases (a refusal-expected query that starts answering is a regression, not a win).

OWNED SURFACE (region B + new build script + loadRuntime): NEW scripts/build-answer-cues.mjs +
data/answer-cues.json (SEPARATE script, NOT build-answer-chunks.mjs which is fable-7's); the cue term in
scoreChunk() (weight cues ~5×, above title's 3×); threshold-based fuzzy route matching (keep the hard
+20 for exact matches; make fuzzy hints explainable in --include-debug); append-only loadRuntime load.
Do NOT touch regions C/D.

ACCEPTANCE: committed deterministic-build cue artifact with schema validation (fail build on dangling
chunkIds / unknown source keys, mirroring build-answer-chunks.mjs); ≥1 paraphrase per topic that used
to miss now retrieves correctly (retrieval-only A/B); all 47 fixtures pass with ZERO adversarial
regressions; route hints explainable; artifact rebuilds to identical bytes; same query twice →
byte-identical --json.

PROTOCOL: claim agent-fable-6; branch rag-quality/fable-6-cue-index off main (rebase before merge);
SYN-378 In Progress; commit milestones (SYN-378); Done + report (generator choice, cue counts, A/B,
adversarial results) + push. Blocked → linked needs:* issue, Blocked. Label issues
project:symmio-search-book + subproject:rag-quality + agent:agent-fable-6.
```

---

## agent-fable-7 — adaptive forgetting / supersession (SYN-379)

```
You are agent-fable-7, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md, then docs/goals/rag-quality/goal-7-supersession.md.
Linear issue: SYN-379. Merge order 4th — rebase so fable-10/9/6 are present.

GOAL: Give chunks an explicit supersededBy field, computed at BUILD TIME and frozen into the committed
chunk artifact, so stale/superseded chunks drop out of DEFAULT retrieval while staying stored and
operator-resurfaceable — with NO wall-clock decay. Today there is no freshness mechanism; chunks are
immortal until a manual rebuild, so superseded/near-duplicate chunks become exactly the distractors
fable-10's cutoff must suppress.

DETERMINISM BOUNDARY: explicit supersession is deterministic and IN scope. Wall-clock time-decay is OUT
(it breaks purity — "same query, different answer next week"). If time ever factors in, compute it at
build time from source timestamps and freeze it into the committed artifact. Do NOT read the clock in
retrieve(). Supersession is demotion, NEVER deletion (availability preserved).

OWNED SURFACE (region A + build-answer-chunks.mjs + page-state-registry): emit supersededBy per chunk in
build-answer-chunks.mjs (source of truth: an explicit page-state/authoring flag — simplest + most
auditable); add the gate in retrieve()'s eligibility filter (~587–589) plus an --include-superseded
flag (runtime default + CLI + env, default OFF). Do NOT touch regions B/C/D or build-answer-cues.mjs
(fable-6's).

ACCEPTANCE: committed supersededBy field, schema-validated (referenced ids must exist); superseded
chunks excluded by default and resurfaced by --include-superseded; all 47 fixtures pass (choose
superseded candidates so no fixture-required chunk is hidden, or add a fixture proving the demotion is
correct); no wall-clock time in ranking; same query twice → byte-identical --json.

PROTOCOL: claim agent-fable-7; branch rag-quality/fable-7-supersession off main (rebase before merge);
SYN-379 In Progress; commit milestones (SYN-379); Done + report + push. Blocked → linked needs:* issue,
Blocked. Label issues project:symmio-search-book + subproject:rag-quality + agent:agent-fable-7.
```

---

## agent-fable-8 — prioritized replay (SYN-380) — parallel, dispatch anytime

```
You are agent-fable-8, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md, then docs/goals/rag-quality/goal-8-prioritized-replay.md.
Linear issue: SYN-380. This goal is ORTHOGONAL to the retriever — no rebase dependency, fully parallel.

GOAL: Rank the living-docs consolidation queue by weakness/at-risk-ness — partial coverage, low
confidence, refusals-that-should-answer, thumbs-down — instead of by volume/popularity, so authoring
effort flows to the memories most at risk, not the already-well-covered ones. The gap queue
(build-gap-queue.mjs → priorityScore, topItems) + rating loop are the substrate; prioritization today
is a static priority map + counts.

SIGNALS (already available, no new infra): question-routes.json byConfidence (47 High / 584 Medium /
259 Low) + per-route confidence/notes; factCoverage "absent" (already emitted as
asked-fact-not-in-corpus gap events); server search_book_gaps / search_book_ratings (thumbs-down,
low-rated-answer, repeated unanswered) via the moderation export.

OWNED SURFACE: build-gap-queue.mjs (and/or a new sibling living-docs build step) + its output artifact.
Do NOT touch scoreChunk()/retrieve() — that is what keeps this fully parallel.

DETERMINISM: the ranked artifact is build-time + committed. If it consumes live server signals, that
consumption lives in the build/export step and the OUTPUT is frozen + committed — never read live during
retrieval. Deterministic rebuild (identical bytes from identical inputs).

ACCEPTANCE: a committed, ranked "at-risk consolidation" artifact whose ordering demonstrably differs
from pure priority/volume ordering (top items genuinely weak — partial coverage / low confidence /
thumbs-down — not merely popular); documented, auditable ranking formula; deterministic rebuild; a
before/after ordering diff proving it surfaces weak-but-unpopular items the old ordering buried.

PROTOCOL: claim agent-fable-8; branch rag-quality/fable-8-prioritized-replay off main; SYN-380 In
Progress; commit milestones (SYN-380); Done + report + push. Blocked → linked needs:* issue, Blocked.
Label issues project:symmio-search-book + subproject:rag-quality + agent:agent-fable-8.
```

---

## agent-fable-11 — negative-cue index (SYN-382) — parallel, dispatch anytime

```
You are agent-fable-11, a worker on project:symmio-search-book / subproject:rag-quality in repo
/Users/misterislez/projects/symmio-search-book (0xneelo/symmio-search-book), branch base `main`.

READ FIRST: docs/goals/rag-quality/README.md, then docs/goals/rag-quality/goal-11-negative-cue-index.md.
Linear issue: SYN-382. ORTHOGONAL to the retriever (owns preflight()) — no rebase dependency beyond the
append-only loadRuntime seam.

GOAL: Give blocked questions the same BUILD-TIME generated-cue treatment as goal-6 — a committed
data/negative-cues.json compiled from the refusal + reconciliation lanes — so near-miss PARAPHRASES of a
blocked question are caught in preflight(), not just verbatim matches. Today riskRules (~102–193) +
reconciliationByQuestion match largely by regex / exact normalized-question equality in preflight()
(~488–522), so a paraphrase that dodges the pattern slips through.

DETERMINISM: query-time LLM cue generation BREAKS purity — FORBIDDEN. Generate offline in the build
script; commit the artifact (diffable, reviewed like the reconciliation lanes); runtime reads ONLY
committed JSON. PRECISION GUARD (critical — false positives block real answers): a negative cue may
ONLY strengthen an existing block for near-miss phrasings of an already-blocked topic; it must NEVER
turn a legitimate answerable query into a refusal. The 27 answer-validation fixtures are the over-block
tripwire — all must still answer.

OWNED SURFACE (region E — preflight()): NEW scripts/build-negative-cues.mjs + data/negative-cues.json;
a near-miss match in preflight() that returns the SAME refusal (status/reason/message/gapId) the exact
match would; append-only loadRuntime load. Do NOT touch scoreChunk() (region B / fable-6) or retrieve()
regions A/C/D. Only ADD paraphrase coverage — never loosen an existing refusal.

ACCEPTANCE: committed deterministic-build negative-cue artifact, schema-validated (every cue maps to a
real refusal reason / gapId); ≥1 paraphrase per blocked topic (discord, phase-b revenue, secrets,
whitepaper origin, opyn, vibe covered-call) now refuses with the right reason; ZERO over-blocking —
all 47 fixtures pass (20 adversarial still refuse AND 27 legit still answer); every block explainable in
--include-debug; artifact rebuilds to identical bytes; same query twice → byte-identical --json.

PROTOCOL: claim agent-fable-11; branch rag-quality/fable-11-negative-cue-index off main (rebase before
merge for the loadRuntime seam); SYN-382 In Progress; commit milestones (SYN-382); Done + report
(generator choice, cue counts, over-block results, A/B) + push. Blocked → linked needs:* issue, Blocked.
Label issues project:symmio-search-book + subproject:rag-quality + agent:agent-fable-11.
```

---

## Research/backlog kickoff (SYN-381) — assign when ready

Not a worker-agent launch; it's a research issue. Whoever picks it up claims a fresh agent tag, reads
`docs/goals/rag-quality/goal-research-backlog.md`, and spins each item into its own goal/issue.
(Item 1, the reuse-cache stale-citation bug, is already split out as its own bug issue — SYN-389.)

---

## Short 2-liner variants

Minimal kickoff prompts — each agent bootstraps the full contract from the README + its goal doc, so
these lose nothing. Dispatch 10 first, then 9 → 6 → 7; 8 and 11 anytime.

**fable-10 — SNR cutoff (SYN-376, do first)**
```
You are agent-fable-10 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-10-snr-cutoff.md and execute SYN-376: add a relative score-gap cutoff in retrieve() before the budget loop.
Branch rag-quality/fable-10-snr-cutoff off main; all 47 fixtures must pass; follow the embedded protocol (claim tag, In Progress, milestone commits, Done + report).
```

**fable-9 — associative expansion (SYN-377)**
```
You are agent-fable-9 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-9-associative-expansion.md and execute SYN-377: deterministic adjacent-chunk + crosslink expansion after selection, plus the extractiveAnswer neighbor pull.
Branch rag-quality/fable-9-associative-expansion off main, rebase so fable-10 is present; 47 fixtures green; follow the embedded protocol.
```

**fable-6 — cue index, flagship (SYN-378)**
```
You are agent-fable-6 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-6-cue-index.md and execute SYN-378: build-time generated cue artifact (data/answer-cues.json via new build-answer-cues.mjs) + cue term in scoreChunk + fuzzy route matching — never query-time generation.
Branch rag-quality/fable-6-cue-index off main, rebase so fable-10/9 are present; 47 fixtures green with zero adversarial regressions; follow the embedded protocol.
```

**fable-7 — supersession (SYN-379)**
```
You are agent-fable-7 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-7-supersession.md and execute SYN-379: build-time supersededBy chunk field + eligibility gate in retrieve() with --include-superseded; no wall-clock decay anywhere.
Branch rag-quality/fable-7-supersession off main, rebase so fable-10/9/6 are present; 47 fixtures green; follow the embedded protocol.
```

**fable-8 — prioritized replay (SYN-380, parallel)**
```
You are agent-fable-8 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-8-prioritized-replay.md and execute SYN-380: a committed at-risk ranking for the living-docs consolidation queue in build-gap-queue.mjs — do not touch the retriever.
Branch rag-quality/fable-8-prioritized-replay off main (no rebase dependency); deterministic rebuild + documented formula; follow the embedded protocol.
```

**fable-11 — negative-cue index (SYN-382, parallel)**
```
You are agent-fable-11 in /Users/misterislez/projects/symmio-search-book. Read docs/goals/rag-quality/README.md then goal-11-negative-cue-index.md and execute SYN-382: build-time data/negative-cues.json + near-miss paraphrase blocking in preflight(); never over-block — the 27 legit fixtures must still answer.
Branch rag-quality/fable-11-negative-cue-index off main; all 47 fixtures green; follow the embedded protocol.
```
