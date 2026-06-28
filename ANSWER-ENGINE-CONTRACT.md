# Deterministic Answer-Engine Contract

This contract defines the non-LLM fallback that every production answer flow must preserve.

## Pipeline

1. Normalize the query: lowercase, strip non-alphanumeric characters, collapse whitespace, and tokenize without common stop words.
2. Try exact seeded routes from `data/question-routes.json`.
3. Try glossary routing for term-definition questions.
4. Search retrieval chunks from `data/answer-chunks.json`, limited by `data/page-state-registry.json`.
5. If no grounded route exists, record a gap/refusal event instead of inventing an answer.

## Page-State Rules

- `candidate` and future `published` pages can be routed in public navigation.
- `source-companion` pages can support retrieval and authoring, but should not appear as final public prose.
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

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-answer-engine-contract.mjs
```

The generated artifact is `data/answer-engine-contract.json`. It currently proves 171 seeded exact-route tests and 7 refusal tests. `llmProductionReady` intentionally remains false until runtime citation validation, prompt-injection tests, operator-blocked source decisions, and Discord/Lafa import are done.

The LLM synthesis layer is specified separately in `LLM-RAG-CONTRACT.md`. It must preserve this deterministic contract as its fallback and golden set.
