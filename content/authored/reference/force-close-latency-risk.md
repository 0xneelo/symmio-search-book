---
id: "authored-force-close-latency-risk"
title: "Force Close Latency Risk"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/iii-operation-failure-aftermath", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-iii-operation-failure-aftermath", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "authored-solver-operational-failure-force-close"]
---

# Force Close Latency Risk

The DDQ aftermath source is careful about the user's financial exposure. It does not say solver downtime is free. It says the main financial cost is the market-movement risk during the forced-close latency window.

In plain terms: the user is not meant to be stuck until the solver recovers, but the position remains exposed while the user detects the failure, posts the on-chain Force Close request, waits through the timer, obtains proof, and submits the finalization transaction.

## What The User Is Actually Risking

Latency risk is incremental price risk during recovery. The market can move between the user's original intent to close and the final on-chain close. For leveraged positions, that window matters.

This is the honest answer to "what do I lose if the solver is offline?" The source says the risk is not a default haircut simply because the solver is unresponsive. The risk is that the market can move while the Force Close path completes.

## Publication Boundary

The source includes example timelines and an expectation that delays can compress as infrastructure hardens. Production docs should not promise a specific seconds-level or minutes-level outcome unless current timers, chain conditions, proof flow, UI behavior, and supported markets are verified.

## Sources

- `vibe-papers`: Neelo DDQ, "Operation failure aftermath" and "Operational Failure".

## Related Pages

- `authored-force-close-protocol-timer`
- `authored-force-close-price-proof`
- `authored-force-close-versus-escape-mode`
