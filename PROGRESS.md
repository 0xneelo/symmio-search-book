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

## Still Open

- Full editorial rewrite into final publication pages.
- Discord/Lafa FAQ import after operator provides export.
- Revenue disclosure boundary.
- Referral-depth public stance.
- Production docs platform/repository decision.
- Deployed/preview production docs site.
