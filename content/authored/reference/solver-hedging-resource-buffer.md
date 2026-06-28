---
id: "authored-solver-hedging-resource-buffer"
title: "Solver Hedging Resources Before Insurance"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-residual-counterparty-hedge-first"]
---

# Solver Hedging Resources Before Insurance

The DDQ loss waterfall puts solver hedging resources before insurance. That is a precise statement about where residual counterparty risk sits.

If a trade is un-netted, the trader's PnL on that residual portion is effectively against the solver until the solver hedges, rebalances, or attracts offsetting flow. If the trader wins and losing-side trader margin is not enough to clear the imbalance, the next economic buffer is the solver's hedging PnL and liquidity resources connected to that residual exposure.

Those resources can include stablecoin reserves, token inventory, hedging positions, and other liquidity the solver has established to support the trade. The source language also allows LP vault capacity to enter where the solver has borrowed or used vault liquidity under the venue's risk rules.

## Why Insurance Is Later

Insurance is not the first tool for ordinary residual exposure. The solver is the party that quoted the trade, assessed hedge feasibility, and temporarily warehoused the imbalance. The first post-margin defense is therefore the set of resources the solver used to back or hedge that exposure.

That ordering is important for LP and project diligence. The model is not "all bad outcomes go straight to an insurance fund." It is: losing traders pay first; then the solver's own hedge stack and associated liquidity resources absorb the residual; only then do local and eligible global insurance become tail-event buffers.

## What This Does Not Promise

The page should not imply that solver hedges are always perfect. The DDQ elsewhere describes basis, liquidity, execution, and disappearance risks. A hedge can slip, become expensive to unwind, or fail to track in a fast market. That is why the waterfall includes local insurance, conditional global insurance, and emergency controls behind the solver resource layer.

## Publication Boundary

Do not publish final solver capital requirements, hedge venues, inventory custody, stablecoin reserve sizing, vault borrowing rights, or hedge-effectiveness guarantees without operator and implementation review. The source-backed claim is the ordering and purpose of the solver hedging-resource buffer.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses".
- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".
- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-internal-inventory-primary-hedge`
- `authored-loss-waterfall-and-profit-caps`
