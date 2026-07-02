# Goal: Search Book Production Finalization (every pre-VPS gap)

- Project: onboarding-app / search-book
- Repo: `~/projects/symmio-search-book` on the operator's Mac (`0xneelo/symmio-search-book`) — **this clone holds the staged work; run here, not on the VPS**
- Linear goal issue: SYN-304 (parent epic SYN-209)
- Created: 2026-07-02
- Operator intent: "when I wake up he should be fully done with everything else other than the VPS deployment."

## One-line goal

Finish every Search Book production gap that does not require the VPS or operator decisions, so the only remaining work is OPERATOR-INBOX #11 (SYN-281) and #4 (SYN-285) and launch is push-button.

## Current state (2026-07-02, verified locally)

- Full verify green: 26 build steps, 93 syntax checks, 820 routes, 2,884 chunks, 801 authored pages, 17/17 source ingestion, quality 29/30 (only `operator-inbox` failing on #11/#4, by design).
- Live `gpt-4.1-mini` eval re-recorded 44/44 (17/17 adversarial incl. two answered-with-disclaimer financial-advice cases, 27/27 answer-validation, 18 calls, $0.02164875).
- **Working tree holds verified, uncommitted work**: the financial-advice answered-with-disclaimer change (~19 modified files) plus untracked `_local/handoff-register.md`, `docs/goals/prod-finalization/`, `docs/agents/registry.md`. All guards pass with these changes.
- Open Linear: SYN-301 (undocumented-fact gap events — full brief exists), SYN-304 (this goal), SYN-281/SYN-285 (operator, out of scope).
- A codex agent (SYN-292) pushes to `main` from the VPS concurrently.

## Scope

**In:**
1. Checkpoint-commit and push the staged work; CI green.
2. Resolve and close SYN-301 (typed gap events for undocumented-fact answers).
3. Make the sensitive-pattern scan a fail-closed gate.
4. Refresh manual launch/release/static evidence workflows from the new head; validate packets; update status docs.
5. Final sweep: full verify, current live-eval evidence, `PRODUCTION-READINESS-PACKET.md` accurate as the operator's #11/#4 runbook; evidence report on SYN-304.
6. Lafa verbatim answers (SYN-309, operator decision 2026-07-02): `lafa-cite` ingestion of the local raw export, `discord-lafa` source family, automated contradiction screen, quote-capable runtime with attribution and no disclaimers, narrowed non-Lafa refusal, guard migration. Run after step 3, before step 4 so refreshed evidence includes it.

**Out (do NOT touch):**
- #11 VPS env install (SYN-281) and #4 platform/route/owner decisions (SYN-285) — operator-only.
- Quoting or storing text from **non-Lafa** community members (Lafa verbatim quoting is IN scope per SYN-309; everyone else's message text stays out of the repo).
- Committing the raw export (`raw-discord-exports/` is gitignored — keep it that way).
- The frozen `~/projects/onboarding-app/src/search-book` tree.
- Printing or persisting any secret from `.secrets/`.

## Definition of done / acceptance

- All six in-scope steps complete; SYN-301, SYN-309, and SYN-304 Done in Linear with evidence comments (SYN-309 may fall back to its timeboxed partial-landing rule in plan.md §Step 6 with a follow-up issue filed).
- "What did Lafa say about X" queries answer verbatim with `discord-lafa` citations and attribution — no disclaimer; non-Lafa community-quote requests still refuse.
- `npm run search-book:verify` green locally AND `Search Book Verify` green on the pushed head.
- Quality gates exactly 29/30 with `operator-inbox` the only failure (#11/#4 open). Do not force 30/30.
- Live eval evidence current (re-run and re-record if fixtures changed; expect `valuesPrinted:false`).
- Fresh manual `Search Book Launch Evidence`, `Search Book Release Dry Run`, `Search Book Static Artifact` runs pass from the final head; downloaded packets pass the checked validators; run ids recorded in status docs.
- `PROGRESS.md` + `_local/agent-worklog.md` entries follow the newest-first house format.
- Only #11/#4 remain in `_specs/app-docs/OPERATOR-INBOX.md`.

## Conditions and constraints

- Autonomous overnight run: never block on the operator. If genuinely blocked, file a Linear issue (`needs:operator`), set Blocked, link it, and continue with other in-scope work.
- Pull/rebase before every work block (concurrent codex pusher). Conflicts concentrate in append-style files (`PROGRESS.md`, `_local/agent-worklog.md`) — preserve both sides, newest-first.
- Verify requires a `0xneelo/vibe_docs` clone via `VIBE_DOCS_PUBLIC=<clone>/Docs/public` and `VIBE_DOCS_DATA=<clone>/Website/public/generated/docs-data.json`.
- Live LLM calls: load `.secrets/search-book.env` only via `--env-file`; never echo values.
- The guard web pins prose↔data consistency (`check-status-evidence`, `check-completion-audit`, `check-readiness-evidence` incl. `_specs/app-docs/11-production-readiness-roadmap.md`, `check-production-packet`). `check-completion-audit` pins objective row titles verbatim — express policy changes in status/evidence cells, never rename a row.
- Eval expectation type `answered-with-disclaimer` is live-only; the mirror-count equality lives in BOTH `build-answer-validation-report.mjs` and `build-quality-audit.mjs` — any new live-only bucket must be counted in both.

## Riskiest assumptions

1. Merge conflicts with the codex agent overnight → mitigate: pull before each block, small scoped checkpoints, push early.
2. Model self-report reliability for SYN-301's fact-coverage field → mitigate: validation-retry feedback (existing pattern), eval fixtures with paraphrases, fall back to the `diagnose` skill if flaky.

## References

- Plan: `docs/goals/prod-finalization/plan.md`
- Protocol: `docs/goals/prod-finalization/execution-protocol.md`
- Briefs: `/tmp/handoff-search-book-prod-finalization-20260702.md`, `/tmp/handoff-search-book-unanswered-fact-gap-events-20260702.md`
- Register: `_local/handoff-register.md` · Agent registry: `docs/agents/registry.md`
- Operator runbook (output of step 5): `PRODUCTION-READINESS-PACKET.md`, `DEPLOYMENT.md`, `deploy/`
