# Parity checklist — behaviors that MUST survive the rewrite

Starter list (M3 / SYN-350 expands this by reading `index.html` end-to-end). Each item: `[ ]` → tick when ported + verified, with the owning milestone and how it was checked. **Gate for M8.**

## Views / render functions (~18)
- [ ] renderAnswer · renderPageReader · renderCards · renderAuthoredCards · renderJourneys · renderExampleQuestions · renderCollections · renderVolumes · renderBrowse · renderGlossary · renderFaq · renderGaps · renderDiscordRouting · renderRecent · renderRatings · renderMetrics · renderQualityAudit · renderRequirements · renderSourceIngestion · renderInsights · renderServiceStatus

## Search / answer logic
- [ ] Ranking: route bonuses (`authored +8`, `curated +4`), exact-match boost (`+3`), curated-vs-full-index merge (`allSearchablePages`)
- [ ] Keyword-route matching + low-confidence fallback routing (→ §04)
- [ ] Answer degraded/rate-limited states; source + confidence metadata
- [ ] `handleAsk` (query, source) incl. example-driven asks

## Service + data
- [ ] `serviceRequest` + `serviceEnabled()` + service→localStorage fallback (`serviceState`)
- [ ] `refreshServiceInsights` / `refreshServiceExamples`; insights merge (`mergeEvents`)
- [ ] Data loaded from `data/*.js` globals (convert to imports/JSON for build) — 22 files
- [ ] localStorage keys (`searchBookPrototype.*`): questions, ratings, gaps

## Voting (the fix)
- [ ] Answer rating `data-rate` → POST `/api/search-book/rating` (`recordRating`)
- [ ] Page rating `data-page-rate` → POST `/api/search-book/page-feedback` (`recordPageRating`)
- [ ] `no`/`not-useful` records a gap (`recordGap`, reason `low-rated-answer` / `page-feedback-needs-work`)
- [ ] **NEW:** visible reaction, one-shot lock, `✓ logged — thank you`, dismiss-guard, 850ms auto-dismiss
- [ ] **NEW/FIX:** `/answer` persists the question under the `eventId` the rating uses (no silent 404)

## Navigation / UX
- [ ] Variant cycling (`cycleVariant`, prev/next, ArrowLeft/Right) + `[data-nav]` switching
- [ ] Mobile rail open/close (`setMobileRailOpen`, Escape)
- [ ] `openPageFromCorpus` (jump/open-page/journey sources), related/generated pages, crosslinks
- [ ] Glossary + FAQ category filters
- [ ] `escapeHtml` on all interpolated content (XSS parity)
- [ ] `exportEventLog` (clipboard + fallback)

## Guards / build
- [ ] `npm run search-book:verify` stays green (26 build steps, quality gates)
- [ ] Existing smokes green: `smoke-static`, `smoke-answer-engine-service`, `smoke-preview-service`
