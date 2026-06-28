# Progress

## 2026-06-28 — Session 1 Dossier And Manifest

- Created the research dossier, source registry, decisions, gaps, style guide, question ledger, and seed questions.
- Built a 794-page manifest for the operator's 500-800 page target.
- Used Neelo's GitHub docs as the backbone: 188 source pages and 541 section expansions.
- Added 65 companion pages for Vibe public docs, Symmio protocol docs, local dashboard implementation, Linear research, and HIP-3 context.
- Added a static throwaway answer-engine prototype.
- Checkpoint commits: `edebeba`, `b892f9a`.

## 2026-06-28 — Generated Content Corpus

- Added `scripts/build-content-corpus.mjs`.
- Generated 794 source-traceable draft markdown files under `content/generated/`.
- Generated compact search indexes: `data/search-index.json` and `data/search-index.js`.
- Wired the static prototype to search the generated 794-entry index.
- Current corpus status:
  - 187 source pages imported from primary Neelo markdown.
  - 1 source page imported from generated Neelo HTML because markdown was excluded from the local clone.
  - 541 section pages extracted from primary Neelo H2 sections.
  - 63 companion pages source-mapped for later authoring.
  - 2 companion pages intentionally marked `needs-reconciliation`.

## 2026-06-28 — Navigation And Living-Docs Prototype

- Added `scripts/build-navigation-tree.mjs`.
- Generated `data/navigation-tree.json` and `data/navigation-tree.js` from the manifest plus search index.
- Expanded `index.html` from three prototype variants into Ask & search, Browse docs, Journeys, and Search insights.
- Browse docs now renders the full 794-page corpus grouped across 22 sections and 49 tracks.
- Search insights now reads local question, rating, and gap events; low-rated or unanswered answers become local gap rows.
- Improved static routing so high-signal curated pages stay in the search set alongside generated pages.

## 2026-06-28 — Authored Publication Candidates

- Added 12 hand-shaped pages under `content/authored/`.
- Added `scripts/build-authored-index.mjs`.
- Generated `data/authored-pages.json` and `data/authored-pages.js`.
- Wired the prototype to search authored pages before curated routes and generated draft pages.
- Covered initial manifesto/reference spine: bootstrap trilemma, intents/order books, Vibe discovery layer, intents/solvers, PartyA/PartyB, Vibe trade flow, revenue, volume, points, referral-depth gap, living-docs loop, and core glossary.

## 2026-06-28 — Exact Page Reader

- Added addressable page rendering with `index.html?page=<page-id>`.
- Extended `scripts/build-authored-index.mjs` so authored pages carry full Markdown bodies into `data/authored-pages.{json,js}`.
- Search answers, authored cards, high-signal routes, Browse docs rows, Journey chips, and related-page chips now open the local reader instead of raw file paths.
- The reader renders authored Markdown, generated-page previews, source keys, source URLs, related pages, indexed routes, and page-level feedback.
- Page feedback writes into the same local ratings and gaps queues used by Search insights.

## 2026-06-28 — Publication Quality Audit

- Added `scripts/build-quality-audit.mjs`.
- Generated `data/quality-audit.json` and `data/quality-audit.js`.
- The audit checks manifest target size, generated-file parity, search-index parity, registered source-key coverage, source URL coverage, authored bodies, duplicate ids, open operator blockers, and Discord/Lafa import status.
- Current audit result: 7 of 9 gates pass. The two open gates are expected parked requirements: operator inbox resolution and Discord/Lafa corpus import.
- Search insights now renders a Publication Audit panel with gate rows, source coverage, reader-routable page count, open operator items, and tracked gaps.

## 2026-06-28 — Dashboard View Reference Pages

- Added 7 hand-authored dashboard reference pages for Overview, My invites, My network, Volume, Tasks, FAQ, and Settings.
- Registered per-view dashboard source keys so view-specific claims cite the exact local component, not only the dashboard shell.
- Extended the question ledger with dashboard operational questions so Ask can route directly to the authored view pages.
- These pages satisfy the "every dashboard view" reference-scope requirement except for final revenue, Discord/Lafa FAQ, and referral-depth wording that remain parked in the operator inbox.

## Still Open

- Full editorial rewrite into final publication pages.
- Discord/Lafa FAQ import after operator provides export.
- Revenue disclosure boundary.
- Referral-depth public stance.
- Production docs platform/repository decision.
- Deployed/preview production docs site.
