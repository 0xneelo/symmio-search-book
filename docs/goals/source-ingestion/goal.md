# Goal: Search Book Source Ingestion Follow-Up

- Project: onboarding-app / search-book
- Repo: `/home/tabor/apps/symmio-search-book` (`symmio-search-book`, standalone root layout)
- Created: 2026-07-01
- Refreshed: 2026-07-01 after source-blocker reconciliation commit `10bd950`

## Current State

Source ingestion is no longer blocked on Notion, SSHE, or original-whitepaper recovery.

- `vibe-trading-notion` is registered with a paraphrase-only public-use boundary.
- SSHE v1 source boundary is registered as SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers and Clearing Layers.
- Original/oldest Symmio whitepaper recovery is out of scope for v1; current official Git/current-docs evidence is the launch boundary.
- Discord access/export decision is resolved, but the provided Windows export is still unreadable from WSL because the exporter has the file locked.

Latest verified generated state:

- `data/source-ingestion.json`: 16/17 complete, 0 partial, 1 parked, 0 missing.
- `data/discord-corpus.json`: `status:"parked-discord-export-file-unreadable"`, `corpusReady:false`.
- `data/requirement-map.json`: 12 complete, 2 partial, 4 parked, 0 missing.
- `data/quality-audit.json`: 27/30 gates; failures are `source-ingestion`, `operator-inbox`, and `discord`.

## Open Follow-Ups

- OPERATOR-INBOX #17 / SYN-289: release a readable copy of the provided Discord export so `scripts/build-discord-corpus.mjs` can import real messages.
- OPERATOR-INBOX #11 / SYN-281: install production VPS service env at `/etc/symmio-search-book/search-book.env`.
- OPERATOR-INBOX #4 / SYN-285: choose public frontend platform/repo/deploy route.

Only #11 and #4 are production operator gates. #17 is a source-import file-release follow-up, not a reopened Discord access decision.

## Definition Of Done

Source ingestion reaches 17/17 complete when the Discord export is readable and:

- `scripts/build-discord-corpus.mjs` imports real messages into `data/discord-corpus.*`.
- Lafa/community question clusters are reviewed and any launch-safe FAQ seeds are routed into authored/query data.
- `data/source-ingestion.json` has no parked source families.
- `npm run search-book:verify` passes.
- `PROGRESS.md`, `GAPS.md`, `FINAL-REPORT.md`, and `_local/agent-worklog.md` record the final before/after counts.

Production readiness still additionally requires #11 and #4.
