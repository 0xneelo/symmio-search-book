# 12 - Search Book To 100 Percent

Date: 2026-07-01

This document is the completion checklist for turning the current Search Book research package, local prototype, and validated RAG runtime into a production-ready public documentation product.

The current state is strong but not complete. The corpus and local answer runtime are substantially built; the remaining work is mostly production deployment, final source ingestion, service environment setup, and operational ownership.

## Current Completion Snapshot

Use these numbers as the baseline until the next regenerated audit supersedes them.

| Area | Current state | Completion read |
| --- | --- | ---: |
| Public compendium shape | 794 manifest pages, inside the 500-800 target | 98% |
| Authored public corpus | 799 authored pages; 798 public routes published; 0 candidates | 95% |
| Source-companion coverage | 792/792 source companions covered by authored pages | 100% |
| Requirement map | 12/18 complete, 2 partial, 4 parked, 0 missing | 67% by raw requirement count; higher by implementation weight |
| Quality audit | 27/30 gates passing | 90% |
| Source ingestion | 13/17 complete, 1 partial, 3 parked | 76% |
| Deterministic answer engine | 798 exact-route tests pass; 2 refusal tests pass | 95% |
| LLM RAG runtime | Live OpenAI `gpt-4.1-mini` eval passed 42/42 | 88% |
| Living-docs loop | SQLite service, ratings, gaps, answer cache, examples, moderation export, summary job, runbook | 78% |
| Discord/Lafa corpus | Tooling exists; imported messages remain 0 | 25% |
| Production deploy | Local static and service smoke paths exist; public platform/deploy route open | 25% |
| Overall production readiness | Verified dossier/runtime, not deployed production docs | About 74% |

## What 100 Percent Means

Search Book reaches 100 percent when all of the following are true:

1. The public site is deployed at the selected production route.
2. The standalone answer service is deployed with production environment variables, retention settings, moderation access, backup/restore policy, and observability.
3. The LLM path is enabled in production with OpenAI-compatible settings and a model/API key installed only in service environment variables.
4. The public frontend routes questions to the service and still degrades gracefully to deterministic/extractive answers when the LLM is unavailable.
5. Every required source family is ingested, explicitly excluded, or launch-parked with visible source-boundary language.
6. Discord/Lafa support reality is imported or explicitly excluded from v1 with an operator-approved release note.
7. The Notion source is ingested with a clear public-use boundary, or explicitly launch-parked.
8. The original/oldest Symmio whitepaper evidence gap is resolved or marked source-limited for launch.
9. SuperFlow/SHE/SSHE terminology is identified or SSHE is explicitly excluded.
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
| #11 Production LLM env | Production `SEARCH_BOOK_LLM_MODEL` and `SEARCH_BOOK_LLM_API_KEY` in the deployed service environment | Production LLM-backed answers | Install env vars without printing secrets; run live production smoke; record model and pass/fail only |
| #4 Platform/repo/deploy route | Final public frontend platform, repo owner, and deploy route | Public production launch | Choose deployment target; wire static frontend and service URL; document rollback |
| #2 Discord/Lafa corpus | Export/API access, channel list/date range, Lafa author identity, public-use boundary | Discord-seeded FAQ and support-reality answers | Run scraper/import; classify quotes/paraphrases/internal-only; regenerate corpus and evals |
| #5 Vibe Notion | Ingestion of provided Notion link plus public-use rule | Roadmap/product narrative source completeness | Export or fetch readable content; register source keys; mark public/paraphrase/internal-only |
| #6 Oldest Symmio whitepaper | Exact original/oldest artifact or archived earliest docs | Origin-story and version-history completeness | Locate artifact, register source, compare to current docs, or mark source-limited |
| #7 SuperFlow/SSHE | Identify SSHE source family or exclude it | Final protocol/source completeness claim | Confirm whether SSHE equals SHE/SuperFlow or is separate; update source map |
| #12 Old checkpoint approval | Approval path for an older design checkpoint commit | Only that historical checkpoint | Resolve separately; does not block current production launch if scoped out |

Completion target: all open inbox items are either `[RESOLVED]` or explicitly accepted as launch-parked in a release decision.

