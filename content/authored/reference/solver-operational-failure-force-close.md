---
id: "authored-solver-operational-failure-force-close"
title: "Solver Operational Failure And Force Close"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/iii-operation-failure-aftermath"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-iii-operation-failure-aftermath", "authored-bilateral-intent-lifecycle", "authored-solver-event-monitoring"]
---

# Solver Operational Failure And Force Close

The DDQ separates solver operational failure from solver insolvency. Operational failure means the solver becomes unresponsive: it does not answer open or close requests through the normal off-chain intent/RFQ path.

The modeled recovery path is an on-chain Force Close escape hatch. The user can initiate an on-chain close request, wait through the protocol timer, provide a recent price proof, and finalize the close without solver cooperation.

## Financial Effect For The User

The DDQ's important distinction is that the user is not meant to lose money simply because the solver is offline. The main financial cost is exposure to market movement during the forced-close latency window. The source gives an illustrative minutes-level timeline, but final public docs should not freeze exact timing unless production parameters are confirmed.

This is the right way to document the risk: the escape hatch reduces dependence on solver uptime, but it does not remove price risk during the recovery path.

## Why It Matters

For leveraged trading, a long-horizon withdrawal-only emergency path is not enough. A trader needs a position-level close path because exposure can change materially in minutes. The DDQ frames Force Close as a position-specific escape hatch for solver unresponsiveness.

## Publication Note

This page should remain under operator and implementation review until exact Force Close availability, timer values, proof source, freshness constraints, and UI behavior are confirmed for the production product.

## Sources

- `vibe-papers`: Neelo DDQ, "Operational Failure" and "Operation failure aftermath".

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
- `authored-collateral-margin-cva`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure`
