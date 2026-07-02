# Answer Validation Harness

This harness validates the answer shapes that the production LLM runtime must emit.

## What It Checks

- cited answers use an allowed final page state;
- every citation points to a known page id, source key, source link, and retrieved chunk id;
- paragraph citation ids resolve to actual citations;
- the AMFQ/aMFQ terminology fixture expands Automated Market for Quotes, frames it as legacy naming, and translates it to current Intents language;
- refusals carry the expected refusal reason;
- refusal and operator-blocked answers create a gap event shape;
- gap ids and operator item ids resolve to the current gap queue and operator inbox signals.

## Fixture Sources

The generated report uses three fixture families:

- cited-answer fixtures sampled from the deterministic exact-route golden set;
- grounded adversarial fixtures that must answer with approved operator decisions instead of refusing;
- refusal fixtures derived from `data/llm-rag-contract.json` adversarial cases.

The cited-answer set intentionally includes `What was AMFQ?` as a terminology regression fixture. The validator requires that answer shape to treat AMFQ/aMFQ as legacy "Automated Market for Quotes" naming for Intents, not as a separate live system.

The harness does not call an LLM. It proves the response validator and fixture set are ready for the runtime implementation to execute against live answers.

## Generated Proof

Run:

```sh
node scripts/build-answer-validation-report.mjs
```

The generated artifact is `data/answer-validation-report.json`. It currently validates 12 cited-answer fixtures and 12 refusal fixtures. Production readiness still requires running the same validation against actual model responses.

Current generated coverage is 28/28 passing fixtures with 0 failures: 12 cited-answer fixtures, 4 grounded adversarial fixtures, and 12 refusal fixtures. The fixture set is checked against the 890 exact-route golden set and 16 adversarial golden set. This generated-proof section is checked by `npm run search-book:check-status-evidence` against `data/answer-validation-report.json`.
