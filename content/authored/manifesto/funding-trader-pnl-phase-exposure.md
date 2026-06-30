---
id: "authored-funding-trader-pnl-phase-exposure"
title: "Funding Trader PnL Phase Exposure"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit#trader-pnl-term"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "authored-funding-phase-counterparty-share", "authored-ddq-mature-market-stage"]
---

# Funding Trader PnL Phase Exposure

Trader PnL enters the LP-profit formula through a phase-dependent counterparty-share term. In the source model, aggregate trader PnL is the sum of individual trader wins and losses in a market. When traders win, the residual counterparty side must pay. When traders lose, the residual counterparty side receives those losses.

The important variable is the counterparty-share parameter. In bootstrap mode, the LP or solver stack is closer to the full counterparty, so trader PnL has a large direct effect on LP profit. In a mature market, opposing traders offset more of each other, so the LP or solver stack is less exposed to aggregate trader PnL. The source describes this as a phase toggle rather than a universal constant.

## Why This Matters

This distinction stops the docs from making a false blanket statement about who takes the other side of every trade. Early long-tail markets need residual counterparty support because there may not be enough balanced flow. Mature markets can rely more on natural long-short netting. The same venue can therefore move from balance-sheet-supported bootstrap economics toward trader-to-trader settlement as the market develops.

For readers, this also explains why market maturity matters for pricing and risk. If the LP/solver stack absorbs most trader PnL, risk controls need to be conservative and dynamic. If trader flow offsets itself, the venue can depend more on netting and less on inventory or insurance.

## Publication Boundary

This page explains the source model's phase logic. It does not publish live phase thresholds, graduation criteria, market-specific exposure caps, solver obligations, or final LP rights. Those need implementation and operator review before public commitment.

## Sources

- `vibe-papers`: Neelo, "Trader PnL Term".

## Related Pages

- `authored-funding-phase-counterparty-share`
- `authored-ddq-mature-market-stage`
- `authored-residual-counterparty-balance-sheet-problem`
