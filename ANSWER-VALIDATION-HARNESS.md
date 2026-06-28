# Answer Validation Harness

This harness validates the answer shapes that the production LLM runtime must emit.

## What It Checks

- cited answers use an allowed final page state;
- every citation points to a known page id, source key, source link, and retrieved chunk id;
- paragraph citation ids resolve to actual citations;
- refusals carry the expected refusal reason;
- refusal and operator-blocked answers create a gap event shape;
- gap ids and operator item ids resolve to the current gap queue and operator inbox signals.

## Fixture Sources

The generated report uses two fixture families:

- cited-answer fixtures sampled from the deterministic exact-route golden set;
- refusal fixtures derived from `data/llm-rag-contract.json` adversarial cases.

The harness does not call an LLM. It proves the response validator and fixture set are ready for the runtime implementation to execute against live answers.

## Generated Proof

Run:

```sh
node src/search-book/scripts/build-answer-validation-report.mjs
```

The generated artifact is `data/answer-validation-report.json`. It currently validates 12 cited-answer fixtures and 14 refusal fixtures. Production readiness still requires running the same validation against actual model responses.
