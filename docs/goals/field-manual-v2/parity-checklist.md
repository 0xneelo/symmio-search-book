# Parity checklist — behaviors that MUST survive the rewrite

Full inventory of the current `index.html` (4,162 lines) + `data/*.js` globals, cataloged 2026-07-04 (M3 / SYN-350, agent-fable-3). Line numbers reference `index.html` at commit `b8e57de`.

Each item: `[ ]` → tick when ported + verified. **Owner** = milestone that must port it. **Verify** column filled during M8. This checklist is the gate for M8 (SYN-355).

Legend: M4 = shell + search/answer (SYN-351) · M5 = voting (SYN-352) · M6 = page-reader SSG (SYN-353) · M7 = remaining views (SYN-354) · M8 = verification (SYN-355) · M9 = deploy (SYN-356).

---

## 1. Data loading (M4 — build-time imports replace globals)

- [ ] All 22 data files loaded (head order, L7–28): `./answer-corpus.js` (**root, not data/**) + 21 `./data/*.js`: authored-pages, search-index, page-state-registry, navigation-tree, journeys, question-routes, faq, gap-queue, discord-review-routing, discord-editorial-queue, answer-chunks, answer-engine-contract, llm-rag-contract, answer-validation-report, volume-map, glossary, source-catalog, source-ingestion, crosslinks, requirement-map, quality-audit. JSON twins exist in `data/*.json` — convert to build-time imports. (M4/M6/M7 per view; wiring M4)
- [ ] Every global has an empty-shape fallback (L2406–2426) — port defaults so missing data never throws.
- [ ] Derived data exactly as L2427–2465: `authoredPages` mapping (summary=excerpt, sources=sourceKeys, route=file, `curated`+`authored` true, keyword tokenization from title/section/track/excerpt/sourceKeys), `fullIndex` (same mapping over `SearchBookIndex`), `curatedIds`, **`allSearchablePages` merge** (fullIndex present ? authored + corpus(curated:true) + fullIndex-minus-curated : authored + corpus), `publicSearchablePages` / `publicAuthoredPages` (`isPublicNavigationPage`), `pageById` (public pages only), `answerChunks` joined to pages (drop pageless), `seededQuestionRoutes` joined, `faqEntries` (entries || answerable+unresolved, page join), `glossaryTerms` (pages + primaryPage join).
- [ ] `isPublicNavigationPage` (L2719): pageState registry → `publicNavigationEligible && pageState ∈ {published, candidate}`; fallback `authored && status ∈ {published, candidate}`.

## 2. State / URL / navigation (M4)

- [ ] Variants list + labels (L2466): classic "A - Ask", browse "B - Browse", glossary "C - Glossary", faq "D - FAQ", journey "E - Journeys", insights "F - Insights".
- [ ] `getVariant()` validates `?variant=` else "classic" (L2513); `setVariant` sets `?variant`, deletes `?page`, `history.replaceState` (L2518); `cycleVariant(direction)` wraps (L2526).
- [ ] Page-reader URL state: `?page=<id>` (`getActivePageId` L3826); `setActivePage` sets `?page`, deletes `?variant`, replaceState, scrolls reader into view unless source `initial-load` (L3830); `clearActivePage(nextVariant)` (L3841). Deep links `?page=` and `?variant=` must keep working (M6 for `?page`).
- [ ] `renderVariant` (L3983): `?page` present → reader mode (`data-view` on html+body, all `[data-view]` sections toggled, nav `aria-current` sync incl. `.nav-link[data-open-page]` match, answer box hidden, switcher label "Page Reader", meta "page"); else variant mode + lazy render browse/glossary/faq/insights|journey.
- [ ] Variant switcher control: `#prevVariant` / `#switcherLabel` / `#nextVariant` (L2399–2403) — keep equivalent affordance.
- [ ] Keyboard (L4151): Escape closes mobile rail; ArrowLeft/ArrowRight cycle variant **unless focus is in INPUT/TEXTAREA**.
- [ ] Mobile rail (L4069–4087): `.mobile-menu-glyph` toggles `.rail.is-open` + `aria-expanded`, blur-on-close, outside-click closes, Escape closes, closes after `data-nav`/`data-open-page` click.
- [ ] Sidebar nav inventory (L2146–2219): brand block; search trigger (`data-nav="classic"`, `/` kbd hint); groups Getting started (Ask & search), Rewards & referrals (`data-open-page="authored-dashboard-faq"` `data-open-source="nav"`), Network revenue (`data-open-page="authored-estimated-network-revenue"` `data-open-source="nav"`), Reference (Glossary, Search insights), Compendium (Browse docs + count pill, FAQ routes, Journeys); rail footer stats `#railTotal`/`#railNeelo`; back link `../dashboard.html`. Field-manual mapping may renumber/relabel but every destination + the two authored deep links must survive.
- [ ] Desktop rail collapsed-by-default with hover/focus-within expansion (CSS L949–1240) — maps to Field Manual 64→272 snav.
- [ ] Hero/front door: H2 brand + ask form `#askForm` + `#queryInput` placeholder "Ask anything — points, invites, revenue, payouts…" + example chips row + home actions (Browse the docs / Search insights) (L2233–2258).
- [ ] Stat counters seeded then overwritten by `init()` (L4025–4036): railTotal, railNeelo, totalPages, neeloPages, sectionPages, companionPages, authoredPages, volumeCount, glossaryTerms, faqEntries — same navigation/registry fallback chains.
- [ ] Boot sequence `init()` (L4025): stats → renderExampleQuestions → authored/cards/volumes/collections/journeys/browse/glossary/faq/insights → renderVariant → if service: refreshServiceInsights → renderInsights → refreshServiceExamples.
- [ ] `aria-live="polite"` on the answer region (L2261); `aria-current` nav state; `aria-expanded` on mobile glyph; `aria-label`s preserved.

## 3. Search / answer logic (M4)

- [ ] Tokenizer `wordsFor` (L2706): lowercase, split non-alnum, drop len≤1 + stopwords (set L2511), suffix-strip `(ations|ation|ions|ion|ing|ed|ers|er|s)$`, re-filter, dedupe.
- [ ] `normalizeQuestionText` (L2725).
- [ ] `scoreQuestionRoute` (L2733): exact normalized match 1000; else overlap ≥ min(2, qlen) && coverage ≥ 0.5 → `120 + overlap*8 + confidence(High 8 / Medium 4 / else 1)`.
- [ ] `scoreGlossaryTerm` (L2759): term/alias exact 900; "what is/what are/define <label>" 880; overlap → `90 + overlap*7`.
- [ ] `scoreAnswerChunk` (L2786): title*7 + section*4 + body*2; exact substring +16; **routeSource bonus authored +8 / curated +4**.
- [ ] `scorePage` (L2812): title*5 + section*3 + body*1; exact +5; **curated +3**.
- [ ] `findAnswer` precedence (L2824): seeded question route → glossary route → answer chunk → ranked public pages → `{page:null, score:0}`.
- [ ] Score strings preserved in metadata: `question-route:N`, `glossary:N`, `chunk:N`, `service:<confidence|status>`, `direct`.
- [ ] `handleAsk(query, source)` (L3148): service branch — loading state ("Scanning cited context"), POST `/api/search-book/answer` `{query, source, mode?}` (mode sent when serviceState.mode ∈ {extractive, llm}), refreshServiceInsights, **eventId = `response.persisted?.id || response.requestId || ""`**, renderAnswer, renderInsights; on error → mark offline + fall through to local `findAnswer` + `recordQuestion`.
- [ ] `recordQuestion` (L3123): event `q-<ts>-<rand>`, status answered|gap, gap `no-grounded-page` recorded when pageless.
- [ ] `renderAnswer` (L3039) three branches: **service** (answered meta `service answer / <confidence|grounded>`; refusal meta `service refusal / <reason|status>`; degraded banner "⚡ Limited mode…" with distinct rate-limited vs unavailable copy — no emoji in v2: re-express flag per DESIGN.MD; gapEvent line; citation chips + page source chips + sourceUrl chips; rating buttons + Open exact page), **no-page** ("No grounded route / recorded gap" + Needs-work only), **local page** (meta `section / routed answer / score N`, summary, seeded-route + confidence, glossary definition, matched chunk slice 420 chars, page.gap, chips, ratings, Open exact page).
- [ ] `resultFromServiceResponse` (L2903): page = `pageById[primaryPageId]` || first citation page found in pageById.
- [ ] Answer/citation rendering helpers: `answerTextHtml` (blank-line paragraphs, L2878), `serviceCitationChips` (max 8, chunkIds max 2 in title, link when sourceHref, L2888), `sourceChipForKey` (label=key, title=`group / use`, "unregistered source key" fallback, L2842), `sourceChips` max 5, `sourceUrlChips` max 6.
- [ ] Example questions: fallback/preferred 4 (L2493), seeded reconciliation against question routes, `refreshServiceExamples` GET `/api/search-book/examples` — dynamic replaces curated **only when count ≥ curated count**, error resets to curated (L2675).
- [ ] Example-driven asks: `data-example-query` fills the ask input and calls `handleAsk(query, "example")` (L4135); journey entry chips + FAQ "Ask this" reuse it.
- [ ] `escapeHtml` (L2697) on every interpolation — in React this is default, but any `dangerouslySetInnerHTML` (markdown path) must sanitize equivalently.

## 4. Service layer + fallback (M4)

- [ ] Service config (L2481–2492): `?service=` param || `window.SEARCH_BOOK_ANSWER_ENGINE_URL`; `?serviceMode=`; params persist to localStorage (`searchBookPrototype.serviceUrl` / `.serviceMode`); serviceState `{url (trailing slashes stripped), mode default "llm", insights, online, lastError}`.
- [ ] `serviceEnabled()` = url && fetch (L2545).
- [ ] `serviceRequest` (L2549): fetch `url+path`, `content-type: application/json`, JSON parse with `{}` catch, throw `payload.message || "…HTTP <status>"`.
- [ ] `refreshServiceInsights` GET `/api/search-book/insights` → insights/online/lastError, always `renderServiceStatus` (L2655).
- [ ] `renderServiceStatus` copy states (L2639): local-only "Stored in this browser for the prototype." / "Service connected: <url>" / "Service unavailable; using local fallback. <err>" / "Service configured: <url>".
- [ ] localStorage lists: `searchBookPrototype.{questions,ratings,gaps}` via loadList/saveList **limit 200** (L2533).
- [ ] `serviceEventLists` mapping (L2581) incl. `mapServiceQuestion` shape (L2564); `localEventLists`; `mergeEvents` dedupe by `id||eventId`, service wins (L2617); `currentEventLists` (L2622).
- [ ] `findQuestionEvent(eventId)` — current lists then raw localStorage (L2633).
- [ ] `/api/search-book/*` contract unchanged: `/answer` POST, `/insights` GET, `/examples` GET, `/rating` POST, `/page-feedback` POST.

## 5. Voting — the fix (M5)

Current behavior (bug context): old UI has **no visual reaction** on vote; `recordRating` POSTs `/rating` with `eventId` from `data-event`; backend `persistRating` looks up `search_book_questions.id = eventId` and **404s** ("rating eventId does not match a persisted question", serve-answer-engine.mjs L443) when the id came from a local (`q-<ts>-…`) event or a `requestId` that was never persisted; the catch quietly flips to local fallback.

- [ ] Answer rating `data-rate` yes|no + `data-event` → `recordRating` (L3747): service POST `/api/search-book/rating` `{eventId, rating}` → refreshServiceInsights + refreshServiceExamples + renderInsights; local fallback stores rating row `{rating, query, page, pageId, eventId, time}`.
- [ ] `no` rating records gap reason `low-rated-answer` (L3778).
- [ ] Page rating `data-page-rate` yes|no + `data-page-rate-id` → `recordPageRating` (L3849): service POST `/api/search-book/page-feedback` `{pageId, rating, query:"Page feedback: <title>"}`; local fallback row with eventId `page-<ts>-<rand>`; `no` → gap reason `page-feedback-needs-work`.
- [ ] **NEW (DESIGN.MD §5/§8):** optimistic visual reaction, selected-invert, other-recedes, `✓ logged — thank you`, one-shot lock, error revert + inline message; DismissGuard on unrated dismissal; modal rating auto-dismisses answer after 850ms.
- [ ] **NEW/FIX:** `/answer` response id round-trips to `/rating` — the eventId the frontend carries must be the persisted question id (backend already returns `persisted.id`; ensure the v2 frontend uses it and the backend persists on every ask path so `/rating` never 404s). Local-fallback answers must not silently POST unpersisted ids.
- [ ] Extend `scripts/smoke-answer-engine-service.mjs` with full ask→rate round-trip asserting a row lands in `search_book_ratings` (no silent 404).
- [ ] Rating allowed values: yes | no | useful | not-useful (backend, L440).

## 6. Page reader (M6)

- [ ] `renderPageReader` (L3893): not-found panel (Back to Ask / Browse docs); body = `markdownToHtml(page.bodyMarkdown)` else summary + "generated corpus preview" note; TOC extracted from rendered h2/h3 ids ("On this page", h3 indented); kicker chips section/track|granularity/status (status fallback `curated-route`/`indexed-page`); actions Back to Ask, Browse docs, Previous/Next (crosslink sequence), "Indexed route" direct link (`route||file||sourceUrls[0]||#`); sidebar Sources (chips + URL chips, "source pending" fallback), Related Pages (max 8), Rate This Page (yes/no + "Stored locally in the prototype gaps loop.").
- [ ] `markdownToHtml` (L2933): strips leading `# `, paragraphs, `- ` lists, `|` tables (first row th, separator rows dropped), h2/h3 with slug ids (deduped `-N`), inline markdown (links→chips, `code`, **strong**), all through escapeHtml first.
- [ ] `relatedPagesFor` (L3017): crosslink relatedPageIds → explicit related(Generated)Pages → same section+track; max 8.
- [ ] `readerSequenceLinks` (L3031) previous/next from crosslinks.
- [ ] `openPageFromCorpus(pageId, source)` (L4012): records question (score `direct`), source `nav` hides answer box, else renders direct answer; setActivePage; renderInsights. Sources used: browse (default), journey (`data-jump`), nav (`data-open-source`).
- [ ] SSG: prerender all pages from `page-manifest.json` + corpus; hydrate voting/nav/crosslinks islands; `?page=` deep links redirect/rewrite to the SSG routes.

## 7. Remaining views (M7)

- [ ] `renderCards` → top-12 unique seeded-route pages, meta section, 3 source chips + Open page (L3181).
- [ ] `renderAuthoredCards` → publicAuthoredPages max 12, meta `section / status`, 4 chips + Open page (L3206).
- [ ] `renderJourneys` (L3226): journeyMap fallback to `corpus.journeys` (promise=focus, entryQuestion=focus, steps built from pageById); audience meta; entry-question chip (`data-example-query`); numbered steps (`data-jump`).
- [ ] `renderExampleQuestions` chips (L3271).
- [ ] `renderCollections` → collection cards (pageCount, sourceUrl link) (L3284).
- [ ] `renderVolumes` (L3299): volume meta `Volume N / pages / chapters`, readerPromise|premise, overview button ("overview pending" fallback), chapter chips max 4 `title / totalPages`, opening pages max 4 (dedup overview).
- [ ] `renderBrowse` (L3335): filter input, `pageMatchesFilter` fields (title/section/track/granularity/status/sourcePriority/sourceKeys, every word must match), per-track max 10 + "Showing X of Y matching pages" overflow, `#browseCount` "<n> matching pages", empty state "No matching pages."
- [ ] `renderGlossary` (L3384): filter (`glossaryMatchesFilter`: term/aliases/category/definition/sourceKeys), count "<x> of <y> terms", category chips `<cat> / <count>` sorted (`data-glossary-category` sets filter), term cards (category meta, aliases max 4, definition, page links max 3, sourceKeys max 4), empty state.
- [ ] `renderFaq` (L3439): filter (`faqMatchesFilter` incl. gapId/gapTitle), count "<x> of <y> local FAQ entries", category chips (`data-faq-category`), cards meta `type / category / confidence`, reconciliation `is-gap` styling, answer text precedence (answerable: shortAnswer||answerSummary; else notes||shortAnswer), "Routes to <page>" meta, gap meta, Open exact page || gap chip, "Ask this" chip, source chips max 5, empty state.
- [ ] `renderGaps` (L3474): local events max 8 (`is-local`, reason meta) + gapQueue items max 16 (P0 `is-priority`, operator-parked `is-blocked`; priority/category/status meta; needed||summary; question/operator/parked counts chips; related page links max 4; sourceKeys max 5), empty state.
- [ ] `renderDiscordRouting` (L3520): pageFit rows max 10 (routedItems>1 `is-priority`; byReviewType breakdown; public-route count label singular/plural; coverageStatus chip), refusal rows max 8 (`is-blocked`), not-ready empty state, 8-row summary list (routing status, routed items + raw-text flag, answered/refusals, editorial queue counts, reviewer workflow status/mode/counts, promotion policy counts, route coverage x/y + single-route remaining, review actions breakdown).
- [ ] `renderRecent` (L3581): max 12, `status / score` meta, `query -> page`, dual mount (#recentQuestions + #journeyRecentQuestions).
- [ ] `renderRatings` (L3590): max 12, rating meta, `query -> page`.
- [ ] `renderMetrics` (L3600): 4 stat cards; service-mode math = service totals + local-fallback counts (answered = service byQuestionStatus.answered + local answered); gaps include `gapQueue.totalItems`.
- [ ] `renderQualityAudit` (L3619): gate rows (`is-pass`/`is-blocked`, `passed|open / id` meta, label, detail) + ~17-item coverage list (gates passing, reader-routable pages, journeys, seeded routes, FAQ seed, gap queue, glossary, source catalog, source ingestion, crosslinks, answer chunks, deterministic engine eval, LLM RAG contract readiness + adversarial cases, validation harness fixtures, compendium volumes, completion requirements, source coverage incl. unknown keys, operator inbox ids, tracked gaps).
- [ ] `renderRequirements` (L3670): requirement rows (`requirementClass`: complete→is-pass, parked→is-blocked, missing→is-local, else is-priority; status/category/id meta; evidence; spec-chips + blocks chips; nextAction) + 5-row summary (ready yes/no, complete x/y, partial, parked, missing).
- [ ] `renderSourceIngestion` (L3700): same row pattern + presentKeys max 8 + "Missing: …" line + 5-row summary.
- [ ] `renderInsights` composite ordering (L3736).
- [ ] Event log tools: `exportEventLog` (clipboard JSON `{source, questions, ratings, gaps}`, fallback prints into status, L3790), `clearEventLog` (removes 3 keys; different message when service insights present, L3814), status line `#eventLogStatus`.
- [ ] `renderServiceStatus` view (insights panel) — service connection line (also §4).

## 8. Guards / build (M8/M9)

- [ ] `npm run search-book:verify` stays green (all build steps + quality gates).
- [ ] Existing smokes stay green: `smoke-static`, `smoke-answer-engine-service` (+ new round-trip), `smoke-preview-service`, `smoke-deployment` where applicable.
- [ ] New Playwright smokes: search→answer→vote (persist + one-shot + dismiss-guard), page open→page-vote, nav across all views (M8).
- [ ] Old `index.html` untouched until M8 sign-off; static-serve/deploy wiring covers the new `web/dist` build (M9); `check-static-integrity` / `build-static-artifact` updated (M9).

## 9. Design-language deltas (intentional, not parity failures)

- Old visual system (Plus Jakarta Sans/Georgia, `--pink #f584ee`, rounded panels) is fully replaced by DESIGN.MD v3a — typography, tokens, square corners, hard shadows.
- The "⚡" degraded-banner glyph and any emoji are re-expressed without emoji (DESIGN.MD §10).
- Variant letters (A–F) may map to field-manual § numbering; all six destinations + reader must remain reachable and keyboard-cyclable.
- `../dashboard.html` back link becomes the sidebar "← Back to app" footer link (same href).
- Hard-coded seed stats in markup are replaced by real data at build time (SSG) — values must match the same fallback chains.
