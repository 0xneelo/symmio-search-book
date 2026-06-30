---
id: "authored-netting-state-risk-transfer"
title: "Netting State And Risk Transfer"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/risk-walthrough"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-risk-walthrough", "authored-loss-waterfall-and-profit-caps"]
volumeId: "volume-05-solver-lp-and-protocol-operations"
---

# Netting State And Risk Transfer

The DDQ's cleanest risk explanation is the netting-state model. A perp fill can be split into the part that is matched against opposing trader flow and the part that is not matched at execution time.

When a trade is netted, PnL transfers between traders. A long who wins is paid by a short who loses. A short who wins is paid by a long who loses. The solver may still provide quoting, routing, and lifecycle operations, but the directional PnL is trader-to-trader.

When a trade is un-netted, the trader is effectively facing the solver on that residual portion until the solver hedges, rebalances, or attracts offsetting flow. If a long is un-netted and the price rises, the winning trader's PnL is paid from solver hedging PnL and the liquidity resources backing that residual exposure, including LP vault capacity where the documented terms allow it. If the price falls, the losing trader pays through margin and balance.

## The Continuous Case

The live market is usually not 100% netted or 0% netted. The source treats partial netting as the normal state. That makes the solver's job a balancing problem rather than a one-time fill problem.

The solver tries to reduce time spent carrying residual exposure by:

- matching opposing trader flow;
- adjusting spreads, funding, or incentives;
- using inventory or vault capacity where allowed;
- hedging externally when liquidity and execution quality support it;
- tightening controls when the market becomes unsafe.

## Reader Implication

For support and risk docs, the right answer is not "the solver always takes the other side." The precise answer is: traders bear directional PnL on their positions; netted flow pays between traders; un-netted residual flow is warehoused and hedged by the solver, with tail outcomes routed through the disclosed risk waterfall.

## Publication Boundary

This page explains the DDQ model. Final docs still need operator-approved wording for which vault resources can be used, how residual exposure is limited, and which waterfall rules are live in production.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".
- `vibe-papers`: Neelo DDQ, "Risk Walkthrough".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-loss-waterfall-and-profit-caps`
- `authored-solver-hedging-failure-modes`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`
