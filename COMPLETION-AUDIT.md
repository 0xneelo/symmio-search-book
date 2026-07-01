# Search Book Completion Audit

Date: 2026-07-01

This audit checks the original Search Book objective against the current standalone `symmio-search-book` repository. It is intentionally stricter than a status report: completion is not assumed from green tests alone.

## Verdict

The Search Book is a verified preview-ready research dossier, static docs prototype, local answer-engine runtime, and living-docs service boundary. It is not yet production-complete.

Completion remains open because:

- OPERATOR-INBOX #11: the production VPS service env at `/etc/symmio-search-book/search-book.env` is not installed.
- OPERATOR-INBOX #4: the public frontend platform/repo/deploy route is not selected.

Do not mark the goal complete until these are resolved or explicitly accepted as out-of-scope for launch.

## Current Evidence Snapshot

Generated evidence from the latest checked repo state:

- `data/source-ingestion.json`: 17/17 source families complete, 0 partial, 0 parked, 0 missing, `sourceCompletionReady:true`.
- `data/requirement-map.json`: 14 requirements complete, 2 partial, 2 parked, `completionReady:false`.
- `data/quality-audit.json`: 29/30 gates passing; the only failing gate is `operator-inbox`.
- `data/discord-corpus.json`: real Discord corpus imported in internal-only mode with 5,000 messages, 723 question clusters, 837 configured Lafa candidates, and no raw message text stored.
- `data/discord-review-routing.json`: sanitized Discord/Lafa routing summary ready with 24 routed items, 19/19 page-fit groups covered by public route aliases, 0 single-route groups remaining, and no raw Discord/Lafa/source answer text included.
- `data/question-routes.json`: 820 exact routes.
- `data/faq.json`: 822 FAQ entries.
- `data/answer-chunks.json`: 2,884 chunks.
- `data/authored-pages.json`: 801 authored pages.
- `data/page-state-registry.json`: 800 published public-navigation pages, 792 source companions, 3 internal drafts.
- `data/llm-rag-contract.json`: live OpenAI `gpt-4.1-mini` eval passed 42/42 on 2026-07-01.
- `data/living-docs-events.json`: local living-docs service boundary implemented, `livingDocsProductionReady:false`.

Current localhost preview evidence:

- Static preview: `http://127.0.0.1:8798/?service=http%3A%2F%2F127.0.0.1%3A8797&serviceMode=extractive`.
- Answer-engine service: `http://127.0.0.1:8797`.
- Staging launch drill: passed with 13 checks, 0 failures, and 3 staging warnings for reviewer owner, review cadence, and backup storage assignment.
- Latest no-secret release dry run: `/tmp/search-book-release-dry-run-source-freshness-20260701-1` passed with static artifact integrity, launch evidence, monitoring evidence, source-freshness evidence, `valuesPrinted:false`, and 0 sensitive-pattern matches. The checked-in validators `npm run search-book:check-launch-evidence-packet` and `npm run search-book:check-release-dry-run-packet` also passed against the latest saved launch/release packets. `npm run search-book:check-discord-review-artifacts` passed against the committed Search Insights summary and the local `/tmp` Discord review/routing packets without printing excerpts.

## Requirement Audit