### 2. Source Ingestion To 100 Percent

Current source-ingestion state: 13 complete, 1 partial, 3 parked.

Required actions:

1. Ingest Vibe Notion.
   - Register source key, URL/export path, access date, and publicity boundary.
   - Create or update authored pages only where Notion adds primary product truth.
   - Add refusal boundaries for private roadmap or non-public claims.

2. Resolve Symmio whitepaper history.
   - Locate the oldest official or archived whitepaper artifact.
   - Register version/date/provenance.
   - Update the whitepaper-history boundary page.
   - If the oldest artifact cannot be found, publish the limit explicitly and avoid 2021/original quotes.

3. Resolve SuperFlow/SHE/SSHE.
   - Confirm exact naming and source identity.
   - Do not claim SSHE coverage from name similarity.
   - Either add the missing source family or document operator-approved exclusion.

4. Import Discord/Lafa.
   - Use the existing scraper/import contract.
   - Preserve channel scope, date range, message ids, author mapping, and public-use boundary.
   - Convert repeated questions into FAQ candidates.
   - Convert canonical Lafa answers only when source permission allows.
   - Keep private/support-sensitive material out of public pages unless explicitly approved.

Exit gate:

```sh
node src/search-book/scripts/build-all.mjs --verify
npm run search-book:verify
```

The generated source-ingestion map must report ready, or list only release-accepted parked items.

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
node --env-file=.secrets/search-book.env src/search-book/scripts/run-llm-rag-answer.mjs --mode llm --query "What is Vibe Trading and how do I create an account?" --json
node --env-file=.secrets/search-book.env src/search-book/scripts/run-llm-rag-answer.mjs --mode llm --query "What is the bootstrap trilemma in perpetual markets?" --json
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
node src/search-book/scripts/build-all.mjs --verify
npm run search-book:verify
node src/search-book/scripts/check-readiness-evidence.mjs
node src/search-book/scripts/check-static-integrity.mjs
git diff --check -- src/search-book _specs/app-docs
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
3. Decide whether #2, #5, #6, and #7 are launch-blocking or launch-parked.

Exit:

- No hidden decision remains that changes public IA, source scope, or service architecture.

### Phase C - Complete Source Families

Goal: close the 13/17 source-ingestion gap.

Actions:

1. Discord/Lafa import.
2. Notion ingestion.
3. Oldest Symmio whitepaper source.
4. SuperFlow/SHE/SSHE identification or exclusion.

Exit:

- Source-ingestion map ready, or launch-parked exceptions are explicit.

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

- [ ] All open OPERATOR-INBOX items are resolved or release-accepted as parked.
- [ ] `source-ingestion` is ready or has only accepted launch-parked exceptions.
- [ ] Discord/Lafa import is complete or explicitly excluded from v1.
- [ ] Notion ingestion is complete or explicitly parked.
- [ ] Oldest Symmio whitepaper source is registered or source-limited boundary is approved.
- [ ] SuperFlow/SHE/SSHE identity is resolved or excluded.
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
node src/search-book/scripts/build-all.mjs --verify
npm run search-book:verify
node src/search-book/scripts/check-readiness-evidence.mjs
node src/search-book/scripts/check-static-integrity.mjs
npm run search-book:smoke-static
npm run search-book:smoke-preview-service
npm run search-book:smoke-service
npm run build --if-present
git diff --check -- src/search-book _specs/app-docs
```

For live LLM checks, load secrets only through the local or service environment. Never print the API key.

```sh
node --env-file=.secrets/search-book.env src/search-book/scripts/run-llm-rag-answer.mjs --mode llm --query "What is Vibe Trading and how do I create an account?" --json
node --env-file=.secrets/search-book.env src/search-book/scripts/run-llm-rag-answer.mjs --mode llm --query "What is the bootstrap trilemma in perpetual markets?" --json
```

## Completion Rule

Do not call the Search Book production-ready just because the corpus is large or the local eval is green. It becomes production-ready when the public route, production answer service, production LLM env, source boundaries, living-docs operations, and final claim audit all pass together.

