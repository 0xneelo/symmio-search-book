# Deterministic Answer-Engine Contract

This contract defines the non-LLM fallback that every production answer flow must preserve.

## Pipeline

1. Normalize the query: lowercase, strip non-alphanumeric characters, collapse whitespace, and tokenize without common stop words, including auxiliary verbs that should not drive retrieval.
2. Try exact seeded routes from `data/question-routes.json`.
3. Try executable glossary routing for term-definition questions and aliases from `data/glossary.json`.
4. Search retrieval chunks from `data/answer-chunks.json`, limited by `data/page-state-registry.json`.
5. If no grounded route exists, record a gap/refusal event instead of inventing an answer.

## Page-State Rules

- `candidate` and future `published` pages can be routed in public navigation.
- `source-companion` pages can support retrieval and authoring, but should not appear as the final public answer page.
- `internal-draft` pages must stay out of public navigation and answer synthesis until reconciled.

## Citation Rules

- Every exact route must resolve to a known page.
- Every exact route must carry source keys.
- Every exact route must have at least one linked registered source.
- LLM synthesis must cite page ids and source keys for every substantive answer paragraph.
- Unknown source keys fail the contract.

## Feedback Rules

Prototype storage keys:

- Questions: `searchBookPrototype.questions`
- Ratings: `searchBookPrototype.ratings`
- Gaps: `searchBookPrototype.gaps`

Production must persist equivalent event shapes behind Search Insights. A low rating creates a `low-rated-answer` gap event. No grounded route creates a `no-grounded-page` gap event. The static prototype can now call the standalone service for Ask, rating, Search Insights, and optional dynamic examples when configured with a service URL, while preserving `localStorage` and curated-example fallback. The service applies a configurable retention window to question, rating, gap, and answer-cache rows, exposes a disabled-by-default token-gated moderation export for reviewer triage, can reuse helpful-rated answers after guardrail preflight, and has a local reviewer summary job, backup/restore-check utility, and internal operations runbook for the editorial cadence.

## Living-Docs Event Contract

`data/living-docs-events.json` turns the feedback rules into executable fixtures for question, rating, and gap events. It validates answered questions, no-grounded-page refusals, operator-blocked refusals, low ratings, linked gap ids, and linked operator inbox ids.

This proves the event contract is ready. The standalone service now persists equivalent event shapes to SQLite, the static frontend has an optional configured-service bridge, and the service has retention, helpful-answer reuse, dynamic examples, a gated moderation export, a direct SQLite gap-summary job for internal reviewers, a backup/restore-check utility, and `LIVING-DOCS-OPERATIONS.md` for reviewer triage. `livingDocsProductionReady` remains false until deployment/public route, production LLM service env, production moderation access, production backup storage/cadence, assigned reviewer owner/cadence, and Discord import are resolved.

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-answer-engine-contract.mjs
node src/search-book/scripts/build-living-docs-events.mjs
```

The generated artifacts are `data/answer-engine-contract.json` and `data/living-docs-events.json`. The answer-engine contract currently proves 798 seeded exact-route tests and 2 refusal tests. The living-docs event contract validates 12 event fixtures across question, rating, and gap events; `scripts/serve-answer-engine.mjs` persists the same shapes plus `search_book_answer_cache` to SQLite, prunes them under `SEARCH_BOOK_ANSWER_ENGINE_RETENTION_DAYS`, reuses helpful-rated answers as `source:"reuse-cache"` only after guardrail preflight, exposes `GET /api/search-book/examples` for optional dynamic example chips, and exposes `GET /api/search-book/moderation` only when token-gated export is enabled; `scripts/summarize-living-docs-gaps.mjs` reads the same SQLite datastore and emits internal markdown or JSON reviewer summaries; `scripts/backup-answer-engine-db.mjs` creates SQLite-consistent backup manifests and verifies restore viability; `LIVING-DOCS-OPERATIONS.md` defines the daily/weekly reviewer workflow and privacy boundaries; and `index.html?service=...` can read/write through the public answer/rating/insights/examples endpoints. `llmProductionReady` intentionally remains false even though runtime citation validation and live `gpt-4.1-mini` evals have passed, because production service env, public route/deploy wiring, source-ingestion decisions, and Discord/Lafa import are still open.

Glossary routing is now executable in the runtime harness and generated proof: 32/32 glossary route tests pass. Of those terms, 26 route to a public candidate page, 5 are retrieval-context-only until a public page is selected by chunk retrieval, and 1 is internal/blocked and must fail closed through the existing operator/refusal path.

The LLM synthesis layer is specified separately in `LLM-RAG-CONTRACT.md`. It must preserve this deterministic contract as its fallback and golden set.
