---
id: "authored-funding-revenue-cost-accounting-map"
title: "Funding Revenue And Cost Accounting Map"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#revenue-cost-variables"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-revenue-cost-variables", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-funding-full-objective"]
---

# Funding Revenue And Cost Accounting Map

The funding-model source lists revenue and cost variables because the model is not only trying to avoid loss. It is trying to understand whether the market is being paid enough for the risk it carries.

On the revenue side, Neelo names trading fees, spread revenue, funding revenue, liquidation fees, maintenance-margin fees, borrow revenue, and total revenue. On the cost and outcome side, it names hedge cost, external borrow cost, shortfall or bad debt, aggregate trader PnL, and LP or vault profit.

This accounting map matters because a long-tail derivatives market can look active while still being economically wrong. Volume alone does not prove health. A market can generate fees but lose money to trader PnL. It can earn spreads but spend too much on hedging. It can collect liquidation penalties but still face shortfall if the unwind was worse than the model assumed.

## What It Adds To The Manifesto

The compendium should teach that market creation is not just a liquidity story. It is an economic accounting story. The system needs to know what it earned, what it spent, who won, who lost, and whether the resulting LP or vault profit justifies the risk. That is why profit deviation appears as a risk signal and why the full objective combines profit with local risk penalties and defense costs.

This also keeps the docs honest about yield. If LP or vault profit depends on fees, spreads, funding, liquidations, hedge costs, external borrow costs, trader PnL, and shortfall, then public pages must avoid reducing the model to a single yield number.

## Publication Boundary

This page does not publish live revenue splits, liquidation economics, management fees, LP shares, hedge venues, borrow sources, or accounting treatment. It explains the source-model categories that final public revenue and LP pages must reconcile with implementation and accounting review.

## Sources

- `vibe-papers`: Neelo, "Revenue & Cost Variables".

## Related Pages

- `authored-funding-full-objective`
- `authored-funding-risk-inversion`
- `authored-lp-profit-and-dynamic-pricing`
