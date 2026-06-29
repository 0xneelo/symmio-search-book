---
id: "authored-ddq-imbalance-management-hedging-step"
title: "DDQ Imbalance Management And Hedging Step"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "authored-solver-hedging-resource-buffer", "authored-residual-counterparty-hedge-first"]
---

# DDQ Imbalance Management And Hedging Step

The third step in the DDQ economic-outcomes walkthrough is imbalance management. If one side of the market is heavier than the other, the solver uses its toolbox to reduce residual exposure.

The source names several tools: accessing LP vault liquidity or credit capacity where terms allow it, hedging on external venues, and adjusting incentives such as dynamic spreads or funding to attract offsetting flow.

## Who Holds Risk During This Step

While the solver is carrying residual exposure, risk sits with the solver. If the solver uses LP vault capacity to support the hedge, LP vaults can become economically exposed under the venue's disclosed risk terms.

Once a hedge is established, the dominant risk changes. The question is no longer only "who is long and who is short?" It becomes "how good is the hedge?" The DDQ calls attention to basis, liquidity, and execution risk: a hedge may not track perfectly, may slip, or may be hard to execute during fast market movement.

## Reader Implication

This page is the operational bridge between netting and the loss waterfall. A market does not jump from an un-netted fill straight to insurance. First, the solver should try to manage the imbalance with matching, inventory, vault capacity, external hedge routes, and pricing incentives.

For LPs, the key diligence point is conditional exposure. LP vault capacity is not automatically exposed to every trade. It becomes relevant when the solver relies on that capacity to support residual risk, and only according to the documented terms.

## Publication Boundary

Do not publish final LP vault borrowing rights, hedge venues, inventory custody, dynamic-spread formulas, funding adjustments, hedge-effectiveness guarantees, or LP exposure terms without operator and implementation review. The source-backed claim is the sequence: residual imbalance is managed by solver tools before tail buffers are considered.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".

## Related Pages

- `authored-solver-hedging-resource-buffer`
- `authored-residual-counterparty-hedge-first`
- `authored-lp-vault-capacity-exposure-boundary`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`
