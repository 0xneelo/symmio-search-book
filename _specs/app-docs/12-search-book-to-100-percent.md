# 12 - Search Book To 100 Percent

Date: 2026-07-01

This document is the completion checklist for turning the current Search Book research package, local prototype, and validated RAG runtime into a production-ready public documentation product.

The current state is strong but not complete. The corpus, source ingestion, local answer runtime, live-evaled RAG path, and no-secret release rehearsal are substantially built; the remaining work is production deployment, production service environment installation, final public route selection, and operational ownership.

## Current Completion Snapshot

Use these numbers as the baseline until the next regenerated audit supersedes them.

| Area | Current state | Completion read |
| --- | --- | ---: |
| Public compendium shape | 794 manifest pages, inside the 500-800 target | 98% |
| Authored public corpus | 801 authored pages; 800 public-navigation pages; 820 exact public question routes; 0 candidates | 95% |
| Source-companion coverage | 792/792 source companions covered by authored pages | 100% |
| Requirement map | 14/18 complete, 2 partial, 2 parked, 0 missing | 78% by raw requirement count; higher by implementation weight |
| Quality audit | 29/30 gates passing; only `operator-inbox` remains red | 97% |
| Source ingestion | 17/17 complete, 0 partial, 0 parked, 0 missing | 100% |
| Deterministic answer engine | 820 exact-route tests pass; 32 glossary route tests pass; 2 refusal tests pass | 95% |
| LLM RAG runtime | Live OpenAI `gpt-4.1-mini` eval passed 42/42 | 88% |
| Living-docs loop | SQLite service, ratings, gaps, answer cache, examples, moderation export, metrics, backup/restore-check, summary job, runbook | 85% |
| Discord/Lafa corpus | Imported internal-only: 5,000 messages, 723 question clusters, 837 configured Lafa candidates; checked-in data stores no raw Discord/Lafa text | 100% for v1 demand evidence |
| Production deploy | Local static and service smoke paths exist; public platform/deploy route open | 25% |
| Overall production readiness | Verified dossier/runtime/source corpus, not deployed production docs | About 82% |

## What 100 Percent Means

Search Book reaches 100 percent when all of the following are true:

1. The public site is deployed at the selected production route.
2. The standalone answer service is deployed with production environment variables, retention settings, moderation access, backup/restore policy, and observability.
3. The LLM path is enabled in production with OpenAI-compatible settings and a model/API key installed only in service environment variables.
4. The public frontend routes questions to the service and still degrades gracefully to deterministic/extractive answers when the LLM is unavailable.
5. Every required source family remains ingested, explicitly excluded, or source-limited with visible source-boundary language.
6. Discord/Lafa support reality remains internal-only demand evidence unless a future editorial review creates a public source-backed page.
7. The Notion source remains registered with its paraphrase-only public-use boundary.
8. The original/oldest Symmio whitepaper remains out of scope for v1 and is not used for exact launch claims.
9. SuperFlow/SHE/SSHE remains bounded to the operator-provided SHE API plus Symmio Foundation meta-solver/clearing-layer context.
10. The living-docs reviewer workflow has a named owner, cadence, and escalation path.
11. Final publication-date checks pass for links, citations, volatile market counts, security/audit wording, revenue/referral wording, and no-secret scans.
12. All generated readiness evidence says production-ready, or any intentionally parked item is accepted in a release decision.

## Do Not Rebuild What Is Already Done

The following should be treated as done unless a new source or operator decision changes the facts:

- The 500-800 page compendium target.
- Publication of the authored corpus.
- Source-companion coverage by authored pages.
- Volume/chapter orientation, previous/next links, related links, and glossary routing.
- Phase A public revenue formula: `networkVolume x platformFeeRate x referrerPlatformShare`.
- Phase A defaults: `0.05%` / `5 bps` platform fee and `30%` referrer platform share.
- Referral depth: public depth is 15 levels; historical backfill is additive and never lowers a balance.
- Opyn competitive sweep exclusion for v1.
- Deterministic answer engine exact-route/refusal contract.
- Live `gpt-4.1-mini` RAG runtime proof on the recorded eval.
- SQLite-backed service boundary for questions, ratings, gaps, answer-cache reuse, dynamic examples, moderation export, and reviewer summary.

## Remaining Work By Subtopic

### 1. Operator Inbox Closure

Current open items:

