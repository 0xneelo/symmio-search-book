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
- a source family such as Discord, Notion, SuperFlow/SSHE, Opyn, or the original whitepaper is missing;
- the answer would depend on internal-draft pages.

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-llm-rag-contract.mjs
```

The generated artifact is `data/llm-rag-contract.json`. It currently proves the API contract, runtime harness, executable exact-route/glossary preflight, and 14 adversarial eval cases are specified. `llmProductionReady` intentionally remains false until approved model credentials, live model-response validation, prompt-injection test execution, operator-blocked source decisions, server persistence, and Discord/Lafa import are complete.

The executable response-shape checks live in `ANSWER-VALIDATION-HARNESS.md` and `data/answer-validation-report.json`. Runtime implementation should run those checks against actual model responses before production launch.

## Runtime Harness

Run a grounded local answer without a model call:

```sh
node src/search-book/scripts/run-llm-rag-answer.mjs --query "What is Vibe Trading?" --json
```

Run model-backed synthesis only after OPERATOR-INBOX item #11 is resolved and these environment variables are set:

```sh
SEARCH_BOOK_LLM_API_STYLE=openai-compatible
SEARCH_BOOK_LLM_ENDPOINT=<approved endpoint>
SEARCH_BOOK_LLM_MODEL=<approved model>
SEARCH_BOOK_LLM_API_KEY=<approved key>
SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true
```

Without that approved runtime configuration, `--mode llm` fails closed instead of sending private source context to an unapproved provider.
