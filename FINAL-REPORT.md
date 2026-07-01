# Search Book Final Report

Generated for the standalone `symmio-search-book` repository on 2026-06-30 and refreshed on 2026-07-01 after the migration to `main`. This report is intentionally explicit about remaining production work: the Search Book dossier, prototype, and answer runtime are verified, but the overall mission is not production-complete until the parked source and deploy decisions are resolved or carried into an approved release plan.

## Current Status

The Search Book now has a 500-800 page compendium shape with 794 manifest pages, 799 authored pages, 8 volumes, 104 chapters, and 1,593 reader-routable pages assigned to volumes. All 798 public authored routes are marked `published`; there are 0 candidate pages remaining. The generated corpus stays inside the requested 500-800 page target while the reader layer includes authored pages plus source companions for traceability.

The authored layer now covers every generated source companion: `data/publication-plan.*` reports 792 source companions queued, 792 covered by authored pages, 0 needing authored coverage, and 0 candidate pages still in the review queue. The remaining candidate review lanes are 0 final-review-ready pages, 0 operator-review pages, 0 source-refresh pages, 0 publication-date-review pages, and 0 editorial-review pages. Source companions remain retrieval and traceability material, not public navigation pages.

The answer-engine front door is implemented as a static prototype plus a shared runtime and standalone SQLite-backed service boundary. The deterministic route map has 798 exact question routes, 32 glossary routes, 2 refusal routes, 2,878 retrieval chunks, and 800 local FAQ entries. The static prototype can be opened directly at `index.html` from the standalone repo root or served locally with `npm run search-book:serve-static`; `npm run search-book:check-static` verifies local script dependencies, expected `window.SearchBook*` data globals, static page links, and public reader-data coverage, while `npm run search-book:smoke-static` proves the Ask front door, exact-page URL, generated data assets, and missing-route 404 behavior over localhost. The service can be run locally with `SEARCH_BOOK_ANSWER_ENGINE_DB=/tmp/search-book-answer-engine.sqlite node scripts/serve-answer-engine.mjs` and connected with `index.html?service=http://127.0.0.1:8787`. The local smoke command `npm run search-book:smoke-service` proves service health, extractive answer persistence, rating persistence, helpful answer-cache population, paraphrase reuse as `source:"reuse-cache"`, optional dynamic examples from helpful cached questions, Search Insights, guardrail refusal ordering, token-gated moderation export, and the internal reviewer gap-summary job against a temporary SQLite database. `npm run search-book:backup-db` creates a SQLite-consistent answer-engine backup manifest and verifies restore viability. `npm run search-book:check-production-env` fails closed until production service env, LLM env, safe CORS, reviewer owner/cadence, metrics token, and backup storage are configured without printing secret values. `npm run search-book:smoke-deployment` is the URL-driven preview/staging/production smoke: read-only by default for static assets and service health/CORS/Search Insights, with explicit `--write` required before creating one answer event plus rating. `npm run search-book:check-launch` is the executable production/staging launch gate, composing production env preflight, deterministic verify, deployment smoke, reviewer owner/cadence evidence, backup-storage evidence, and unresolved completion-boundary checks without printing secret values. `LIVING-DOCS-OPERATIONS.md` documents the internal daily/weekly reviewer workflow, moderation export handling, backup handling, privacy boundaries, launch gate, and incident response. The combined `npm run search-book:smoke-preview-service` command starts both localhost services, checks the preview-to-service CORS bridge, and verifies service-backed ask, rating, Search Insights, and exact-page URLs without live LLM calls.

The standalone repository now has a no-secret GitHub Actions gate at `.github/workflows/search-book-verify.yml`. On `main` pushes and pull requests it clones the public `0xneelo/vibe_docs` export into `/tmp/vibe_docs`, then runs `npm run search-book:verify`, `npm run search-book:smoke-static`, `npm run search-book:smoke-service`, and `npm run search-book:smoke-preview-service` without loading LLM credentials, production env files, moderation tokens, metrics tokens, or Discord tokens.

The live OpenAI-compatible RAG runtime passed the current recorded SYN-215 eval with `gpt-4.1-mini`: 42/42 total cases, 15/15 adversarial refusals, and 27/27 answer-validation fixtures. Measured usage was 16 calls, 93,868 input tokens, 8,615 output tokens, and an estimated cost of `$0.01924920` at the recorded `gpt-4.1-mini` pricing. This is runtime evidence, not a deployed-service readiness claim.

Quality status is still intentionally not green for launch. The latest audit passes 27/30 gates. The failing gates are required-source ingestion, operator inbox, and Discord/Lafa corpus import. The regenerated definition-of-done map now marks the public manifesto/reference corpus complete and reports 12/18 requirements complete, 2 partial, 4 parked, and 0 missing. It remains not completion-ready because production deployment, source-traceability inputs, and Discord/Lafa ingestion are still partial or parked.

## Verification Evidence

Use these commands as the current reproducible verification path:

```sh
node scripts/build-all.mjs --verify
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
node scripts/check-static-integrity.mjs
node --check scripts/backup-answer-engine-db.mjs
node scripts/run-llm-rag-answer.mjs --mode extractive --query "Which dashboard views are documented?" --json
npm run search-book:smoke-static
npm run search-book:smoke-preview-service
npm run search-book:smoke-service
npm run search-book:smoke-deployment -- --site-url http://127.0.0.1:<preview-port> --service-url http://127.0.0.1:<service-port> --write
npm run search-book:check-launch -- --profile staging --allow-local --site-url http://127.0.0.1:<preview-port> --service-url http://127.0.0.1:<service-port> --mode extractive --skip-production-env --run-verify
git diff --check
npm run build --if-present
```

The canonical build verifies 24 deterministic build steps, 63 syntax checks, exact-route integrity, FAQ routing, answer chunks, authored-page indexing, requirement coverage, quality-audit gates, readiness-evidence consistency against `data/llm-rag-contract.json`, static app integrity, living-docs summary and backup utility presence, and the native sensitive-pattern scan. Live LLM evaluation is not part of every deterministic rebuild because it requires private service credentials and must never print the API key; its latest recorded result is stored in `data/llm-rag-contract.json`.

## Requirement Summary

| Area | Current evidence | Release status |
| --- | --- | --- |
| Page target | 794 manifest pages against the 500-800 target | Verified for dossier/prototype |
| Authored layer | 799 authored pages across manifesto, product, rewards, dashboard, protocol, answer-engine, glossary, and compendium sections; 798 published public routes; 0 candidate pages; 792/792 source companions covered by authored pages; 0 candidate pages ready for final review or operator review | Published corpus verified; requirement map marks manifesto/reference complete; remaining work is source/deploy/ops readiness |
| Dashboard reference | 13 dashboard-reference pages, including every visible dashboard route plus hidden `#revenue` route | Published with Phase A, referral-depth, volume-source, and Discord/deploy boundaries preserved |
| Answer engine | 798/798 exact routes, 32/32 glossary routes, 2/2 refusal routes | Deterministic runtime verified |
| LLM RAG | 42/42 live eval on `gpt-4.1-mini` | Runtime verified; production env/deploy still parked |
| Living docs | 12/12 event fixtures, SQLite service, frontend bridge, retention policy, helpful answer-cache reuse, dynamic examples endpoint, gated moderation export, internal reviewer summary job, backup/restore-check utility, and `LIVING-DOCS-OPERATIONS.md` | Implemented locally; production deploy/access/owner cadence still parked |
| Source ingestion | 13/17 complete, 1 partial, 3 parked | Not source-complete |
| Competitive sweep | 49/50 official docs verified; Opyn excluded | Accepted benchmark baseline |
| Deploy preview | Static local prototype exists with `npm run search-book:serve-static`, static integrity via `npm run search-book:check-static`, static smoke via `npm run search-book:smoke-static`, and combined `npm run search-book:smoke-preview-service` localhost evidence | Production deploy route parked |

## Remaining Production Work

The following open operator items are the current production boundary. They are not re-asked here; this report records them so the next operator or agent can resume from `_specs/app-docs/OPERATOR-INBOX.md`.

- OPERATOR-INBOX #12: checkpoint commit approval timed out for an older fifteenth-pass design checkpoint. This does not block the committed Search Book content/runtime work, but it blocks that specific design checkpoint history.
- OPERATOR-INBOX #11: production service environment still needs the deployed `SEARCH_BOOK_LLM_MODEL` and `SEARCH_BOOK_LLM_API_KEY`; local live eval credentials exist separately and must not be printed.
- OPERATOR-INBOX #7: SuperFlow/SHE is registered, but SSHE remains unidentified or unexcluded for final source-completeness claims.
- OPERATOR-INBOX #6: the exact original/oldest Symmio whitepaper or archived earliest-docs artifact is still needed for the origin-story comparison.
- OPERATOR-INBOX #5: the Vibe Trading Notion link is known, but ingestion and public-use boundaries are still pending.
- OPERATOR-INBOX #4: the public frontend platform, repository owner, and deploy route are still undecided; backend architecture is decided as a standalone service plus SQLite.
- OPERATOR-INBOX #2: Discord export/API access, channel scope, Lafa identity mapping, and public-use boundary are still needed for the Discord-seeded FAQ.

Until those items move, the Search Book should be described as a verified research dossier, static prototype, and answer-engine runtime, not as the final deployed production docs site.

## Handoff Notes

Keep edits scoped because this standalone repository is shared by multiple agents. Before each new Search Book phase, read `_local/agent-worklog.md`, `_specs/app-docs/OPERATOR-INBOX.md`, and the pasted objective at `/home/tabor/.codex/attachments/4632c9a8-89bd-47cd-9f2b-514b80548daa/pasted-text-1.txt`.

The next highest-value production work is to resolve or ingest the parked source families when operator input arrives, then deploy the static frontend plus standalone service behind the selected public route. After any source-corpus change, rerun `node scripts/build-all.mjs --verify` or `npm run search-book:verify`; after any prompt/runtime/deploy change, rerun the live LLM eval with the service credentials loaded through `--env-file` without printing secrets.