| Inbox item | What is missing | What it blocks | Completion action |
| --- | --- | --- | --- |
| #11 Production LLM/service env | Complete production service env installed at `/etc/symmio-search-book/search-book.env`; local `.secrets/search-book.env` is complete and must not be reported missing | Production LLM-backed answers, production prompt-injection execution against live model responses, and production launch preflight | Install env vars without printing secrets; run production env preflight and live production smoke; record model and pass/fail only |
| #4 Platform/repo/deploy route | Final public frontend platform, repo owner, and deploy route | Public production launch | Choose deployment target; wire static frontend and service URL; document rollback |

Resolved reconciliation items #2, #5, #6, #7, #12, and #17 must not be re-opened. Completion target: #11 and #4 are either `[RESOLVED]` or explicitly accepted as launch-parked in a release decision.

### 2. Source Ingestion To 100 Percent

Current source-ingestion state: 17 complete, 0 partial, 0 parked, 0 missing. `sourceCompletionReady` is true.

Required maintenance boundaries:

1. Vibe Notion is registered with a paraphrase-only public-use boundary.
   - Do not publish signed-media/static commercial details from Notion unless a later operator decision explicitly approves them.
   - Add authored pages only where Notion adds source-backed public product truth.

2. Symmio original/oldest whitepaper recovery is out of scope for v1.
   - Do not claim exact oldest-whitepaper provenance unless a future source is registered.
   - Use current official Symmio/docs/GitHub boundaries for launch claims.

3. SuperFlow/SHE/SSHE is bounded for v1.
   - Treat the operator-provided SHE OpenAPI source plus Symmio Foundation meta-solver/clearing-layer context as sufficient for v1.
   - Do not invent a separate SSHE claim unless a future source identifies it.

4. Discord/Lafa is imported internal-only.
   - Preserve the no-raw checked-in data boundary: no raw Discord questions, raw Lafa answers, normalized message bodies, or generated answer text in public static data.
   - Use Discord routing only as demand evidence and editorial queue input unless future public-source review creates a cited page.
   - Keep the two public-safe Discord/Lafa refusal probes refusing with `discord-corpus-review-required` until that review changes.

Exit gate:

```sh
node scripts/build-all.mjs --verify
npm run search-book:verify
```

The generated source-ingestion map must continue reporting `17/17` complete with 0 partial, 0 parked, and 0 missing; Discord review and refusal-runtime guards must remain green.

### 3. Production LLM And Answer Service

Current status: runtime is implemented and live-evaled, but production service env is not installed.

Required actions:

1. Set service environment variables:

```sh
SEARCH_BOOK_LLM_API_STYLE=openai-compatible
SEARCH_BOOK_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
SEARCH_BOOK_LLM_MODEL=<approved-production-model>
SEARCH_BOOK_LLM_API_KEY=<service-secret-only>
SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true
SEARCH_BOOK_ANSWER_ENGINE_DB=<persistent-sqlite-path>
SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS=180
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT=false
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN=<service-secret-only>
```

2. Confirm runtime behavior:
   - LLM answers are default when configured.
   - Limited mode appears when the LLM is unavailable.
   - Deterministic/extractive fallback still returns cited answers.
   - Guardrails still refuse before cache or LLM synthesis.
   - API keys are never logged, persisted, committed, or sent to the frontend.

3. Run live eval against production-like env:

```sh
node --env-file=.secrets/search-book.env scripts/run-llm-rag-answer.mjs --mode llm --query "What is Vibe Trading and how do I create an account?" --json
node --env-file=.secrets/search-book.env scripts/run-llm-rag-answer.mjs --mode llm --query "What is the bootstrap trilemma in perpetual markets?" --json
```

4. Run the full live fixture suite if available in the current checkout.

Exit gate:

- Named probes return `status:"answered"` with valid citations.
- Adversarial fixtures still refuse secrets, prompt injection, missing-source families, internal drafts, financial advice, and Phase B economics.
- Revenue/referral fixtures answer with the approved Phase A and 15-level language.
- Measured tokens/cost are recorded without printing secrets.

### 4. Production Frontend Deployment

Current status: static prototype and localhost service bridge work; public route is undecided.

Required actions:

1. Choose public platform and repository owner.
   - Recommended default remains custom docs app / Next or Fumadocs-style frontend plus owned answer service.
   - Hosted docs platform is acceptable only if the owned answer telemetry and service remain authoritative.

2. Configure frontend service URL.
   - Public frontend must call the answer service through an allowed route.
   - Service URL must not expose secrets.
   - CORS must allow only intended origins.

3. Preserve static fallback.
   - If service is down, readers should still navigate exact pages and deterministic local data.
   - The limited-mode banner should explain degraded answering without exposing internals.

