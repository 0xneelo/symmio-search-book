# LLM RAG Contract

This contract defines how production LLM answers must sit on top of the deterministic answer-engine fallback.

## Runtime Boundary

- Run deterministic exact-route, executable glossary, and reconciliation checks before LLM synthesis.
- Retrieve only from `data/answer-chunks.json` and page states allowed by `data/page-state-registry.json`.
- Let `source-companion` pages support context, but route public readers only to `candidate` or future `published` pages.
- Exclude `internal-draft` pages from model context and final answers.
- Keep provider choice out of this contract; model id and API key belong in environment/runtime configuration.

## Request And Response Shape

The generated artifact defines these provider-neutral shapes:

- `SearchBookAnswerRequest`
- `SearchBookRetrievalContext`
- `SearchBookRetrievedChunk`
- `SearchBookAnswerResponse`
- `SearchBookAnswerCitation`
- `SearchBookRefusal`

Production may add transport metadata, but answer semantics must stay compatible with those shapes.

## Citation Rules

- Every substantive paragraph needs at least one citation.
- Every citation must point to a known page id, known source key, linked source href, and retrieved chunk id.
- Unknown source keys, missing source links, internal-draft citations, and uncited substantive paragraphs block the answer.

## Refusal And Gap Rules

The LLM must refuse or create a gap event when:

- no grounded context exists;
- the question asks for secrets, private credentials, personal trading advice, or unsupported economics;
- a topic is parked in `OPERATOR-INBOX.md`;
- a source family such as Discord, Notion, SuperFlow/SSHE, or the original whitepaper is missing, or a source family such as Opyn has been explicitly excluded;
- the answer would depend on internal-draft pages.

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-llm-rag-contract.mjs
```

The generated artifact is `data/llm-rag-contract.json`. It currently proves the API contract, runtime harness, executable exact-route/glossary preflight, and 15 adversarial eval cases are specified. It also records the 2026-06-30 OpenAI-backed live `gpt-4.1-mini` validation run: 42/42 total fixtures passed, including 15/15 adversarial cases and 27/27 answer-validation cases, with 16 measured calls, 93,868 input tokens, 8,615 output tokens, and an estimated cost of $0.01924920. `llmProductionReady` intentionally remains false until service-environment credentials, public frontend/deploy wiring, remaining operator source decisions, and Discord/Lafa import are complete.

The executable response-shape checks live in `ANSWER-VALIDATION-HARNESS.md` and `data/answer-validation-report.json`. Runtime implementation should rerun those checks against actual model responses before production launch and after source-corpus changes.

## Runtime Harness

Run a grounded local answer without a model call:

```sh
node src/search-book/scripts/run-llm-rag-answer.mjs --query "What is Vibe Trading?" --json
```

Run model-backed synthesis only when these environment variables are set in the runtime environment:

```sh
SEARCH_BOOK_LLM_API_STYLE=openai-compatible
SEARCH_BOOK_LLM_ENDPOINT=<approved endpoint>
SEARCH_BOOK_LLM_MODEL=<approved model>
SEARCH_BOOK_LLM_API_KEY=<approved key>
SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true
```

Without that approved runtime configuration, `--mode llm` fails closed instead of sending private source context to an unapproved provider. Local live credentials may exist in a gitignored env file for evaluation; production still needs the same values installed in the service environment.

The standalone service entrypoint is:

```sh
SEARCH_BOOK_ANSWER_ENGINE_DB=/tmp/search-book-answer-engine.sqlite node src/search-book/scripts/serve-answer-engine.mjs
```

It calls the same runtime path as the CLI and persists question, rating, and gap events to SQLite. LLM API keys remain process environment values and are not printed or persisted.
