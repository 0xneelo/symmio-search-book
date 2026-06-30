---
id: "authored-losing-trader-first-loss"
title: "Losing Traders As First Loss"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/risk-walthrough"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-risk-walthrough", "authored-loss-waterfall-and-profit-caps"]
---

# Losing Traders As First Loss

The DDQ waterfall starts with the simplest rule in a derivatives market: the losing side pays first.

When long and short flow is netted, PnL transfers between traders. If the price rises, shorts pay longs. If the price falls, longs pay shorts. The first buffer is therefore not an insurance fund or a protocol subsidy. It is the margin and balances of the participants who took directional risk and lost.

That ordering matters because it prevents the docs from making the system sound like an unlimited backstop. A trader who chooses direction and leverage is the first economic bearer of that directional outcome. Insurance, solver resources, and LP resources exist for residual or tail conditions, not to replace ordinary trader margin.

## Why This Is The Preferred State

The preferred state is trader-to-trader settlement. It means the market has enough opposing flow for winners to be paid by losers without pulling on the solver balance sheet.

The DDQ's netting examples make this explicit. With a 100% netted long against a short, both price-up and price-down outcomes clear between traders. The solver still coordinates quotes, risk checks, lifecycle actions, and settlement operations, but the directional PnL path is not primarily solver-funded.

## Where The Waterfall Moves Next

The first-loss rule does not mean trader margin covers every possible event. In a fast dislocation, losing-side margin may be exhausted before all winning-side claims are economically cleared. Only then does the waterfall move into solver hedging resources, LP vault capacity where documented terms permit it, local insurance, and eligible global insurance.

For production docs, the important distinction is between normal loss absorption and tail loss absorption. Normal loss absorption is trader margin. Tail loss absorption is the bounded escalation path that starts after trader balances cannot cover the imbalance.

## Publication Boundary

This page should not publish live maintenance-margin thresholds, liquidation timing, margin-call behavior, closeout pricing, or user-compensation semantics without implementation and operator review. It documents the source-backed ordering: losing traders are first loss before solver, LP, or insurance resources are touched.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses".
- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".
- `vibe-papers`: Neelo DDQ, "Risk Walkthrough".

## Related Pages

- `authored-netting-state-risk-transfer`
- `authored-loss-waterfall-and-profit-caps`
- `authored-symmio-cross-margin-liquidations`
