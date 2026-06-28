# Vibe x Symmio Search Book

Session 1 research package and throwaway answer-engine prototype for the Vibe x Symmio documentation compendium.

This directory is intentionally isolated from the existing dashboard. It is not the production docs implementation yet.

## Current State

- Research dossier: `research-dossier.md`
- Progress log: `PROGRESS.md`
- Source registry: `SOURCES.md`
- Product/content decisions: `DECISIONS.md`
- Gaps and contradictions: `GAPS.md`
- Tracked reader questions: `QUESTIONS.md`
- Seed question dataset: `data/seed-questions.json`
- Editorial and UI style guide: `STYLEGUIDE.md`
- 500-800 page manifest: `page-manifest.json`
- Generated draft content corpus: `content/generated/`
- Authored publication-candidate pages: `content/authored/`
- Authored page index: `data/authored-pages.js`
- Compact prototype search index: `data/search-index.js`
- Generated browse/navigation tree: `data/navigation-tree.js`
- Throwaway static prototype with exact-page reader: `index.html`

Open `index.html` directly in a browser. It uses local data and `localStorage`; no backend, secrets, or live APIs are required.

Open an exact local page with `index.html?page=authored-intents-complete-order-books` or any page id from `data/search-index.json`.

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
- This is not a production vector search or Claude-backed answer engine.
- This does not mine Discord yet; Discord access remains a documented blocker.
- This does not expose private API URLs, tokens, admin endpoints, or operator-only credentials.

## Verification

Focused checks for this package:

```sh
node src/search-book/scripts/build-page-manifest.mjs --input /tmp/vibe_docs/Website/public/generated/docs-data.json --out /tmp/search-book-page-manifest.json
node src/search-book/scripts/build-content-corpus.mjs --docs-root /tmp/vibe_docs/Docs/public --docs-data /tmp/vibe_docs/Website/public/generated/docs-data.json
node src/search-book/scripts/build-authored-index.mjs
node src/search-book/scripts/build-navigation-tree.mjs
node --check src/search-book/answer-corpus.js
node --check src/search-book/scripts/build-page-manifest.mjs
node --check src/search-book/scripts/build-content-corpus.mjs
node --check src/search-book/scripts/build-authored-index.mjs
node --check src/search-book/data/authored-pages.js
node --check src/search-book/scripts/build-navigation-tree.mjs
node --check src/search-book/data/navigation-tree.js
node -e "const d=require('./src/search-book/data/authored-pages.json'); if (!d.pages.every((p)=>p.bodyMarkdown)) process.exit(1); console.log(d.totalPages)"
node -e "const m=require('./src/search-book/page-manifest.json'); if (!m.pages || m.pages.length < 500 || m.pages.length > 800) process.exit(1); console.log(m.pages.length)"
rg -n "VIBE_BACK_URL|PRIVATE|TOKEN|SECRET|ADMIN|0x[a-fA-F0-9]{40}" src/search-book
git diff --check -- src/search-book _local/agent-worklog.md
```