4. Add deploy smoke.
   - Health endpoint.
   - Ask question.
   - Rate answer.
   - Search Insights.
   - Exact page route.
   - Missing route / 404.
   - CORS preflight.

Exit gate:

```sh
npm run search-book:check-static
npm run search-book:smoke-static
npm run search-book:smoke-preview-service
npm run search-book:smoke-service
```

Then repeat equivalent checks against the public preview URL.

### 5. Living Docs Operations

Current status: event model, SQLite persistence, answer cache, dynamic examples, moderation export, summary job, and runbook exist locally. Production owner/cadence is still missing.

Required actions:

1. Assign owner.
   - Primary reviewer.
   - Backup reviewer.
   - Escalation contact for source/operator decisions.

2. Set cadence.
   - Daily Search Insights triage during launch.
   - Weekly summary review.
   - Monthly source and stale-claim audit.

3. Configure production moderation access.
   - Token stored only in service env.
   - Export disabled by default unless operationally needed.
   - Raw user questions treated as internal data.

4. Define retention and deletion process.
   - Default retention is 180 days unless changed.
   - Document how to purge records and rotate moderation token.

5. Connect feedback loop to docs work.
   - Low-rated answers create review tasks.
   - Repeated unanswered questions become gap candidates.
   - Approved improvements regenerate corpus and evals.

