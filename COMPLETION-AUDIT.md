# Search Book Completion Audit

Date: 2026-07-01

This audit checks the original Search Book objective against the current standalone `symmio-search-book` repository. It is intentionally stricter than a status report: completion is not assumed from green tests alone.

Executable guard: `npm run search-book:check-completion-audit` validates this audit against the original objective-derived requirement rows and current generated evidence. It must keep failing if production completion is claimed before #11 and #4 are resolved.

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
- `data/discord-review-routing.json`: sanitized Discord/Lafa routing summary ready with 24 routed items, 19/19 page-fit groups covered by public route aliases, source-backed triage 19/19 page-fit groups, public-copy ready 19/19 page-fit groups, public-copy review required 0/19 page-fit groups, refusal policy ready 2/2 refusal items, refusal policy review required 0/2 refusal items, 0 single-route groups remaining, and no raw Discord/Lafa/source answer text included.
- `DISCORD-EDITORIAL-QUEUE.md` and `data/discord-editorial-queue.*`: no-raw reviewer queues generated from the sanitized routing summary, listing page-fit and refusal-review work with item ids, page ids, source keys, counts, automated triage status, public-copy readiness status, refusal policy status, refusal reasons, and automated disposition only; current disposition is reviewer-handoff ready with 19/19 page-fit groups keeping existing source-backed public copy, 2/2 refusal items keeping refusal policy, 0 public-copy changes proposed, and 0 exact Discord/Lafa statements promoted. `npm run search-book:check-discord-review-artifacts` validates both against the JSON summary.
- `npm run search-book:check-discord-refusals`: public-safe runtime guardrail check passes for the Discord/Lafa refusal probes with `status:"refusal"`, `refusalReason:"discord-corpus-review-required"`, `gapId:"G-001"`, zero citations, zero answer bytes, no primary page, and no LLM credentials loaded.
- `npm run search-book:check-backup-restore`: no-secret backup/restore evidence passes against a temporary SQLite answer-engine service DB with 4/4 required tables matched, restore `passed`, integrity `ok`, seeded answer/rating/page-feedback counts, and no raw content printed.
- `npm run search-book:check-github-workflows`: no-secret workflow contract guard passes for the four checked workflows, required validator/summary/smoke/artifact commands, read-only permissions, public Vibe docs export fetch, and no secret-loading fragments.
- `npm run search-book:check-living-docs-review`: no-secret living-docs reviewer evidence guard passes by seeding a temporary SQLite service DB, confirming the raw internal summary contains private reviewer values, and emitting only count/boolean evidence with no raw questions, notes, Discord/Lafa text, or token-like values printed.
- `npm run search-book:check-production-packet`: no-secret production-readiness packet guard passes for the #11/#4-only operator boundary, canonical VPS env path, deploy-route decision contract, launch criteria, release checklist, and absence of secret-looking values.
- `data/question-routes.json`: 820 exact routes.
- `data/faq.json`: 822 FAQ entries.
- `data/answer-chunks.json`: 2,884 chunks.
- `data/authored-pages.json`: 801 authored pages.
- `data/page-state-registry.json`: 800 published public-navigation pages, 792 source companions, 3 internal drafts.
- `data/llm-rag-contract.json`: live OpenAI `gpt-4.1-mini` eval passed 42/42 on 2026-07-01.
- `data/living-docs-events.json`: local living-docs service boundary implemented, `livingDocsProductionReady:false`.

Current preview and release evidence:

