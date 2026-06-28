---
id: "authored-utilization-modes-inventory-insurance"
title: "Utilization Modes: Inventory And Insurance"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/09-insurance-adl"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-05-utilization-modes", "neelo-15-funding-model-15-docs-09-insurance-adl", "authored-funding-defense-hierarchy"]
---

# Utilization Modes: Inventory And Insurance

Neelo's funding model separates utilization into two modes because a long-tail perp market can be constrained by two different things: token inventory and insurance capacity.

Token-inventory utilization asks whether the solver or market has enough token inventory to cover net exposure. In the source model, this is the normal and stress-mode measurement. It is the first sign that the market is running out of inventory coverage.

Insurance-fund utilization asks a different question: if exposure exceeds token inventory, how much loss could the remaining unhedged exposure create relative to local and allocated global insurance? That mode is activated when the binding constraint is no longer simply "do we have tokens?" but "can the defense stack absorb the tail risk?"

## Why Two Modes Exist

A single utilization number hides the state transition. A market can be near the edge of token coverage while insurance is still healthy. It can also have enough nominal token coverage while volatility or exposure-loss estimates make insurance stress the real constraint.

The source model uses the binding constraint to shape pricing. When exposure is inside inventory, token utilization can drive normal and stress pricing. When exposure exceeds inventory, the model shifts toward insurance utilization and uses the more urgent signal for funding, spreads, borrow rates, and ADL proximity.

That is not just mathematical neatness. It is an accounting discipline. The docs should teach readers that "utilization" means different things depending on which defense layer is active.

## Reader Implication

For traders, utilization modes explain why cost can rise before liquidation or ADL is visible. For LPs and treasuries, they explain why inventory contribution and insurance contribution are different risk roles. For solvers, they clarify when a market has moved from ordinary inventory pressure into a tail-risk management state.

## Publication Note

The source includes example thresholds and formulas. Final public docs should not publish those as live Vibe parameters until operator and implementation review confirms the production values.

## Sources

- `vibe-papers`: Neelo, "05. Utilization Modes: Token Inventory vs Insurance Fund".
- `vibe-papers`: Neelo, "09. Insurance & ADL Logic".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-usdc-settlement-inventory-separation`
- `authored-loss-waterfall-and-profit-caps`
