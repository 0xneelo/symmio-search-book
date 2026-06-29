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
- LLM synthesis, when added, must cite page ids and source keys for every substantive answer paragraph.
- Unknown source keys fail the contract.

## Feedback Rules

Prototype storage keys:

- Questions: `searchBookPrototype.questions`
- Ratings: `searchBookPrototype.ratings`
- Gaps: `searchBookPrototype.gaps`

Production must persist equivalent event shapes behind Search Insights. A low rating creates a `low-rated-answer` gap event. No grounded route creates a `no-grounded-page` gap event.

## Living-Docs Event Contract

`data/living-docs-events.json` turns the feedback rules into executable fixtures for question, rating, and gap events. It validates answered questions, no-grounded-page refusals, operator-blocked refusals, low ratings, linked gap ids, and linked operator inbox ids.

This proves the prototype event contract is ready while keeping `datastoreImplemented` and `livingDocsProductionReady` false until the production docs platform/backend and Discord import are resolved.

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-answer-engine-contract.mjs
node src/search-book/scripts/build-living-docs-events.mjs
```

The generated artifacts are `data/answer-engine-contract.json` and `data/living-docs-events.json`. The answer-engine contract currently proves 775 seeded exact-route tests and 4 refusal tests. The living-docs event contract validates 12 prototype event fixtures across question, rating, and gap events. `llmProductionReady` intentionally remains false until runtime citation validation, prompt-injection tests, operator-blocked source decisions, and Discord/Lafa import are done.

Glossary routing is now executable in the runtime harness and generated proof: 32/32 glossary route tests pass. Of those terms, 26 route to a public candidate page, 5 are retrieval-context-only until a public page is selected by chunk retrieval, and 1 is internal/blocked and must fail closed through the existing operator/refusal path.

The LLM synthesis layer is specified separately in `LLM-RAG-CONTRACT.md`. It must preserve this deterministic contract as its fallback and golden set.
