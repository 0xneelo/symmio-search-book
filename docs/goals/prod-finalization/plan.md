# Plan: Production Finalization — five ordered steps

Target repo: `~/projects/symmio-search-book` (operator Mac clone of `0xneelo/symmio-search-book`).
Do not edit the frozen legacy tree at `~/projects/onboarding-app/src/search-book`.

Before every step: `git pull --rebase` (codex agent pushes concurrently) and re-run the focused guards you are about to rely on.

Environment for full verify:

```sh
# one-time if missing
git clone --depth 1 https://github.com/0xneelo/vibe_docs.git /tmp/vibe_docs
# verify then defaults to /tmp/vibe_docs, or export VIBE_DOCS_PUBLIC/VIBE_DOCS_DATA explicitly
npm run search-book:verify
```

Live LLM env (never echo values): `node --env-file=.secrets/search-book.env <script>`.

## Step 1 — Checkpoint the staged work (Linear: seeded sub-issue)

The tree already holds the verified answered-with-disclaimer change. First action:

```sh
git status --porcelain          # ~19 modified + untracked _local/handoff-register.md, docs/goals/prod-finalization/, docs/agents/
npm run search-book:verify      # must be green before committing
```

Commit in scoped checkpoints matching house style (short imperative subject, no scope prefix), e.g.:
1. `Answer financial-advice queries with mandatory disclaimer` — runtime + builders + regenerated data/*.
2. `Reconcile advice-disclaimer evidence across status docs` — prose docs + PROGRESS + worklog.
3. `Register production-finalization goal pack and handoff register` — docs/goals/, docs/agents/, _local/handoff-register.md.

Push, then confirm CI:

```sh
git push
gh run watch $(gh run list --workflow "Search Book Verify" --limit 1 --json databaseId --jq '.[0].databaseId')
```

## Step 2 — Resolve SYN-301 (undocumented-fact gap events)

Work from the brief `/tmp/handoff-search-book-unanswered-fact-gap-events-20260702.md`. Summary of the agreed direction (recommendation ratified by the operator's advice-lane precedent — answer with guardrails rather than refuse):

1. Add a required fact-coverage self-report field to the LLM response contract (`factCoverage: "full"|"partial"|"absent"` or equivalent) — one system-prompt line in `buildLlmMessages`, validation in `collectValidationFailures` (model retries on omission via existing validation-retry loop).
2. On `absent`: keep the honest answer but emit a typed gap event (suggested reason `asked-fact-not-in-corpus`) through the same events path refusals use; ensure `serve-answer-engine.mjs` persists it to `search_book_gaps` on BOTH the fresh-answer and answer-cache reuse paths.
3. Repro before/after: `node --env-file=.secrets/search-book.env scripts/run-llm-rag-answer.mjs --query "What is the SYMM token contract address on Ethereum mainnet?" --mode llm --json` — before: `answered` with no gap; after: answered + gap event (or refusal, if the model reports absent and no answer is possible).
4. Add adversarial fixtures in `build-llm-rag-contract.mjs` (new category, e.g. `undocumented-fact`): SYMM-address + at least one paraphrase; extend `evaluateLiveCase` with the chosen expectation; decide static-mirror treatment in `build-answer-validation-report.mjs` (live-only bucket like the disclaimer cases is acceptable — count it in BOTH mirror equalities, see goal.md constraints).
5. Re-run `--eval-live all`, update `recordedLiveEvaluation` (builder) with measured numbers, reconcile the five prose docs (grep the old totals), append PROGRESS/worklog entries, full verify, checkpoint commit referencing SYN-301.
6. Comment evidence on SYN-301, set it Done.

## Step 3 — Fail-closed sensitive-pattern scan

`runSensitivePatternScan` in `scripts/build-all.mjs` currently reports `{matches:143, files:54}` and never fails; regex misses key-shaped values.

1. Extend patterns with key shapes: `sk-[A-Za-z0-9_-]{20,}`, `gho_[A-Za-z0-9]{20,}`, `AKIA[0-9A-Z]{16}`, `-----BEGIN [A-Z ]*PRIVATE KEY-----`, plus the existing set.
2. Skip `.secrets/` (gitignored by design) alongside `.git/node_modules/backups`.
3. Add a committed baseline/allowlist (e.g. `data/sensitive-scan-baseline.json` with per-file expected counts or hashes) so the 143 known-benign matches pass; **fail verify on any new unallowlisted hit**.
4. Prove it fails closed: temporarily plant a fake `sk-...` string in a scratch file inside the repo, watch verify fail, remove it.
5. Keep all four GitHub workflows green; update README/status docs if they describe the scan; PROGRESS/worklog entries; checkpoint commit.

## Step 4 — Refresh evidence from the new head

Follow the established "Refresh manual evidence" pattern (see PROGRESS.md entries for wording):

```sh
gh workflow run "Search Book Launch Evidence" && gh workflow run "Search Book Release Dry Run" && gh workflow run "Search Book Static Artifact"
# wait, then download each run's artifacts to /tmp and validate:
npm run search-book:check-launch-evidence-packet -- --packet <dl-path> --require-summary
npm run search-book:check-release-dry-run-packet -- --packet <dl-path> --require-summary
npm run search-book:check-static-artifact-packet -- --packet <dl-path>
```

(Check each validator's `--help`/source for exact flags before running.) Record run ids, commit, disposition rows, and `Secrets printed | false` in `PROGRESS.md`, `FINAL-REPORT.md`, `COMPLETION-AUDIT.md`, `PRODUCTION-READINESS-PACKET.md`. Checkpoint commit.

## Step 5 — Final sweep and goal close

1. `npm run search-book:drill-local-launch` — staging drill must pass.
2. Full verify green; quality 29/30 with only `operator-inbox` failing; `node -e` check that OPERATOR-INBOX still lists exactly #11/#4 open.
3. Read `PRODUCTION-READINESS-PACKET.md` end-to-end as the operator: every command in it must be literally executable once #11/#4 land; fix anything stale (it is guard-checked by `check-production-packet`).
4. Final PROGRESS/worklog entries; final checkpoint; push; CI green.
5. Comment the full evidence summary on SYN-304 (counts, run ids, commits, before/after for SYN-301 and the scan gate) and set SYN-304 Done. Retire your agent tag in `docs/agents/registry.md` (status `retired`).

## Step 6 — Lafa verbatim answers (SYN-309) — run after Step 3, before Step 4

Operator decisions locked 2026-07-02 (do not relitigate):
- Lafa's Discord answers are first-class founder-voice source material. Quote them **verbatim with attribution** ("Lafa (founder), Discord #symm-chat, <date>") — **no disclaimers, no blanket editorial gate**.
- Publication scope: Lafa's answers + the community questions they answer (retrieval context). The other ~4,896 general chat messages' text stays OUT of the repo (privacy; the repo is public).
- The blanket human review is replaced by an automated contradiction screen; only flagged conflicts need human eyes.

Verified ground truth (2026-07-02 trial, results in the audit session scratchpad):
- Raw export: `raw-discord-exports/SYMMIO - 👋ㆍ Community ㆍ - 🌎ㆍsymm-chat [1106198412124237855].json` (112 MB, gitignored — NEVER commit it). DiscordChatExporter format, parses cleanly.
- `node scripts/build-discord-corpus.mjs --input "<that file>" --lafa-author-id 398903549515399179 --publication-mode cite --out-json /tmp/trial.json` reproduces committed counts exactly (5,000 messages / 723 clusters / 837 Lafa candidates) and hydrates 820/837 answers + 723/723 questions. 17 candidates are embed/attachment-only (empty text) — exclude them.
- Existing cite mode stores ALL message text (community members included) — that is why a new mode is needed.

Sub-steps:
1. Add `lafa-cite` publication mode to `build-discord-corpus.mjs`: store text on `lafaAnswerCandidates[].answer`/`relatedQuestion` and `questionClusters[].question` only; `messages[]` content stays empty; `storesMessageText` reporting should distinguish the mode (e.g. `lafa-only`).
2. Register a `discord-lafa` source family in `SOURCES.md` (channel href `https://discord.com/channels/1106198408202563665/1106198412124237855`; per-message permalinks derivable as `.../<messageId>`). Wire into source catalog/ingestion evidence.
3. Contradiction screen (new script, e.g. `scripts/screen-lafa-answers.mjs`): check each hydrated answer against the reconciled boundaries — referral-depth wording (G-003), Phase A/B revenue boundary (G-004), market counts (G-006), the disallowed-phrase lists used by answer guidance, and secret patterns. Output triage JSON: auto-approved vs flagged (with reason). Auto-approved enter chunks; flagged are excluded and surfaced count-only for human review. Deterministic, committed evidence.
4. Build retrieval chunks from approved Lafa Q&As (chunk source `discord-lafa`, one chunk per Q&A with attribution metadata) and rewire the `discord` risk rule in `run-llm-rag-answer.mjs`: Lafa-framed queries answer from those chunks verbatim-with-citation; quoting requests for non-Lafa community content still refuse (narrowed rule + message).
5. Fixtures: flip `adv-discord-lafa-answer` to answered-with-citation-to-`discord-lafa` (a live-only bucket like the disclaimer cases is acceptable if the primary page is retrieval-dependent — count it in BOTH mirror equalities); add a non-Lafa community-quote refusal fixture so the narrowed boundary is regression-tested.
6. Guard migration (the big one — these currently fail closed on any hydrated Discord text): `check-discord-review-artifacts`, `check-publication-boundaries`, `build-discord-editorial-queue`, `check-discord-refusal-runtime` (its probes must target the non-Lafa lane now), the quality-audit discord gate, G-001 disposition in `GAPS.md`, `DISCORD-EDITORIAL-QUEUE.md` reviewer rules, and the launch/release packet disposition rows ("0 exact promotions" becomes "Lafa-cite post-screen promotions: N; non-Lafa promotions: 0").
7. Re-run live eval (Discord fixtures now make LLM calls), re-record evidence, full verify, PROGRESS/worklog entries, checkpoint commits referencing SYN-309.

Timebox note: this is the largest step. If the guard migration exceeds ~2h of iteration, land sub-steps 1–3 (ingestion + screen, guards still green because data stays uncommitted) as one checkpoint, file the remainder as a follow-up issue, and continue with Steps 4–5 so the goal still closes — then return if time allows.

## Milestone → commit map

Every step ends in at least one pushed commit referencing its Linear issue id. Never batch multiple steps into one commit. If a step's verify breaks and can't be fixed within the step, revert to the last green checkpoint, file the blocker issue, move on.
