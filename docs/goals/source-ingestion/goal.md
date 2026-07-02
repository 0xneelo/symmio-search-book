# Goal: Search Book Source Ingestion Completed State

- Project: onboarding-app / search-book
- Repo: `/home/tabor/apps/symmio-search-book` (`symmio-search-book`, standalone root layout)
- Created: 2026-07-01
- Refreshed: 2026-07-02 after Discord import and source-ingestion completion

## Current State

Source ingestion is complete for v1 and no longer blocked on Notion, SSHE, original-whitepaper recovery, Discord, or #17.

- `vibe-trading-notion` is registered with a paraphrase-only public-use boundary.
- SSHE v1 source boundary is registered as SuperFlow/SHE OpenAPI plus Symmio Foundation Meta-Solvers and Clearing Layers.
- Original/oldest Symmio whitepaper recovery is out of scope for v1; current official Git/current-docs evidence is the launch boundary.
- Discord access/export and #17 file-release are resolved. The real corpus is imported in internal-only mode without storing raw message text in committed data.

Latest verified generated state:

- `data/source-ingestion.json`: 17/17 complete, 0 partial, 0 parked, 0 missing, `sourceCompletionReady:true`.
- `data/discord-corpus.json`: `status:"imported-needs-review"`, `corpusReady:true`, 5,000 imported messages, 723 question clusters, 837 configured Lafa answer candidates, `storesMessageText:false`.
- `data/requirement-map.json`: 14 complete, 2 partial, 2 parked, 0 missing, `completionReady:false`.
- `data/quality-audit.json`: 29/30 gates; the remaining failed gate is the expected production `operator-inbox` boundary.

## Remaining Production Gates

- OPERATOR-INBOX #11 / SYN-281: install production VPS service env at `/etc/symmio-search-book/search-book.env`.
- OPERATOR-INBOX #4 / SYN-285: choose public frontend platform/repo/deploy route.

Only #11 and #4 are production operator gates. #17 is resolved and must not be reopened.

## Maintenance Rules

- Keep `data/source-ingestion.json` at 17/17 complete unless a genuinely new source family is added.
- Keep Discord review internal-only: do not publish raw Discord/Lafa text or exact community claims without reviewer approval.
- Promote only launch-safe, cite-backed Discord demand signals into FAQ/routes/authored copy.
- After any source-corpus change, run `npm run search-book:verify`, `npm run search-book:check-status-evidence`, and `git diff --check`.
- If a new source-access issue appears, log a new scoped OPERATOR-INBOX item; do not reopen #2, #5, #6, #7, #12, or #17.

Production readiness still additionally requires #11 and #4.
