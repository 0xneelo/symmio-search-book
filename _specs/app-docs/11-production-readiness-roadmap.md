# 11 - Production Readiness Roadmap

Date: 2026-06-28

Updated: 2026-07-01 after the OpenAI-backed RAG runtime, current live `gpt-4.1-mini` eval refresh, Discord/Lafa ingestion-tooling checkpoint, operator publication decisions, the completed publication-lane checkpoints, requirement-map publication-state alignment, and source-blocker reconciliation.

This roadmap turns the current search-book research package into the production Symmio x Vibe documentation compendium: a 500-800 page cited manifesto and reference, fronted by an answer engine, backed by a living-docs loop, and safe to deploy publicly.

## Current State

The search-book is already a strong research and prototype substrate:

- A static prototype exists at the standalone repo root.
- The page manifest target is already in range at 794 manifest pages.
- The authored layer is now book-scale: 801 authored pages across manifesto, product-reference, rewards/referrals, dashboard-reference, protocol-reference, answer-engine, reference, solver-reference, and compendium sections. The page-state registry reports 800 published public-navigation pages, 792 source companions, 3 internal drafts, and 0 candidate pages in the review lanes.
- The source-ingestion map now reports 17/17 source families complete, 0 partial, 0 parked, and 0 missing. Notion, SSHE, oldest-whitepaper v1 boundary, and Discord/Lafa import are resolved for v1 source readiness.
- The requirement map now treats the public manifesto/reference corpus as complete: 14/18 definition-of-done requirements are complete, 2 are partial, 2 are parked, and 0 are missing. Production readiness remains false because production deployment and production service configuration still depend on #11/#4.
- The answer substrate exists as generated source catalog, authored page index, question routes, FAQ map, Discord import contract, gap queue, crosslinks, answer chunks, volume map, requirement map, and quality audit data.
- The deterministic answer engine has exact-route, glossary, chunk-retrieval, refusal, and citation-validation coverage.
- The OpenAI-compatible LLM RAG runtime exists. The latest 2026-07-01 live `gpt-4.1-mini` eval passed 44/44 fixtures: 16/16 adversarial refusals and 28/28 answer-validation cases, with 16 measured calls, 94,657 input tokens, 8,752 output tokens, and an estimated cost of $0.01944975.
- The deterministic verification path now checks that the final report, progress log, production roadmap, and LLM RAG contract still match the recorded live RAG evidence in `data/llm-rag-contract.json`, and it verifies static app integrity for local script dependencies, expected `window.SearchBook*` globals, static page links, and public reader-data coverage.
- The standalone answer-engine service has SQLite persistence, basic rate limiting, configurable event retention, configurable browser CORS allowlisting, disabled-by-default token-gated moderation and metrics exports, a static frontend bridge, an internal reviewer operations runbook, an executable SQLite backup/restore-check utility, a production env/deploy preflight that now verifies reviewer owner/cadence and backup-storage evidence, and a local smoke test that exercises health, answer persistence, ratings, insights, moderation export, metrics export, and allowed/blocked origins without live LLM calls.
- The current local preview runs from the standalone repo root, can be served on localhost with `npm run search-book:serve-static`, has static integrity coverage at `npm run search-book:check-static`, has a static preview smoke test at `npm run search-book:smoke-static`, has a combined preview/service smoke test at `npm run search-book:smoke-preview-service` that verifies the static frontend can use the standalone service, and has `npm run search-book:check-production-env` for production configuration fail-closed checks.
- The deployment surface now has `npm run search-book:smoke-deployment`, a URL-driven smoke probe for preview/staging/production routes. It checks static assets and exact-page routing in read-only mode, can check service health/CORS/Search Insights when a service URL is provided, and requires explicit `--write` before creating one answer event plus rating.
- The launch surface now has `npm run search-book:check-launch`, an executable production/staging gate that composes the production env preflight, optional fresh deterministic verify, URL-driven deployment smoke, reviewer owner/cadence evidence, backup-storage evidence, latest restore-checked backup manifest evidence, and unresolved completion-boundary checks without printing secret values.
- The standalone repo now has a no-secret GitHub Actions verification gate at `.github/workflows/search-book-verify.yml`; it clones the public `0xneelo/vibe_docs` export into `/tmp/vibe_docs`, then runs the deterministic verify plus static, service, and preview-service smoke tests without LLM or production credentials.
- The quality audit is intentionally not green yet; the only known failure is operator inbox because #11 and #4 remain open.
- Operator publication decisions for Phase A revenue, referral depth, Opyn exclusion, answer-engine build path, source-family dispositions, canonical point taxonomy, Add Token Info, Notion public-use boundary, SSHE v1 source boundary, oldest-whitepaper v1 de-scope, Discord access/export/import, and the false fifteenth-pass checkpoint blocker are recorded. Only two production operator gates remain: production VPS env install at `/etc/symmio-search-book/search-book.env` (#11) and public frontend platform/repo/deploy route (#4).

This is not production-ready yet. It is a credible research dossier and prototype with enough structure to move into implementation.

## Production Definition

Production-ready means all of the following are true:

- The public site ships a coherent 500-800 page compendium, not a loose draft corpus.
- Each published page has source keys, source URLs, cross-links, and a clear publication status.
- The manifesto and reference are unified under one IA and one style guide.
- The answer engine is the front door: ask a question, get a cited answer, get routed to exact pages, rate the answer, ask again.
- The LLM answers only from the corpus, cites every substantive claim, and refuses or escalates when the corpus cannot answer.
- Every question, rating, gap, and failed answer is persisted into a living-docs datastore.
- The Search Insights page shows real recent questions and real gap signals.
- Discord/Lafa demand evidence is integrated from the provided internal-only export; public copy keeps exact Discord/Lafa statements behind editorial review and source-boundary checks.
- Public economics, referral, revenue, points, and venue/chain/phase claims match the operator-approved disclosure boundary.
- Deployment, observability, privacy, prompt-safety, link checking, source audits, and rollback are in place.

## Recommended Production Architecture

Default recommendation: self-hosted Next.js or Fumadocs/Next with a custom retrieval and answer service.

Reasoning:

- The product requirement is not just "AI search"; it is owned question telemetry, ratings, gap generation, source-gated answers, and a visible living-docs loop.
- A hosted docs platform can work if speed is more important than ownership, but the compendium's differentiator is the answer engine plus feedback system.
- The existing static search-book data model already maps cleanly into a custom build: authored pages, generated source companions, chunks, routes, FAQ entries, gap queue, and volume map.

Fallback: Mintlify or another hosted docs platform.

- Use native Ask AI for the reader UX if chosen.
- Still build and own the question/rating/gap datastore.
- Treat native answers as a UX layer, not the authoritative source of production telemetry.

## Phase 0 - Lock Decisions And Stabilize The Current Checkpoint

Goal: stop moving the foundation while the build begins.

Current status: the corpus and answer-runtime checkpoints have advanced beyond the original Phase 0 plan. Recent known checkpoints include the citation-valid live LLM runtime (`23bfa24`), Symmio whitepaper-history boundary (`d241bcf`), Discord/Lafa ingestion contract (`4e079d5`), the standalone SQLite answer-engine service boundary, the Proof-of-Value publication checkpoint (`d02e35b`), the latest live RAG evidence refresh (`0ef7ba4`), the readiness-evidence documentation alignment checkpoint (`84d5476`), and the static app integrity checkpoint. The remaining Phase 0 work is production platform/repo/deploy-route capture and keeping the roadmap/checklists current as the two production gates resolve.

Deliverables:

- Keep scoped search-book checkpoints committed after each source/runtime/readiness slice.
- Re-run generation and deterministic checks after contract, source, or route changes.
- Keep readiness evidence synchronized with `data/llm-rag-contract.json`; `build-all --verify` now fails when report/roadmap/contract totals drift.
- Keep static app integrity in the verification path so local script dependencies, expected globals, static page links, and reader-data coverage fail before deploy.
- Keep the production preflight in the verification path so unsafe local defaults, wildcard origins, repo-local DB paths, missing production VPS service env, missing reviewer/cadence assignment, missing backup storage, and secret-printing regressions fail before launch.
- Confirm localhost preview still serves the search-book when frontend/design work changes.
- Update `_local/agent-worklog.md`.
- Re-read `OPERATOR-INBOX.md` and resume any newly resolved items.

Remaining operator decisions:

- #11 production VPS service env install at `/etc/symmio-search-book/search-book.env`.
- #4 public frontend platform, repository owner, and deploy route.

Exit gate:

- The standalone repo is clean after a scoped checkpoint commit.
- The quality audit failure list is still limited to the known #11/#4 production gates.
- No unrelated dashboard/spec/deploy work is staged.

## Phase 1 - Source Completeness And Launch Truth Boundary

Goal: know exactly what can be published as fact.

Work:

- Keep open operator inbox items limited to #11 and #4; do not re-open resolved source-ingestion items.
- Keep the Discord/Lafa corpus imported internal-only, regenerate sanitized review/routing/editorial artifacts when the review packet changes, and keep exact Discord/Lafa statements out of public copy until editorial review promotes a specific claim.
- Keep the Vibe Notion source registered as paraphrase-only public boundary material; do not quote Notion text or signed media URLs.
- Keep original/oldest Symmio whitepaper recovery out of scope for v1 and use the official Git/current-docs boundary page.
- Keep referral-depth public copy on the resolved 15-level/additive-backfill stance.
- Keep revenue disclosure on the resolved v1 Phase A boundary: `networkVolume × platformFeeRate × referrerPlatformShare`, defaults `0.05%` / `5 bps` and `30%`; keep Phase B economics out of v1 public answers.
- Use the resolved v1 SSHE boundary: SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers and Clearing Layers.
- Keep the competitive sweep at documented 49/50 with Opyn excluded because it shut down.
- Keep Add Token Info sourced from the fetched official Markdown and route payment specifics to the live app form.

Artifacts:

- Updated `SOURCES.md`.
- Updated `GAPS.md`.
- Updated `DECISIONS.md`.
- Updated `QUESTIONS.md`.
- Updated requirement map and quality audit.
- Launch truth-boundary note for economics, referrals, points, and security claims.

Exit gate:

- No unresolved item blocks a public claim without being explicitly labeled as a source boundary or one of the known #11/#4 production gates.
- Every public numerical, legal, revenue, referral, audit, and security claim has a current primary source or an operator-approved publication note.

## Phase 2 - Corpus Productization

Goal: turn the current research corpus into an intentional public compendium.

Work:

- Classify every page into one of four states:
  - `published`: edited, cited, cross-linked, production-ready.
  - `candidate`: good authored draft, needs final review.
  - `source-companion`: source mapped, useful for retrieval, not public navigation.
  - `internal-draft`: research scaffold, hidden from public readers.
- Keep the public manifest between 500 and 800 substantive pages.
- Hide or consolidate low-value generated companion pages from public nav if they are not substantive.
- Promote the most important generated drafts into authored pages.
- Build final volume structure, chapter order, previous/next, related links, glossary entries, and guided journeys.
- Normalize terminology: intents, AMFQ/aMFQ as legacy "Automated Market for Quotes", PartyA/PartyB, solver, frontend builder, VibeCaps, account, SubAccount, Virtual Account, margin, CVA, points, vibe-points, revenue, network volume.

Priority authoring areas:

- Revenue and dashboard reference.
- Points, vibe-points, referrals, rakeback, TGE and vesting.
- Vibe app onboarding, trading, account health, security, withdrawals, fees, funding, order types, TP/SL.
- Symmio protocol, lifecycle, solver operations, settlement, liquidations, account layers, contract architecture, audits.
- Neelo vision corpus: thesis, bootstrapping, long-tail markets, tokenization, market validation, funding, solver/LP economics, risk, moat.
- Competitive context and why Vibe x Symmio is different.

Artifacts:

- Production page manifest.
- Public/private page-state registry.
- Updated style guide and glossary.
- Volume/chapter map with no duplicates or missing pages.

Exit gate:

- The public compendium has 500-800 published or candidate pages.
- No source-companion page is presented as final prose.
- Navigation reaches every public page.
- Every public page has source keys and source URLs.

## Phase 3 - Deterministic Answer Engine

Goal: ship a non-LLM answer engine that is already useful and auditable.

Work:

- Normalize user questions.
- Use exact question routes first.
- Use keyword/BM25 retrieval over page titles, headings, tags, source keys, and chunks.
- Route to exact pages when confidence is high.
- Return a page card, source list, and "why this matched" metadata.
- Persist every question, selected page, confidence, and user rating.
- Show recent questions and gap signals in Search Insights.
- Generate gap candidates from unanswered, low-confidence, and low-rated questions.

Why this phase comes before LLM:

- It proves the page graph, question ledger, and feedback loop before generation adds ambiguity.
- It creates evaluation data for the LLM layer.
- It gives users a safe fallback if LLM answering is disabled.

Exit gate:

- Known `QUESTIONS.md` entries route correctly.
- No route points to a missing page or missing source key.
- Ratings and question logs persist.
- Search Insights displays real local data and can read the standalone service when configured.
- `npm run search-book:smoke-service` passes against an isolated temporary SQLite database.
- `npm run search-book:smoke-preview-service` passes against isolated static-preview and answer-engine localhost ports.

## Phase 4 - LLM Retrieval-Augmented Answering

Goal: integrate the LLM for actual scanning and cited answers.

Current status: the CLI/runtime harness is implemented and live-tested with OpenAI `gpt-4.1-mini`. It uses strict structured JSON output where supported, validation retry feedback, exact-route/glossary preflight, source-gated chunks, citation validation, adversarial refusals, token/cost accounting, and extractive fallback after capped validation failure. The same runtime now has a standalone HTTP service boundary with SQLite persistence for questions, ratings, gaps, and helpful answer-cache rows; basic request rate limiting; configurable retention; rated-answer reuse after guardrail preflight; optional dynamic example chips from helpful cached questions; disabled-by-default token-gated moderation and metrics exports; direct SQLite gap-summary job; executable SQLite backup/restore-check utility; production configuration preflight; local Discord review/routing packet commands; and `LIVING-DOCS-OPERATIONS.md` for reviewer triage. The static Search Book can call that service when configured. Local `.secrets/search-book.env` is complete for local LLM work. Production still needs the VPS service env at `/etc/symmio-search-book/search-book.env`, selected public frontend route/deploy wiring, production moderation/metrics and backup storage access, assigned reviewer owner/cadence, deployment checks, external monitoring wiring, and editorial promotion of approved Discord/Lafa paraphrases.

Timing:

- Start after Phase 3 is stable enough that route, chunk, source, and rating data are trustworthy.
- Do not wait for every page to be final, but do require source keys and chunks to be stable.

Architecture:

- Chunk all public and source-companion pages with page id, title, headings, source keys, source URLs, status, volume, and word offsets.
- Build hybrid retrieval: exact route lookup, BM25 keyword search, vector embeddings, and optional reranking.
- Retrieve top candidate pages and chunks.
- Run an answer model only over retrieved context.
- Return structured JSON:
  - answer text.
  - cited page ids.
  - cited source keys and URLs.
  - confidence.
  - missing-information flags.
  - follow-up questions.
  - whether the answer should create or update a gap.
- Validate the answer before display:
  - every substantive paragraph has at least one citation.
  - no citation points to a missing page or unknown source.
  - unsupported numerical claims are rejected.
  - operator-parked topics trigger caveated answers or refusal.
  - secrets, private URLs, tokens, and env-like values are blocked.
- Persist usage metadata needed for operations: model, input/output token counts, cost estimate, validation attempts, refusal reason, and fallback path. Never persist or print API keys.

Model policy:

- Use OpenAI through the OpenAI-compatible runtime unless the operator changes the provider policy.
- Use `gpt-4.1-mini` as the current validated synthesis model until a stronger model is approved and passes the same evals.
- Use deterministic prompts, low temperature, strict JSON schema, and source-only instructions.
- The model must refuse when the corpus cannot answer.

Prompt policy:

- System: answer only from provided corpus excerpts.
- Developer: cite all claims, prefer primary sources, do not fill gaps from memory, escalate contradictions.
- User: raw question.
- Context: retrieved chunks, page metadata, operator gap flags, and source metadata.

Evaluation set:

- All current `QUESTIONS.md` answerable questions.
- All reconciliation questions.
- Discord/Lafa questions when available.
- Adversarial questions about secrets, private endpoints, unsupported revenue numbers, unaudited claims, future points, referral depth, and external investment advice.
- Regression questions for AMFQ/aMFQ terminology, PartyA/PartyB, SubAccounts/Virtual Accounts, withdrawal paths, revenue estimates, and points.
- Live evaluation checkpoint: 2026-07-01, `gpt-4.1-mini`, 44/44 total fixtures passed, 16/16 adversarial and 28/28 answer-validation, 16 measured calls, 94,657 input tokens, 8,752 output tokens, estimated cost $0.01944975.

Exit gate:

- 100 percent of displayed LLM answers include valid citations.
- Unsupported questions produce a useful refusal and create a gap signal.
- Golden-set answers route to the expected page family.
- Prompt-injection attempts inside page content cannot override source-only answering.
- LLM can be disabled without breaking deterministic search.

## Phase 5 - Frontend Experience

Goal: make the answer engine feel like the docs product, not a bolted-on search box.

Work:

- Match the operator mockup:
  - Ask & Search home.
  - central ask bar.
  - example question chips.
  - answer panel with citations and exact page route.
  - rating controls.
  - Search Insights.
  - Back to dashboard.
- Add persistent ask widget to every page.
- Build content pages with:
  - H1.
  - concise intro.
  - source block.
  - previous/next.
  - related pages.
  - page status.
  - last verified date.
- Build guided journeys:
  - new reader.
  - trader.
  - project/HIP-3 deployer.
  - solver/LP.
  - treasury/foundation.
  - researcher.
  - frontend builder.
- Add glossary and terminology popovers where useful.

Design requirements:

- Follow Vibe brand and the mockup where the docs app already has direction.
- Keep the UI dense enough for sophisticated market participants but not terminal-cosplay dense.
- Use the answer engine as the first viewport, not a marketing hero.
- Keep citations and source state visible.

Exit gate:

- A reader can ask a question, get an answer, open the exact page, rate the answer, and see the signal appear in Search Insights.
- Core journeys are usable from the front door.
- Mobile and desktop layouts are non-overlapping and readable.

## Phase 6 - Living Docs Operations

Goal: make improvement continuous after launch.

Work:

- Persist questions, answers, ratings, route choice, citations, no-answer events, and optional user notes.
- Build gap scoring:
  - repeated question frequency.
  - low rating count.
  - no-answer count.
  - high-value topic class.
  - source freshness risk.
  - operator-blocked status.
- Build an editorial queue:
  - draft new page.
  - update page.
  - resolve contradiction.
  - update source.
  - ask operator.
  - no action.
- Add admin/reviewer view, export, or documented operations path.
- Add privacy controls and data retention policy.
- Add weekly or daily agent job to summarize top gaps.

Current service status:

- SQLite question, rating, gap, and helpful answer-cache persistence exists.
- `GET /api/search-book/insights` exposes recent events and aggregate counts for Search Insights.
- `GET /api/search-book/examples` exposes helpful cached questions for optional dynamic example chips, while the static frontend keeps curated examples as fallback.
- Rated-answer reuse can replay a helpful cached answer as `source:"reuse-cache"` for semantically similar questions after guardrail preflight; guardrail refusals are never served from cache.
- `SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS` controls event retention, with a 180-day default.
- `GET /api/search-book/moderation` can export gap, low-rating, unanswered-question, and repeated-question queues, but is disabled by default and requires a moderation token when enabled.
- `GET /api/search-book/metrics` can export operational counters, datastore totals, uptime, runtime counts, and memory usage for internal monitoring; it is disabled by default, token-gated when enabled, and excludes raw questions, answers, notes, moderation queues, API keys, and tokens.
- `scripts/summarize-living-docs-gaps.mjs` can read the SQLite datastore directly and emit internal markdown or JSON reviewer summaries for gap backlog, low-rated answers, unanswered/refused questions, repeated questions, and recommended actions.
- `scripts/backup-answer-engine-db.mjs` can create SQLite-consistent backups, write manifests, and verify restore viability with integrity and table-count checks.
- `scripts/check-production-env.mjs` validates built artifacts, production SQLite path, LLM-backed default mode, allowed origins, public service URL, moderation token rules, and live-eval evidence without calling the provider or printing secret values.
- `LIVING-DOCS-OPERATIONS.md` documents daily triage, weekly summaries, moderation export handling, privacy boundaries, launch gates, and incident response.
- Production still needs deployment wiring, external monitoring integration, production moderation/metrics and backup storage access, and an assigned scheduler/owner for the documented gap-summary, metrics review, and backup cadence.

Exit gate:

- Search Insights is backed by real persisted data in service-configured preview and production deployments.
- Editors can move from a bad answer to the page or source that needs work.
- Operator-blocked issues are not repeatedly re-raised; they stay in `OPERATOR-INBOX.md` until resolved.

## Phase 7 - Production QA And Hardening

Goal: prove the site is safe, accurate, and maintainable.

Content QA:

- Source check every publication page.
- Link check every source URL and internal route.
- Validate all source keys.
- Validate no generated source-companion page is mislabeled as final.
- Confirm no unresolved contradiction is published as settled.
- Confirm operator-approved language for revenue, referrals, points, audits, and security.

Answer QA:

- Run golden question set.
- Run refusal tests.
- Run citation integrity checks.
- Run missing-source tests.
- Run hallucination checks against known unsupported claims.
- Run prompt-injection tests from embedded page content.

Engineering QA:

- Typecheck.
- Lint.
- Unit tests for retrieval, route matching, citation validation, gap creation, and ratings.
- Integration tests for ask -> answer -> route -> rate -> insight.
- Build.
- Accessibility pass.
- Mobile and desktop visual checks.
- Performance budget.
- Error-state checks.
- Observability checks.

Security/privacy QA:

- Secret scan.
- Prompt-injection hardening.
- Rate limiting.
- Abuse monitoring.
- PII policy for question logs.
- Admin authentication if an admin view exists.
- Env var review.
- No private backend URLs or credentials in public docs.

Exit gate:

- CI passes.
- Preview deployment passes smoke tests, including the local static-preview smoke test, combined preview/service smoke test, URL-driven deployment smoke, and launch-readiness gate before public deploy wiring.
- Known production risks are documented with owner and mitigation.
- Rollback path is defined.

## Phase 8 - Launch

Goal: deploy a production public docs site and make it operable.

Work:

- Freeze launch content.
- Tag source snapshot.
- Deploy preview.
- Operator review.
- Fix launch blockers.
- Deploy production.
- Verify:
  - homepage.
  - ask bar.
  - LLM answer.
  - deterministic fallback.
  - citations.
  - ratings.
  - Search Insights.
  - core journeys.
  - dashboard back-link.
  - canonical URLs.
  - analytics.
  - error handling.
- Publish final report.

Launch report:

- Page counts.
- Source counts.
- Authored vs candidate vs companion count.
- Known parked gaps.
- Operator decisions applied.
- QA commands and outputs.
- Deployment URL.
- Answer-engine evaluation score.
- Open post-launch editorial queue.

Exit gate:

- Production URL is live.
- Smoke tests pass.
- Final report is committed.
- Operators know how to review gaps and improve pages.

## Phase 9 - Post-Launch Cadence

Goal: keep the docs alive.

Cadence:

- Daily for first week:
  - review failed answers.
  - review low ratings.
  - patch high-severity content gaps.
  - check source link failures.
- Weekly:
  - publish gap report.
  - update source freshness.
  - run answer eval suite.
  - ship editorial improvements.
- Monthly:
  - re-run competitive docs benchmark.
  - review page-state distribution.
  - archive stale claims.
  - refresh economics and audit-sensitive pages.

Operating rule:

- If a missing source, credential, decision, or access blocks a production claim, append exactly one item to `OPERATOR-INBOX.md`, keep working elsewhere, and resume when the operator marks it resolved.

## Critical Path

The true critical path is:

1. Keep current corpus/runtime checkpoints clean and committed.
2. Lock public frontend platform/repo/deploy route.
3. Classify pages into public/candidate/source-companion/internal.
4. Stabilize deterministic answer routing and question tracking.
5. Connect the standalone SQLite answer-engine service to the selected public frontend route and production environment.
6. Deploy production Search Insights around the SQLite event datastore, configure retention/moderation/backup storage access, keep the latest restore-checked backup manifest wired into launch evidence, and assign the documented reviewer workflow owner/cadence.
7. Finalize production UI and guided journeys.
8. Run source, answer, security, and deployment QA.
9. Launch with final report.

## Immediate Next Actions

1. Keep `data/llm-rag-contract.*`, `data/answer-validation-report.*`, and the runtime docs aligned with live eval evidence.
2. Install the production VPS service env at `/etc/symmio-search-book/search-book.env`, configure retention/moderation/backup storage access, provide latest restore-checked backup manifest evidence, assign reviewer owner/cadence, and deploy the selected public frontend route against the standalone answer-engine endpoints.
3. Re-run live adversarial and answer-validation evals after service deployment wiring and before public launch.
4. Use the page-state registry to keep source companions out of public navigation and internal drafts out of answer synthesis.
5. Decide platform/repo ownership, or keep building the platform-neutral prototype while that remains open.