- Static preview: `http://127.0.0.1:8798/?service=http%3A%2F%2F127.0.0.1%3A8797&serviceMode=extractive`.
- Answer-engine service: `http://127.0.0.1:8797`.
- Staging launch drill: passed with 13 checks, 0 failures, and 3 staging warnings for reviewer owner, review cadence, and backup storage assignment.
- Latest manual GitHub evidence: launch evidence run `28542337456` and release dry-run run `28542339354` passed from commit `d021ecf`. Downloaded artifacts at `/tmp/search-book-gh-manual-launch-28542337456` and `/tmp/search-book-gh-manual-release-28542339354` passed strict summary validation with `npm run search-book:check-launch-evidence-packet -- --require-summary` and `npm run search-book:check-release-dry-run-packet -- --require-summary`. Both summary artifacts carry repository commit `d021ecf`, dirty `false`, `Discord editorial queue data | passed`, `Discord editorial disposition | ready true (keep-copy 19/19; keep-refusal 2/2; copy changes 0; promoted 0)`, `Discord reviewer workflow | ready ready (4 phases; page-fit 19; refusals 2; copy changes allowed 0; exact promotions allowed 0)`, `Open operator Linear tasks | #4=SYN-285, #11=SYN-281`, and `Secrets printed | false`; release evidence also reports sensitive matches `0`, source ingestion `17/17`, `productionReadinessPacket:passed`, 93 syntax checks, and only #11/#4 open.
- Earlier local clean no-secret release dry run: `/tmp/search-book-release-dry-run-discord-editorial-data-20260701-1` passed from commit `a50a837` with release and nested launch repository dirty state `false` from the same commit, static artifact integrity, launch evidence, monitoring evidence, source-freshness evidence `4/4`, status-document evidence `4/4`, production-readiness packet verify evidence `productionReadinessPacket:passed`, Discord review-artifact evidence `passed`, source-backed triage 19/19 page-fit groups, public-copy ready 19/19 page-fit groups, public-copy review required 0/19 page-fit groups, refusal policy ready 2/2 refusal items, refusal policy review required 0/2 refusal items, Discord editorial queue data evidence `passed` with 24 routed items, 19 page-fit groups, 2 refusal-review items, `queueReady:true`, 0 raw-key hits, 0 sample leaks, and `valuesPrinted:false`, Discord refusal-runtime evidence `passed` with 2/2 probes refused as `discord-corpus-review-required` / `G-001`, zero citations, zero answer bytes, no primary page, and no loaded LLM credentials, publication-boundary evidence `passed`, backup-restore evidence `passed`, living-docs review evidence `passed`, evidence summary renderer evidence `passed`, `valuesPrinted:false`, and 0 sensitive-pattern matches. The checked-in validators `npm run search-book:check-launch-evidence-packet` and `npm run search-book:check-release-dry-run-packet` now assert clean repository state, same commit, nested status evidence, original-spec reconciliation evidence for source ingestion `17/17` and open ids #4/#11, Discord review-artifact evidence, source-backed Discord triage, public-copy readiness, refusal-policy readiness, Discord editorial queue data evidence, Discord refusal-runtime evidence, publication-boundary evidence, backup-restore evidence, living-docs review evidence, and evidence-summary renderer proof. `npm run search-book:check-discord-review-artifacts` passed against the committed Search Insights summary and the local `/tmp` Discord review/routing packets without printing excerpts.

## Requirement Audit

