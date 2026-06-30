---
id: "authored-ddq-order-submission-risk-holder"
title: "DDQ Order Submission Risk Holder"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "authored-vibe-simple-trade-flow", "authored-netting-state-risk-transfer"]
---

# DDQ Order Submission Risk Holder

The DDQ economic-outcomes walkthrough starts the trade lifecycle with order submission and margining. A trader chooses direction, size, and leverage, posts margin, and opens at an execution price shaped by the venue's spreads and fees.

At this first step, the risk holder is the trader. The trader is the party choosing directional exposure. Long or short, leveraged or conservative, the account has accepted that price movement can create profit or loss against posted margin.

## Why This Matters

This sounds obvious, but it prevents two common misunderstandings.

First, solver involvement does not erase trader directional risk. A solver may quote, net, hedge, or temporarily warehouse residual exposure after execution, but the trader still owns the directional bet created by the order.

Second, margin is not a fee. It is the account resource that supports the position while the trade lifecycle runs. If the position moves against the trader and maintenance requirements are breached, the trader's margin is the first risk buffer before any wider solver, LP, or insurance layer becomes relevant.

## Reader Implication

When answering "who holds risk when I submit an order?", the precise answer is: the trader holds the initial directional risk, while the solver has not yet become the residual counterparty until the execution and netting step determines whether any portion is un-netted.

That distinction keeps onboarding language clean. The user can understand their own account-level exposure before learning the deeper system question: what happens after the solver fills and tries to net the trade.

## Publication Boundary

Do not publish final margin percentages, leverage bands, maintenance thresholds, spread formulas, fee rates, liquidation-distance math, or market-specific order restrictions here without operator and implementation review. This page documents the source-backed lifecycle step: order submission begins with trader-chosen directional exposure and posted margin.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".

## Related Pages

- `authored-vibe-simple-trade-flow`
- `authored-netting-state-risk-transfer`
- `authored-ddq-execution-netting-risk-split`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`