Exit gate:

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=<production-or-staging-db> npm run search-book:living-docs-summary -- --format markdown --limit 20
```

The team must be able to run the summary, decide actions, and update docs without exposing private user text publicly.

### 6. Final Content And Claim Audit

Current status: content is published, but volatile claims need publication-date checks.

Required actions:

1. Verify volatile market counts.
   - Vibe market count.
   - Leverage statements.
   - Chain/venue/product availability.
   - Any "coming soon" claims.

2. Verify security/audit wording.
   - No risk-free language.
   - No unsupported audit guarantee.
   - No guarantee of solver, liquidation, withdrawal, or contract safety.

3. Verify economics/referral wording.
   - Phase A only for v1 public revenue.
   - Phase B refused or clearly out of scope.
   - Referral depth is 15 levels.
   - Backfill is additive and never lowers a balance.
   - Public TGE settlement formula remains deferred/not public.

4. Verify source citations.
   - Every public page has source keys and source URLs.
   - No internal draft enters answer synthesis.
   - Source companions remain retrieval/traceability, not public navigation.

5. Verify no secrets.
   - No API keys.
   - No private endpoints.
   - No treasury/payment details that should route to live app forms.
   - No moderation token in frontend code.

Exit gate:

```sh
node scripts/build-all.mjs --verify
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
node scripts/check-static-integrity.mjs
git diff --check
```

### 7. Production Observability And Recovery

Current status: local smokes prove behavior; production observability and recovery are not fully documented as complete.

Required actions:

1. Health checks.
   - `/health` reachable.
   - Database path writable.
   - LLM configured status visible without exposing key.
   - Limited mode reported when provider is unavailable.

2. Logs.
   - Request id.
   - Mode: llm, extractive, limited, reuse-cache, refusal.
   - Status and refusal reason.
   - Validation retries.
   - Token/cost totals.
   - No raw secrets.

3. Backups.
   - SQLite backup cadence.
   - Restore test.
   - Retention purge test.

4. Rollback.
   - Static frontend rollback path.
   - Service rollback path.
   - Env rollback path.
   - Database migration rollback or forward-fix policy.

5. Rate limiting and abuse.
   - Confirm configured public limits.
   - Confirm guardrails execute before costly model calls where possible.
   - Confirm rate-limited LLM path does not break deterministic fallback policy.

Exit gate:

- Staging incident drill completed.
- Backup restore proven.
- Rollback path documented.
- Abuse and rate-limit behavior verified.

## Suggested Completion Sequence

### Phase A - Freeze The Current Baseline

Goal: start from a clean, known checkpoint.

Actions:

1. Finish or park any active local Search Book work.
2. Commit only scoped verified changes.
3. Re-run deterministic verification.
4. Record baseline commit and audit counts.

Exit:

- Search Book worktree is clean except unrelated known WIP.
- Requirement map and quality audit reflect the same baseline.

### Phase B - Resolve Release Decisions

Goal: remove ambiguity before deployment work.

Actions:

1. Resolve OPERATOR-INBOX #4 for platform/repo/deploy route.
2. Resolve OPERATOR-INBOX #11 for production LLM service env.
3. Re-read OPERATOR-INBOX before deployment work and confirm no resolved reconciliation item has been re-opened.

Exit:

- No hidden decision remains that changes public IA, source scope, or service architecture.

### Phase C - Preserve Source Boundaries

Goal: keep the 17/17 source-ingestion state true through deployment.

Actions:

1. Re-run deterministic verify after any source/doc changes.
2. Confirm Discord/Lafa checked-in data remains no-raw and internal-only.
3. Confirm Notion-derived content remains paraphrase-only unless a later operator decision changes the boundary.
4. Confirm oldest-whitepaper and SSHE pages do not claim unsupported provenance.

Exit:

- Source-ingestion map remains ready, with 17/17 complete and 0 partial/parked/missing.

### Phase D - Deploy Staging

Goal: prove the production shape before public launch.

Actions:

1. Deploy frontend preview.
2. Deploy answer service with staging DB.
3. Configure service URL and CORS.
4. Install non-production moderation token.
5. Run static, service, bridge, and live LLM smokes.

Exit:

- Staging behaves like production with no secret leakage.

### Phase E - Final Live Eval And Claim Audit

Goal: prove answer quality and public claim boundaries.

Actions:

1. Run live LLM eval.
2. Run deterministic verify.
3. Run final link/source checks.
4. Re-fetch volatile public product counts.
5. Review security/economics/referral pages.

Exit:

- 100% displayed LLM answers have valid citations.
- Adversarial fixtures pass.
- Unsupported questions refuse and create gap signals.

### Phase F - Production Launch

Goal: ship with rollback and operations ready.

Actions:

1. Deploy frontend to public route.
2. Deploy service with production DB.
3. Install production LLM model/API key in service env.
4. Enable monitoring and backups.
5. Assign reviewer owner/cadence.
6. Run public production smoke.

Exit:

- Public URL works.
- Answer service works.
- Ratings and Search Insights persist.
- Living-docs summary can be run internally.
- Rollback path is documented and tested.

## Final 100 Percent Checklist

Mark each item only when verified.

- [ ] OPERATOR-INBOX #11 and #4 are resolved or release-accepted as parked.
- [x] `source-ingestion` is ready with 17/17 complete and 0 partial/parked/missing.
- [x] Discord/Lafa import is complete for internal-only v1 demand evidence.
- [x] Notion ingestion is complete with a paraphrase-only boundary.
- [x] Oldest Symmio whitepaper recovery is source-limited/out of scope for v1 and not a launch blocker.
- [x] SuperFlow/SHE/SSHE identity is bounded for v1 by the operator-provided SHE/Symmio Foundation sources.
- [ ] Production frontend platform, repo, and route are selected.
- [ ] Public frontend is deployed.
- [ ] Answer service is deployed.
- [ ] Production SQLite path is persistent and backed up.
- [ ] Production LLM env is installed without exposing secrets.
- [ ] Production CORS allows only intended origins.
- [ ] Moderation export is disabled by default or protected by service-only token.
- [ ] Reviewer owner and backup are assigned.
- [ ] Daily/weekly living-docs cadence is accepted.
- [ ] Public launch smoke passes.
- [ ] Deterministic verification passes.
- [ ] Static integrity check passes.
- [ ] Service smoke passes.
- [ ] Preview/service bridge smoke passes.
- [ ] Live LLM eval passes.
- [ ] Adversarial refusal suite passes.
- [ ] Citation validator passes without weakening.
- [ ] Publication-date volatile claims are refreshed.
- [ ] Security, audit, revenue, referral, TGE, and points wording are reviewed.
- [ ] No secrets or private endpoints are present in public files.
- [ ] Rollback path is documented and tested.
- [ ] Final report says production-ready, or names only accepted launch-parked exceptions.

## Commands To Keep As The Release Verification Block

Run from the repository root.

```sh
node scripts/build-all.mjs --verify
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
node scripts/check-static-integrity.mjs
npm run search-book:smoke-static
npm run search-book:smoke-preview-service
npm run search-book:smoke-service
npm run build --if-present
git diff --check
```

For live LLM checks, load secrets only through the local or service environment. Never print the API key.

```sh
node --env-file=.secrets/search-book.env scripts/run-llm-rag-answer.mjs --mode llm --query "What is Vibe Trading and how do I create an account?" --json
node --env-file=.secrets/search-book.env scripts/run-llm-rag-answer.mjs --mode llm --query "What is the bootstrap trilemma in perpetual markets?" --json
```

## Completion Rule

Do not call the Search Book production-ready just because the corpus is large or the local eval is green. It becomes production-ready when the public route, production answer service, production LLM env, source boundaries, living-docs operations, and final claim audit all pass together.
