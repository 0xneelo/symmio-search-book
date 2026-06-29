---
id: "authored-ddq-closeout-settlement-risk-holder"
title: "DDQ Closeout And Settlement Risk Holder"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "authored-executable-closeout-pricing", "authored-symmio-settlement-profit-realization"]
---

# DDQ Closeout And Settlement Risk Holder

The DDQ walkthrough ends with closeout and settlement. When a trader closes or is liquidated, PnL is realized. The solver unwinds or rebalances hedges, repays LP vault borrow usage where applicable, and fees or hedging PnL are distributed according to the relevant vault or venue terms.

The risk holder at settlement is the party that held the effective offsetting exposure during the life of the position.

## Netted Versus Residual Settlement

For netted flow, the effective offsetting exposure came from other traders. Settlement realizes trader-to-trader PnL. The long side and short side clear against each other through the venue's lifecycle.

For un-netted residual flow, the effective offsetting exposure came from the solver and whatever liquidity resources supported its hedge. In that case, settlement depends on hedge effectiveness, execution costs, vault usage, and the risk waterfall if the move exceeded ordinary margin and hedge protection.

## Reader Implication

This page should answer a common closeout question: "who paid my PnL?" The best answer is state-dependent. If the position was netted, other traders were the economic counterparty. If the position was residual, the solver-side hedge stack carried the offsetting exposure until closeout.

That state-dependent answer is more accurate than saying the solver always pays or that traders always pay. It also explains why closeout pricing can reflect executable liquidity and why tail outcomes need disclosed waterfall rules.

## Publication Boundary

Do not publish final closeout pricing formulas, liquidation routing, vault repayment terms, fee distribution, hedge PnL sharing, settlement timing, or waterfall implementation details without operator and implementation review. The source-backed claim is the settlement principle: realized PnL traces back to the party or resource stack that held the offsetting exposure.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".

## Related Pages

- `authored-executable-closeout-pricing`
- `authored-symmio-settlement-profit-realization`
- `authored-loss-waterfall-and-profit-caps`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`
