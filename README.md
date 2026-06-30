# Vibe x Symmio Search Book

Session 1 research package, static docs prototype, and validated answer-engine runtime harness for the Vibe x Symmio documentation compendium.

This directory is intentionally isolated from the existing dashboard. It is not the deployed production docs implementation yet.

## Current State

- Research dossier: `research-dossier.md`
- Progress log: `PROGRESS.md`
- Source registry: `SOURCES.md`
- Product/content decisions: `DECISIONS.md`
- Gaps and contradictions: `GAPS.md`
- Tracked reader questions: `QUESTIONS.md`
- Deterministic answer-engine contract: `ANSWER-ENGINE-CONTRACT.md`
- LLM RAG API contract: `LLM-RAG-CONTRACT.md`
- Answer validation harness: `ANSWER-VALIDATION-HARNESS.md`
- Seed question dataset: `data/seed-questions.json`
- Editorial and UI style guide: `STYLEGUIDE.md`
- 500-800 page manifest: `page-manifest.json`
- Compendium target contract: `scripts/compendium-target.mjs`
- Generated draft content corpus: `content/generated/`
- Authored publication-candidate pages: `content/authored/`
- Authored compendium volume overviews: `content/authored/compendium/`
- Authored page index: `data/authored-pages.js`
- Compact prototype search index: `data/search-index.js`
- Generated browse/navigation tree: `data/navigation-tree.js`
- Generated guided journey map: `data/journeys.js`
- Generated question-route map: `data/question-routes.js`
- Generated local FAQ seed map: `data/faq.js`
- Generated Discord/Lafa import contract: `data/discord-corpus.js`
- Generated living-docs gap queue: `data/gap-queue.js`
- Generated deterministic answer-engine contract: `data/answer-engine-contract.js`
- Generated living-docs event contract: `data/living-docs-events.js`
- Generated LLM RAG API contract: `data/llm-rag-contract.js`
- Generated answer validation report: `data/answer-validation-report.js`
- Generated answer retrieval chunks: `data/answer-chunks.js`
- Generated compendium volume map: `data/volume-map.js`
- Generated page-state registry: `data/page-state-registry.js`
- Generated publication authoring plan: `data/publication-plan.js`
- Generated routed glossary: `data/glossary.js`
- Generated source catalog: `data/source-catalog.js`
- Generated required-source ingestion map: `data/source-ingestion.js`
- Generated competitive documentation sweep: `data/competitive-sweep.js`
- Generated reader crosslink map: `data/crosslinks.js`
- Generated definition-of-done requirement map: `data/requirement-map.js`
- Generated publication-quality audit: `data/quality-audit.js`
- Standalone answer-engine service: `scripts/serve-answer-engine.mjs`
- Throwaway static prototype with exact-page reader: `index.html`

Open `index.html` directly in a browser. It uses local data and `localStorage`; no backend, secrets, or live APIs are required.

Open an exact local page with `index.html?page=authored-intents-complete-order-books` or any page id from `data/search-index.json`.

Run the standalone answer-engine service locally:

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/tmp/search-book-answer-engine.sqlite node src/search-book/scripts/serve-answer-engine.mjs
```

It exposes `POST /api/search-book/answer`, `POST /api/search-book/rating`, `GET /api/search-book/insights`, `GET /api/search-book/moderation`, and `GET /health`. Configure the static prototype with `index.html?service=http://127.0.0.1:8787`; the Ask front door, ratings, and Search Insights will use the service while keeping `localStorage` fallback for static preview. `llm` mode uses the same environment-gated OpenAI-compatible runtime as `run-llm-rag-answer.mjs`; API keys are read from `process.env` only and are not printed or persisted.

Operational env knobs:

```sh
SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS=180
SEARCH_BOOK_ANSWER_ENGINE_ENABLE_MODERATION_EXPORT=false
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_TOKEN=
SEARCH_BOOK_ANSWER_ENGINE_MODERATION_LIMIT=50
```

Retention applies to persisted question, rating, and gap events; set retention days to `0` only for a local archive. The moderation export is disabled by default and, when enabled, requires `Authorization: Bearer ...` or `x-search-book-moderation-token`; never put that token in public frontend code.

## Prototype Question

Can a docs front door combine:

