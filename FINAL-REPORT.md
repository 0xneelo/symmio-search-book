# Search Book Final Report

Generated for the current `search-book/research-dossier` checkpoint on 2026-06-30. This report is intentionally explicit about remaining production work: the Search Book dossier, prototype, and answer runtime are verified, but the overall mission is not production-complete until the parked source and deploy decisions are resolved or carried into an approved release plan.

## Current Status

The Search Book now has a 500-800 page compendium shape with 794 manifest pages, 799 authored pages, 8 volumes, 104 chapters, and 1,593 reader-routable pages assigned to volumes. The first 136 authored pages are marked `published`; the remaining authored pages stay in candidate/review states. The generated corpus stays inside the requested 500-800 page target while the reader layer includes authored pages plus source companions for traceability.

The authored layer now covers every generated source companion: `data/publication-plan.*` reports 792 source companions queued, 792 covered by authored pages, 0 needing authored coverage, and 662 candidate pages still in the review queue. The remaining candidate review lanes are 23 final-review-ready pages, 619 operator-review pages, 9 source-refresh pages, 8 publication-date-review pages, and 3 editorial-review pages. Source companions remain retrieval and traceability material, not public navigation pages.

The answer-engine front door is implemented as a static prototype plus a shared runtime and standalone SQLite-backed service boundary. The deterministic route map has 797 exact question routes, 32 glossary routes, 2 refusal routes, 2,861 retrieval chunks, and 799 local FAQ entries. The static prototype can be opened directly at `src/search-book/index.html`; the service can be run locally with `SEARCH_BOOK_ANSWER_ENGINE_DB=/tmp/search-book-answer-engine.sqlite node src/search-book/scripts/serve-answer-engine.mjs` and connected with `index.html?service=http://127.0.0.1:8787`.

The live OpenAI-compatible RAG runtime passed the recorded SYN-215 eval with `gpt-4.1-mini`: 42/42 total cases, 15/15 adversarial refusals, and 27/27 answer-validation fixtures. Measured usage was 15 calls, 83,278 input tokens, 7,672 output tokens, and an estimated cost of `$0.01709490` at the recorded `gpt-4.1-mini` pricing. This is runtime evidence, not a deployed-service readiness claim.

Quality status is still intentionally not green for launch. The latest audit passes 27/30 gates. The failing gates are required-source ingestion, operator inbox, and Discord/Lafa corpus import. The regenerated definition-of-done map has no missing report artifact, but remains not completion-ready because production/source items are still partial or parked.

## Verification Evidence

Use these commands as the current reproducible verification path:

```sh
node src/search-book/scripts/build-all.mjs --verify
npm run search-book:verify
node src/search-book/scripts/run-llm-rag-answer.mjs --mode extractive --query "Which dashboard views are documented?" --json
git diff --check -- src/search-book _local/agent-worklog.md
npm run build --if-present
```

The canonical build verifies 24 deterministic build steps, 52 syntax checks, exact-route integrity, FAQ routing, answer chunks, authored-page indexing, requirement coverage, quality-audit gates, and the native sensitive-pattern scan. Live LLM evaluation is not part of every deterministic rebuild because it requires private service credentials and must never print the API key; its latest recorded result is stored in `data/llm-rag-contract.json`.

## Requirement Summary

| Area | Current evidence | Release status |
| --- | --- | --- |
| Page target | 794 manifest pages against the 500-800 target | Verified for dossier/prototype |
| Authored layer | 799 authored pages across manifesto, product, rewards, dashboard, protocol, answer-engine, glossary, and compendium sections; 136 published pages; 792/792 source companions covered by authored pages; 23 candidate pages ready for final review before the operator/source/editorial lanes | Partially published; most pages still need final source/deploy review |
| Dashboard reference | 13 dashboard-reference pages, including every visible dashboard route plus hidden `#revenue` route | Documented, with production copy gates preserved |
| Answer engine | 797/797 exact routes, 32/32 glossary routes, 2/2 refusal routes | Deterministic runtime verified |
| LLM RAG | 42/42 live eval on `gpt-4.1-mini` | Runtime verified; production env/deploy still parked |
| Living docs | 12/12 event fixtures, SQLite service, frontend bridge, retention policy, gated moderation export | Implemented locally; production operations still parked |
| Source ingestion | 13/17 complete, 1 partial, 3 parked | Not source-complete |
| Competitive sweep | 49/50 official docs verified; Opyn excluded | Accepted benchmark baseline |
| Deploy preview | Static local prototype exists | Production deploy route parked |

## Remaining Production Work

The following open operator items are the current production boundary. They are not re-asked here; this report records them so the next operator or agent can resume from `_specs/app-docs/OPERATOR-INBOX.md`.

- OPERATOR-INBOX #12: checkpoint commit approval timed out for an older fifteenth-pass design checkpoint. This does not block the committed Search Book content/runtime work, but it blocks that specific design checkpoint history.
- OPERATOR-INBOX #11: production service environment still needs the deployed `SEARCH_BOOK_LLM_MODEL` and `SEARCH_BOOK_LLM_API_KEY`; local live eval credentials exist separately and must not be printed.
- OPERATOR-INBOX #7: SuperFlow/SHE is registered, but SSHE remains unidentified or unexcluded for final source-completeness claims.
- OPERATOR-INBOX #6: the exact original/oldest Symmio whitepaper or archived earliest-docs artifact is still needed for the origin-story comparison.
- OPERATOR-INBOX #5: the Vibe Trading Notion link is known, but ingestion and public-use boundaries are still pending.
- OPERATOR-INBOX #4: the public frontend platform, repository owner, and deploy route are still undecided; backend architecture is decided as a standalone service plus SQLite.
- OPERATOR-INBOX #2: Discord export/API access, channel scope, Lafa identity mapping, and public-use boundary are still needed for the Discord-seeded FAQ.

Until those items move, the Search Book should be described as a verified research dossier, static prototype, and answer-engine runtime, not as the final deployed production docs site.

## Handoff Notes

Keep edits scoped because the repository has unrelated dashboard/spec/deploy/demo WIP. Before each new Search Book phase, read `_local/agent-worklog.md`, `_specs/app-docs/OPERATOR-INBOX.md`, and the pasted objective at `/home/tabor/.codex/attachments/4632c9a8-89bd-47cd-9f2b-514b80548daa/pasted-text-1.txt`.

The next highest-value production work is to resolve or ingest the parked source families when operator input arrives, then deploy the static frontend plus standalone service behind the selected public route. After any source-corpus change, rerun `node src/search-book/scripts/build-all.mjs --verify`; after any prompt/runtime/deploy change, rerun the live LLM eval with the service credentials loaded through `--env-file` without printing secrets.
