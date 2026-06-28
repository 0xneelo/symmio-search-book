# Decisions

## D-001: Start With A Session 1 Dossier Before Writing The Full Book

**Decision:** Build a research package, source registry, gaps list, questions list, and 500-800 page manifest before authoring full pages.

**Reason:** The prompt requires source-traceable long-form documentation. Current repo facts, public docs, and Linear issues contain contradictions that would become costly if baked into polished prose too early.

**Status:** Accepted for this phase.

## D-002: Use A Static Throwaway Prototype For The Front Door

**Decision:** Put a self-contained static prototype in `src/search-book/index.html` with local corpus data in `answer-corpus.js`.

**Reason:** The repo currently has a lightweight static frontend pattern and no docs framework dependency. This lets us test the answer-loop interaction without adding platform lock-in or touching dashboard code.

**Status:** Accepted for Session 1. Must be deleted or absorbed when a production platform is chosen.

## D-003: Keep Platform Choice Open Until Phase 0 Is Explicitly Resolved

**Decision:** Do not commit to Mintlify, Fumadocs, GitBook, or a custom docs app in this package.

**Reason:** The prompt calls out a build/buy decision. A docs platform choice needs owner approval on repo location, auth, analytics, answer-engine implementation, and update workflow.

**Status:** Pending operator decision.

## D-004: Treat Revenue Rates As Configurable Current Inputs

**Decision:** The docs may explain the current revenue formula and dashboard implementation, but rates must be labeled as configurable/current, not immutable protocol law.

**Reason:** Local code defaults to a platform-fee and referrer-share formula, while Linear issues describe Phase B revenue sources that are not fully implemented.

**Status:** Accepted.

## D-005: Treat Referral Depth As A Contradiction Until Reconciled

**Decision:** Do not publish a single final answer for referral depth without reconciliation. The dossier tracks 5-level and 15-level evidence separately.

**Reason:** Local code defaults/config support 5 or 15 levels, FAQ copy says 15, and rollout issues describe 15-level deployment/backfill. Some older comments and surfaces still say 5.

**Status:** Open gap.

## D-006: Use Vibe Docs Branding For This Prototype

**Decision:** The prototype follows the app-docs mockup direction: dark navy, Vibe pink, restrained editorial layout, mono metadata.

**Reason:** The search-book spec and mockup are Vibe-branded. The broader repo AGENTS guidance is Ivy-oriented, but this task is scoped to Vibe x Symmio docs.

**Status:** Accepted for prototype.

## D-007: Do Not Publish Secrets Or Private Operational Coordinates

**Decision:** Source summaries can mention data classes and implementation paths, but must not expose env names beyond already-public local code names, credentials, private endpoints, or operator-only tokens.

**Reason:** The final book is public/user-facing. Research notes must be safe to promote.

**Status:** Accepted.

## D-008: Treat Neelo's GitHub Docs As The Vision Backbone

**Decision:** Use `0xneelo/vibe_docs` as the primary vision source for the compendium's category thesis, market-formation narrative, listing-power framework, proof-of-value arc, funding model, referral architecture, and Vibe's role relative to order books.

**Reason:** The operator identified Neelo's GitHub docs as the strongest vision source. They also provide 17 collections and 188 generated source pages with enough internal section structure to support a 500-800 page compendium without filler.

**Status:** Accepted.

## D-009: Raise The Manifest Target To 500-800 Pages

**Decision:** The page manifest targets 500-800 pages, currently 794 entries: 188 Neelo source pages, 541 Neelo section expansions, and 65 companion product/protocol/local pages.

**Reason:** The operator raised the scope from 100 pages to a 500-800 page compendium. Section expansion keeps the scale source-traceable instead of inventing placeholder pages.

**Status:** Accepted.

## D-010: Generate A Transparent Draft Corpus Before Editorial Rewrite

**Decision:** Generate `content/generated/` from `page-manifest.json` as source-traceable draft material, not final publication copy.