- an ask-first entry point,
- exact routed answer pages,
- source-aware answers,
- ratings and unanswered-question capture,
- and a living-docs gap loop

before committing to Mintlify, Fumadocs, or a custom docs app?

## Non-Goals

- This is not the final authored documentation site.
- This is not a deployed production answer-engine service. The OpenAI-compatible runtime harness exists, has passed live `gpt-4.1-mini` citation validation, and now has a SQLite-backed service boundary, static frontend bridge, retention policy, and gated moderation export; production service env, selected public frontend route, admin/reviewer operations, and deploy wiring remain production work.
- This does not import the Discord corpus yet; the Discord/Lafa scraper and import contract exist, but channel/export access and publication boundaries remain documented blockers.
- This does not expose private API URLs, tokens, unprotected admin/reviewer endpoints, or operator-only credentials.

## Verification

Focused checks for this package:

```sh
node src/search-book/scripts/build-all.mjs --verify
```

The same check is exposed as `npm run search-book:verify`. Use `node src/search-book/scripts/build-all.mjs --list` to inspect step ids, `--dry-run` to preview commands, and `--from <step-id>` / `--only <step-id>` for resumable focused rebuilds.

Expanded legacy command list, kept for audit only:

```text
node src/search-book/scripts/build-page-manifest.mjs --input /tmp/vibe_docs/Website/public/generated/docs-data.json --out /tmp/search-book-page-manifest.json
node src/search-book/scripts/build-content-corpus.mjs --docs-root /tmp/vibe_docs/Docs/public --docs-data /tmp/vibe_docs/Website/public/generated/docs-data.json
node src/search-book/scripts/build-authored-index.mjs
node src/search-book/scripts/build-source-catalog.mjs
node src/search-book/scripts/build-navigation-tree.mjs
node src/search-book/scripts/build-journey-map.mjs
node src/search-book/scripts/build-question-routes.mjs
node src/search-book/scripts/build-faq-map.mjs
node src/search-book/scripts/build-discord-corpus.mjs
node src/search-book/scripts/build-gap-queue.mjs
node src/search-book/scripts/build-answer-chunks.mjs
node src/search-book/scripts/build-crosslink-map.mjs
node src/search-book/scripts/build-volume-map.mjs
node src/search-book/scripts/build-page-state-registry.mjs
node src/search-book/scripts/build-publication-plan.mjs
node src/search-book/scripts/build-glossary.mjs
node src/search-book/scripts/build-answer-engine-contract.mjs
node src/search-book/scripts/build-living-docs-events.mjs
node src/search-book/scripts/build-llm-rag-contract.mjs
node src/search-book/scripts/build-answer-validation-report.mjs
node src/search-book/scripts/build-competitive-sweep.mjs
node src/search-book/scripts/build-source-ingestion-map.mjs
node src/search-book/scripts/build-requirement-map.mjs
node src/search-book/scripts/build-quality-audit.mjs
node --check src/search-book/answer-corpus.js
node --check src/search-book/scripts/compendium-target.mjs
node --check src/search-book/scripts/build-page-manifest.mjs
node --check src/search-book/scripts/build-content-corpus.mjs
node --check src/search-book/scripts/build-authored-index.mjs
node --check src/search-book/scripts/build-journey-map.mjs
node --check src/search-book/scripts/build-question-routes.mjs
node --check src/search-book/scripts/build-faq-map.mjs
node --check src/search-book/scripts/build-discord-corpus.mjs
node --check src/search-book/scripts/build-gap-queue.mjs
node --check src/search-book/scripts/build-answer-engine-contract.mjs
node --check src/search-book/scripts/build-llm-rag-contract.mjs
node --check src/search-book/scripts/run-llm-rag-answer.mjs
node --check src/search-book/scripts/serve-answer-engine.mjs
node --check src/search-book/scripts/build-answer-validation-report.mjs
node --check src/search-book/scripts/build-answer-chunks.mjs
node --check src/search-book/scripts/build-volume-map.mjs
node --check src/search-book/scripts/build-page-state-registry.mjs
node --check src/search-book/scripts/build-publication-plan.mjs
node --check src/search-book/scripts/build-glossary.mjs
node --check src/search-book/scripts/build-source-catalog.mjs
node --check src/search-book/scripts/build-competitive-sweep.mjs
node --check src/search-book/scripts/build-source-ingestion-map.mjs
node --check src/search-book/scripts/build-crosslink-map.mjs
node --check src/search-book/scripts/build-living-docs-events.mjs
node --check src/search-book/scripts/build-requirement-map.mjs
node --check src/search-book/scripts/build-quality-audit.mjs
node --check src/search-book/data/authored-pages.js
node --check src/search-book/scripts/build-navigation-tree.mjs
node --check src/search-book/data/navigation-tree.js
node --check src/search-book/data/journeys.js
node --check src/search-book/data/question-routes.js
node --check src/search-book/data/faq.js
node --check src/search-book/data/discord-corpus.js
node --check src/search-book/data/gap-queue.js
node --check src/search-book/data/answer-engine-contract.js
node --check src/search-book/data/living-docs-events.js
node --check src/search-book/data/llm-rag-contract.js
node --check src/search-book/data/answer-validation-report.js
node --check src/search-book/data/answer-chunks.js
node --check src/search-book/data/volume-map.js
node --check src/search-book/data/page-state-registry.js
node --check src/search-book/data/publication-plan.js
node --check src/search-book/data/glossary.js
node --check src/search-book/data/source-catalog.js
node --check src/search-book/data/competitive-sweep.js
node --check src/search-book/data/source-ingestion.js
node --check src/search-book/data/crosslinks.js
node --check src/search-book/data/requirement-map.js
node --check src/search-book/data/quality-audit.js
node -e "const j=require('./src/search-book/data/journeys.json'); if (j.missingPageIds.length || j.totalJourneys < 5) process.exit(1); console.log(j.totalJourneys + '/' + j.totalSteps)"
node -e "const q=require('./src/search-book/data/question-routes.json'); if (q.missingRouteIds.length || q.totalRoutes < 1) process.exit(1); console.log(q.totalRoutes + '/' + q.totalReconciliationQuestions)"
node -e "const f=require('./src/search-book/data/faq.json'); if (f.missingPageIds.length || f.missingSourceKeys.length || f.totalAnswerable !== 798) process.exit(1); console.log(f.totalEntries + '/' + f.totalCategories)"
node -e "const dc=require('./src/search-book/data/discord-corpus.json'); if (!dc.importContractReady || !dc.apiScraperReady || dc.corpusReady || dc.totals.importedMessages !== 0 || dc.totals.seededTopics < 1) process.exit(1); console.log(dc.status + '/' + dc.totals.seededTopics)"
node -e "const gq=require('./src/search-book/data/gap-queue.json'); if (gq.missingQuestionGapIds.length || gq.missingRelatedPageIds.length || gq.missingSourceKeys.length || gq.totalQuestionSignals !== 2) process.exit(1); console.log(gq.totalItems + '/' + gq.totalQuestionSignals)"
node -e "const ae=require('./src/search-book/data/answer-engine-contract.json'); if (!ae.deterministicReady || ae.llmProductionReady || !ae.evaluation.allExactRoutesPass || !ae.evaluation.allRefusalTestsPass || ae.evaluation.totalExactRouteTests !== 798) process.exit(1); console.log(ae.evaluation.exactRouteTestsPassing + '/' + ae.evaluation.totalExactRouteTests)"
node -e "const l=require('./src/search-book/data/living-docs-events.json'); if (!l.eventContractReady || !l.datastoreImplemented || !l.sqliteDatastoreImplemented || !l.retentionPolicyImplemented || !l.moderationExportImplemented || l.livingDocsProductionReady || l.coverage.totalFixtures < 8 || l.coverage.failingFixtures || l.coverage.passingFixtures !== l.coverage.totalFixtures) process.exit(1); console.log(l.coverage.passingFixtures + '/' + l.coverage.totalFixtures)"
node -e "const lc=require('./src/search-book/data/llm-rag-contract.json'); if (!lc.apiContractReady || !lc.evalHarnessReady || !lc.runtimeImplemented || lc.llmProductionReady || lc.adversarialEvaluation.totalCases < 12 || lc.adversarialEvaluation.failingCaseIds.length) process.exit(1); console.log(lc.adversarialEvaluation.passingCases + '/' + lc.adversarialEvaluation.totalCases)"
node -e "const av=require('./src/search-book/data/answer-validation-report.json'); if (!av.reportReady || av.coverage.totalFixtures < 20 || av.coverage.passingFixtures !== av.coverage.totalFixtures || av.failureSummary.failingFixtureIds.length) process.exit(1); console.log(av.coverage.passingFixtures + '/' + av.coverage.totalFixtures)"
node -e "const a=require('./src/search-book/data/answer-chunks.json'); if (a.pagesMissingChunks.length || a.unknownSourceKeys.length || a.totalPages < 821 || a.totalChunks < a.totalPages) process.exit(1); console.log(a.totalPages + '/' + a.totalChunks)"
node -e "const v=require('./src/search-book/data/volume-map.json'); if (v.unassignedPageIds.length || v.duplicatePageIds.length || v.volumeIdsMissingPages.length || v.readerPages !== v.pagesAssigned || !v.manifestWithinTarget) process.exit(1); console.log(v.totalVolumes + '/' + v.totalChapters)"
node -e "const ps=require('./src/search-book/data/page-state-registry.json'); if (ps.duplicatePageIds.length || ps.unclassifiedPageIds.length || ps.missingVolumeIds.length || ps.totalPages < 900 || !ps.byState.candidate || !ps.byState['source-companion']) process.exit(1); console.log(ps.totalPages + '/' + Object.keys(ps.byState).length)"
node -e "const g=require('./src/search-book/data/glossary.json'); if (g.missingPageIds.length || g.missingSourceKeys.length || g.totalTerms < 25) process.exit(1); console.log(g.totalTerms + '/' + Object.keys(g.byCategory).length)"
node -e "const s=require('./src/search-book/data/source-catalog.json'); if (s.duplicateKeys.length || s.totalSources < 1) process.exit(1); console.log(s.totalSources + '/' + Object.keys(s.byGroup).length)"
node -e "const cs=require('./src/search-book/data/competitive-sweep.json'); if (cs.targetDocs !== 50 || cs.plannedAgentLanes !== 25 || cs.completedExplorerBatches !== 5 || cs.targetDocsReviewed !== 49) process.exit(1); console.log(cs.targetDocsReviewed + '/' + cs.targetDocs)"
node -e "const si=require('./src/search-book/data/source-ingestion.json'); if (si.duplicateRequirementIds.length || si.invalidParkedRequirements.length || si.totalSourceRequirements < 12 || si.sourceCompletionReady) process.exit(1); console.log((si.byStatus.complete || 0) + '/' + si.totalSourceRequirements)"
node -e "const c=require('./src/search-book/data/crosslinks.json'); if (c.missingExplicitRelatedPageIds.length || c.totalPages < 800) process.exit(1); console.log(c.totalPages + '/' + c.pagesWithRelated)"
node -e "const r=require('./src/search-book/data/requirement-map.json'); if (r.duplicateRequirementIds.length || r.invalidParkedRequirements.length || r.totalRequirements < 12 || r.completionReady) process.exit(1); console.log((r.byStatus.complete || 0) + '/' + r.totalRequirements)"
node -e "const d=require('./src/search-book/data/authored-pages.json'); if (!d.pages.every((p)=>p.bodyMarkdown)) process.exit(1); console.log(d.totalPages)"
node -e "const d=require('./src/search-book/data/authored-pages.json'); const vols=d.pages.filter((p)=>p.section==='compendium' && p.volumeId); if (vols.length !== 8) process.exit(1); console.log(vols.length)"
node -e "const q=require('./src/search-book/data/quality-audit.json'); if (q.totals.manifestPages !== 794 || q.targetMinimumPages !== 500 || q.targetMaximumPages !== 800 || !q.totals.manifestWithinTarget || q.gates.length < 1) process.exit(1); console.log(q.gates.filter((g)=>g.passed).length + '/' + q.gates.length)"
node -e "const m=require('./src/search-book/page-manifest.json'); if (!m.pages || m.compendiumTarget.minimumPages !== 500 || m.compendiumTarget.maximumPages !== 800 || m.pages.length < m.compendiumTarget.minimumPages || m.pages.length > m.compendiumTarget.maximumPages) process.exit(1); console.log(m.pages.length)"
rg -n "VIBE_BACK_URL|PRIVATE|TOKEN|SECRET|ADMIN|0x[a-fA-F0-9]{40}" src/search-book
git diff --check -- src/search-book _local/agent-worklog.md
```