| Requirement | Status | Evidence | Remaining Work |
| --- | --- | --- | --- |
| Read and follow `_specs/app-docs/01-09` plus pasted objective | Satisfied for current repo state | Specs are carried in `_specs/app-docs/`; generated corpus and reports align to the 500-800 page mission, answer-engine front door, living-docs loop, and design-reference shape. | Keep re-reading before new phases. |
| Build a 500-800 page cited compendium | Satisfied for preview | 794 manifest pages, 801 authored pages, 800 published public-navigation pages, 792 source companions, 0 candidate review pages. | Keep source companions out of public nav and internal drafts out of answer synthesis. |
| Include manifesto and full Symmio/Vibe reference | Satisfied for preview | `data/authored-pages.json` spans manifesto, product-reference, rewards-referrals, dashboard-reference, protocol-reference, answer-engine, reference, solver-reference, competitive-context, and compendium sections. | Maintain source boundaries as new inputs land. |
| Cover revenue, volume, points, vibe-points, referrals, and every dashboard view | Satisfied for preview | Dashboard-reference section has 13 pages; operator-approved Phase A revenue and 15-level referral stance are reflected in generated routes and reports. | Keep Phase B economics refusing until public source/decision boundary changes. |
| Primary-source traceability and contradiction reconciliation | Satisfied for preview | `SOURCES.md`, `GAPS.md`, source catalog, source-ingestion map, and requirement map are generated/maintained; Notion, SSHE, whitepaper v1 boundary, referral-depth, revenue, Opyn, Add Token Info, and Discord/Lafa import are reconciled. | Keep specific Discord/Lafa claims under editorial review before public quotation. |
| Mine Symmio Discord and Lafa answers into FAQ/answer-engine seed | Satisfied for seed corpus; review remains | `scripts/build-discord-corpus.mjs` imported the real export in internal-only mode; `data/discord-corpus.json` reports 5,000 messages, 723 question clusters, 837 configured Lafa candidates, and `corpusReady:true`. | Review clusters/candidates before turning exact Discord statements into public copy. |
| Run competitive sweep over top crypto/docs references | Satisfied for v1 benchmark | `data/competitive-sweep.json` tracks 25 lanes, 50 targets, 49 reviewed, Opyn excluded by operator decision. | Future benchmark refresh can replace Opyn lane if needed. |
| Maintain one IA and one style guide | Satisfied for preview | `STYLEGUIDE.md`, volume map, navigation tree, crosslinks, page-state registry, and generated reader maps exist. | Final public platform may require IA packaging changes after #4. |
| Build answer-engine front door with exact page routing and citations | Satisfied locally | 820/820 exact routes, 32/32 glossary routes, 2/2 refusal routes, 2,884 chunks; local preview/service and staging launch drill passed; live LLM eval passed 42/42. | Production model-backed service still depends on #11 and deploy route #4. |
| Refuse unsupported, unsafe, secret, financial-advice, and out-of-scope questions | Satisfied in current eval contract | `data/llm-rag-contract.json` and `data/answer-validation-report.json` show 15/15 adversarial and 27/27 answer-validation fixtures passing. | Re-run live eval after production deployment wiring. |
| Build living-docs loop: track questions, rate answers, surface gaps | Satisfied locally, not production-ready | SQLite service persists questions/ratings/gaps/cache; Search Insights, moderation export, metrics export, retention, reviewer summary, and backup/restore-check are implemented; staged launch drill recorded answer/rating persistence. | Production deploy, reviewer owner/cadence, backup storage, moderation/metrics access, and #11/#4 remain. |
| Deploy or preview docs site | Preview satisfied; production not satisfied | Local preview is running at `127.0.0.1:8798` with answer service `127.0.0.1:8797`; staging launch gate passed. | Public frontend platform/repo/deploy route #4 and production env #11 are still open. |
| Maintain DECISIONS, SOURCES, STYLEGUIDE, GAPS, QUESTIONS, page manifest, final report | Satisfied for current state | `DECISIONS.md`, `SOURCES.md`, `STYLEGUIDE.md`, `GAPS.md`, `QUESTIONS.md`, `page-manifest.json`, and `FINAL-REPORT.md` exist and are current enough for the latest evidence checks. | Keep them synchronized after #11/#4 change. |
| No secrets leaked | Satisfied by current checks | Local env is not printed; launch/preflight outputs report booleans only; CI is no-secret; sensitive scan runs in `npm run search-book:verify`. | Continue loading LLM creds only via env-file and never commit local DB/env artifacts. |
| Checkpoint and coordinate in shared repo | Satisfied for latest work | `_local/agent-worklog.md` has current entries; recent scoped commits are pushed to `origin/main`; repo is clean after checkpoints. | Continue worklog updates before touching shared files. |

## Completion Blockers

### #11 - Production VPS env

Local LLM credentials are complete, but production readiness needs the service env installed on the VPS. Completion evidence needed:

- `/etc/symmio-search-book/search-book.env` installed with production DB, default mode, origins, LLM settings, retention, metrics/moderation, reviewer, and backup settings.
- `npm run search-book:check-production-env` passes against production-shaped env without printing secret values.

### #4 - Public frontend deploy route

The backend is decided as standalone service plus SQLite, but the public route is not selected. Completion evidence needed:

- Public frontend platform/repo/deploy route selected.
- Static frontend and answer-engine service deployed to that route.
- Production/staging `npm run search-book:smoke-deployment` and `npm run search-book:check-launch` pass against non-local URLs.

## Next Completion-Oriented Actions

1. Use `PRODUCTION-READINESS-PACKET.md` to execute or review the #11 production env install and #4 public deploy-route decision without printing secrets.
2. Review Discord/Lafa question clusters and answer candidates before publishing any exact Discord-derived answer.
3. After any source/runtime/deploy change, run:

```sh
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
git diff --check
```

4. Before final completion, run the full requirement audit again and require `sourceCompletionReady:true`, `completionReady:true`, production launch gate pass, and no open production operator gates.
