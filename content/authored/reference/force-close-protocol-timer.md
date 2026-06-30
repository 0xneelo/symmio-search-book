---
id: "authored-force-close-protocol-timer"
title: "Force Close Protocol Timer"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/iii-operation-failure-aftermath"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-iii-operation-failure-aftermath", "authored-solver-operational-failure-force-close"]
---

# Force Close Protocol Timer

The DDQ Force Close flow includes an on-chain timer after the user posts a Force Close request. The timer gives the protocol a defined waiting window before the user can finalize a close without solver cooperation.

The source gives illustrative minutes-level timing. It describes a path where the user posts the request on-chain, the request is confirmed, the timer runs, and the user then supplies a valid proof to close the position.

## What The Timer Is For

The timer is the handoff from "the solver did not respond" to "the user can use a proof-based on-chain close." It prevents the recovery path from being only a frontend action while still avoiding the long delay of whole-account escape systems.

For leveraged trading, this is the practical difference. A timer measured in minutes is designed for position risk management; a recovery path measured in days is designed for catastrophic account recovery.

## Publication Boundary

Do not publish the source's example timing as final production behavior unless implementation review confirms it. Exact timer duration, block-confirmation assumptions, proof-generation timing, chain support, and UI copy remain operator and engineering review items.

## Sources

- `vibe-papers`: Neelo DDQ, "Operational Failure" and "Operation failure aftermath".

## Related Pages

- `authored-solver-operational-failure-force-close`
- `authored-force-close-latency-risk`
- `authored-force-close-versus-escape-mode`
