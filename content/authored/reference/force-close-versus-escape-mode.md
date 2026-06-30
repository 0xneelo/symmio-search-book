---
id: "authored-force-close-versus-escape-mode"
title: "Force Close Versus Escape Mode"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/ii-comparsion-to-other-protocols", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-ii-comparsion-to-other-protocols", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "authored-solver-operational-failure-force-close"]
volumeId: "volume-05-solver-lp-and-protocol-operations"
---

# Force Close Versus Escape Mode

The DDQ compares two recovery philosophies for off-chain component failure.

An escape-mode system is designed for catastrophic operator failure. It gives users a trust-minimized path to recover account state or withdraw after a prolonged failure window. That is useful for funds safety, but it is not the same as trader-grade position management.

Vibe's Force Close model is described as position-level recovery. If the solver is unresponsive, the user can submit an on-chain close request, wait through a protocol timer, provide a valid proof, and finalize a close without solver cooperation.

## Why The Difference Matters

Leveraged positions can become unsafe quickly. A whole-account recovery mechanism that activates only after a long outage can protect custody, but it does not necessarily let a trader close a specific bleeding position while the market is moving.

The DDQ therefore frames Force Close as surgical rather than global. The user is not asking the system to unwind the whole account or enter emergency withdrawal mode. The user is asking to close a specific position through an on-chain escape path when the solver path is unavailable.

## Trust-Minimized, Not Risk-Free

The source's comparison should not be read as "there is no risk if a solver goes offline." Force Close reduces dependence on solver uptime, but it still leaves market-movement risk during the timer, proof, and execution window. It also depends on production proof availability, proof freshness, supported markets, and UI behavior.

## Publication Boundary

This page can publish the source-backed distinction between position-level Force Close and broader escape-mode recovery. Exact production Force Close availability, timer values, proof-network details, proof freshness constraints, supported position types, and fallback UI remain implementation-review items before publication as current production behavior.

## Sources

- `vibe-papers`: Neelo DDQ, "Comparsion to other Protocols".
- `vibe-papers`: Neelo DDQ, "Operational Failure".

## Related Pages

- `authored-solver-operational-failure-force-close`
- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-ii-comparsion-to-other-protocols`