**Reason:** The compendium needs hundreds of cited pages. The safest next step is to surface every mapped page as a concrete draft with status frontmatter, source URLs, and extracted primary-source content where available. This gives future agents and editors real material to restructure without pretending companion pages or unresolved contradictions are complete.

**Status:** Accepted for the build pipeline.

## D-011: Keep The Prototype Platform-Neutral But Exercise The Living-Docs Loop

**Decision:** Add generated navigation data and local question/rating/gap persistence to the static prototype before choosing the final docs platform.

**Reason:** The platform/repo/backend decision is parked with the operator, but the final product still needs an ask-first front door, browseable IA, ratings, question tracking, and a gaps queue. A deterministic static loop lets the team test those mechanics against the full 794-page corpus without pretending it is the final vector/Claude-backed production engine.

**Status:** Accepted for prototype iteration.

## D-012: Add An Authored Layer Separate From Generated Drafts

**Decision:** Keep `content/generated/` as source-traceable draft material and add `content/authored/` for hand-shaped publication candidates.

**Reason:** The compendium needs hundreds of mapped pages, but the final site also needs a clear editorial layer that argues, explains, cross-links, and labels unresolved claims. Separating authored pages from generated imports prevents raw source extracts from being mistaken for finished docs.

**Status:** Accepted for Session 2 authoring.

## D-013: Add A Static Exact-Page Reader Before Platform Selection

**Decision:** Keep the prototype static, but add addressable `?page=<id>` page rendering for authored and generated pages. Authored pages render full Markdown from the authored index; generated pages render indexed previews with status/source metadata.

**Reason:** The answer engine requirement is not just search. A reader must be routed to the exact page, see sources, rate usefulness, and continue to related material. This can be exercised locally without deciding Mintlify, Fumadocs, or a custom production app.

**Status:** Accepted for prototype iteration.

## D-014: Treat Publication Readiness As A Generated Audit

**Decision:** Add a deterministic `quality-audit` dataset that checks manifest size, generated-file parity, search-index parity, source-key and source-URL coverage, authored page bodies, duplicate ids, and unresolved operator/Discord gates.

**Reason:** The compendium is large enough that readiness cannot be judged by manual scanning. A generated audit keeps source traceability, parked blockers, and remaining editorial work visible without claiming the static prototype is final production.

**Status:** Accepted for QA and handoff.

## D-015: Document Dashboard Views As First-Class Reference Pages

**Decision:** Add authored reference pages for every dashboard view named in the spec: Overview, My invites, My network, Volume, Tasks, FAQ, Settings, plus the already covered hidden revenue route.

**Reason:** The final compendium must onboard users into the product, not only the protocol thesis. The dashboard is where revenue, volume, points, referral status, invite safety, and settings semantics become observable, so each view needs a directly routable page.

**Status:** Accepted for the authored layer.

## D-016: Promote Neelo Vision Pages Into The Authored Spine

**Decision:** Convert high-leverage Neelo GitHub draft material into hand-authored manifesto and reference pages before attempting a full editorial rewrite of all 794 mapped pages.

**Reason:** Neelo's corpus is the strongest vision source and already supplies the category thesis. Authored synthesis pages make that thesis searchable and routable now while generated section pages preserve the full 500-800 page map for later expansion.

**Status:** Accepted for the authored layer.

## D-017: Generate Guided Journeys From Exact Page IDs

**Decision:** Store role-based journeys as generated data with validated page ids, then render them in the static prototype.

**Reason:** The spec requires the docs to onboard readers into the system. Hardcoded journey copy in the prototype can drift from the authored/indexed corpus; a generated map lets the audit catch broken routes while keeping the final platform decision open.

**Status:** Accepted for prototype iteration.

## D-018: Prefer Seeded Question Routes Before Fuzzy Search

**Decision:** Generate `data/question-routes.*` from `QUESTIONS.md` and let the prototype answer engine check those routes before scoring the full corpus.

**Reason:** The living-docs loop requires tracked questions to shape retrieval. The current fuzzy search is useful, but explicit question-led routes are better evidence that known user questions resolve to exact pages and can be audited for drift.

**Status:** Accepted for prototype iteration.