| Requirement | Status | Evidence | Remaining Work |
| --- | --- | --- | --- |
| Read and follow `_specs/app-docs/01-09` plus pasted objective | Satisfied for current repo state | Specs are carried in `_specs/app-docs/`; generated corpus and reports align to the 500-800 page mission, answer-engine front door, living-docs loop, and design-reference shape. | Keep re-reading before new phases. |
| Build a 500-800 page cited compendium | Satisfied for preview | 794 manifest pages, 801 authored pages, 800 published public-navigation pages, 792 source companions, 0 candidate review pages; `npm run search-book:check-publication-boundaries` passes. | Keep re-running the publication-boundary gate as sources and routes change. |
| Include manifesto and full Symmio/Vibe reference | Satisfied for preview | `data/authored-pages.json` spans manifesto, product-reference, rewards-referrals, dashboard-reference, protocol-reference, answer-engine, reference, solver-reference, competitive-context, and compendium sections. | Maintain source boundaries as new inputs land. |
| Cover revenue, volume, points, vibe-points, referrals, and every dashboard view | Satisfied for preview | Dashboard-reference section has 13 pages; operator-approved Phase A revenue and 15-level referral stance are reflected in generated routes and reports. | Keep Phase B economics refusing until public source/decision boundary changes. |
| Primary-source traceability and contradiction reconciliation | Satisfied for preview | `SOURCES.md`, `GAPS.md`, source catalog, source-ingestion map, and requirement map are generated/maintained; Notion, SSHE, whitepaper v1 boundary, referral-depth, revenue, Opyn, Add Token Info, and Discord/Lafa import are reconciled. | Keep specific Discord/Lafa claims under editorial review before public quotation. |
| Mine Symmio Discord and Lafa answers into FAQ/answer-engine seed | Satisfied for seed corpus; exact-claim review remains | `scripts/build-discord-corpus.mjs` imported the real export in internal-only mode; `data/discord-corpus.json` reports 5,000 messages, 723 question clusters, 837 configured Lafa candidates, and `corpusReady:true`; `DISCORD-EDITORIAL-QUEUE.md` gives reviewers a no-raw page-fit/refusal queue from the sanitized routing summary with source-backed triage 19/19 page-fit groups, public-copy ready 19/19 page-fit groups, public-copy review required 0/19 page-fit groups, refusal policy ready 2/2 refusal items, refusal policy review required 0/2 refusal items, and disposition evidence that proposes 0 public-copy changes and promotes 0 exact Discord/Lafa statements. | Review local raw packets before any future public paraphrase; current committed disposition keeps existing public copy/refusals. |
| Run competitive sweep over top crypto/docs references | Satisfied for v1 benchmark | `data/competitive-sweep.json` tracks 25 lanes, 50 targets, 49 reviewed, Opyn excluded by operator decision. | Future benchmark refresh can replace Opyn lane if needed. |
| Maintain one IA and one style guide | Satisfied for preview | `STYLEGUIDE.md`, volume map, navigation tree, crosslinks, page-state registry, and generated reader maps exist. | Final public platform may require IA packaging changes after #4. |
| Build answer-engine front door with exact page routing and citations | Satisfied locally | 820/820 exact routes, 32/32 glossary routes, 2/2 refusal routes, 2,884 chunks; local preview/service and staging launch drill passed; live LLM eval passed 42/42. | Production model-backed service still depends on #11 and deploy route #4. |
| Refuse unsupported, unsafe, secret, financial-advice, and out-of-scope questions | Satisfied in current eval contract | `data/llm-rag-contract.json` and `data/answer-validation-report.json` show 15/15 adversarial and 27/27 answer-validation fixtures passing. | Re-run live eval after production deployment wiring. |
| Build living-docs loop: track questions, rate answers, surface gaps | Satisfied locally, not production-ready | SQLite service persists questions/ratings/gaps/cache; Search Insights, moderation export, metrics export, retention, reviewer summary, CI-safe living-docs reviewer evidence, launch/release packet reviewer evidence, backup/restore-check, and CI-safe backup-restore evidence are implemented; staged launch drill recorded answer/rating persistence. | Production deploy, reviewer owner/cadence, backup storage, moderation/metrics access, and #11/#4 remain. |
| Deploy or preview docs site | Preview satisfied; production not satisfied | Local preview is running at `127.0.0.1:8798` with answer service `127.0.0.1:8797`; staging launch gate passed. | Public frontend platform/repo/deploy route #4 and production env #11 are still open. |
| Maintain DECISIONS, SOURCES, STYLEGUIDE, GAPS, QUESTIONS, page manifest, final report | Satisfied for current state | `DECISIONS.md`, `SOURCES.md`, `STYLEGUIDE.md`, `GAPS.md`, `QUESTIONS.md`, `page-manifest.json`, and `FINAL-REPORT.md` exist and are current enough for the latest evidence checks. | Keep them synchronized after #11/#4 change. |
| No secrets leaked | Satisfied by current checks | Local env is not printed; launch/preflight outputs report booleans only; CI is no-secret and covered by `npm run search-book:check-github-workflows`; reviewer evidence is count-only via `npm run search-book:check-living-docs-review`; the operator packet is no-secret via `npm run search-book:check-production-packet`; sensitive scan runs in `npm run search-book:verify`. | Continue loading LLM creds only via env-file and never commit local DB/env artifacts. |
| Checkpoint and coordinate in shared repo | Satisfied for latest work | `_local/agent-worklog.md` has current entries; recent scoped commits are pushed to `origin/main`; repo is clean after checkpoints. | Continue worklog updates before touching shared files. |

## Completion Blockers

### #11 - Production VPS env

Local LLM credentials are complete, but production readiness needs the service env installed on the VPS. Completion evidence needed:

- `/etc/symmio-search-book/search-book.env` installed with production DB, default mode, origins, LLM settings, retention, metrics/moderation, reviewer, and backup settings.
- `npm run search-book:check-production-env` passes against production-shaped env without printing secret values.
- `npm run search-book:check-production-packet` stays green before and after the install handoff.

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
npm run search-book:check-completion-audit
node scripts/check-readiness-evidence.mjs
git diff --check
```

4. Before final completion, run the full requirement audit again and require `sourceCompletionReady:true`, `completionReady:true`, production launch gate pass, and no open production operator gates.
