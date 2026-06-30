---
id: "authored-funding-phase-counterparty-share"
title: "Funding Phase And Counterparty Share"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/04-variable-definitions#phase-parameter"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-04-variable-definitions-phase-parameter", "neelo-15-funding-model-15-docs-04-variable-definitions", "authored-market-maturation-state-map"]
---

# Funding Phase And Counterparty Share

The funding-model source includes a phase parameter: counterparty share, written as alpha in the source. It describes how much LP or solver capital is acting as the effective counterparty.

That small variable carries a large product idea. In the early phase, alpha is near one: the LP or solver side is doing most of the counterparty work because trader flow is not yet naturally offsetting. In the later phase, alpha is near zero: traders mostly offset each other, and the solver can focus more on pricing, routing, risk controls, and residual stress rather than being the main balance sheet.

This is the funding-model version of the broader Vibe lifecycle thesis. A new market starts as a managed market, not a mature order book. It becomes more efficient only as real two-sided demand, price integrity, inventory, and risk history develop.

## Why It Matters

Counterparty share explains why launch and maturity should not have the same cost structure. When alpha is high, the system must compensate the side carrying residual risk. That can mean wider spreads, higher borrow, conservative leverage, stronger hedging, and tighter capacity. When alpha falls because natural flow offsets more exposure, the same market can support more efficient terms.

The parameter also helps users understand why Vibe does not need to choose forever between solver-backed markets and trader-to-trader markets. The source model lets a market move along that spectrum. Solver and LP support can be an ignition layer, while maturity means less balance-sheet dependence over time.

## Publication Boundary

This page does not define live phase thresholds, graduation criteria, leverage schedules, or market-maker obligations. It explains the source-model meaning of counterparty share and why market maturity changes the funding and risk-control problem.

## Sources

- `vibe-papers`: Neelo, "Phase Parameter".

## Related Pages

- `authored-market-maturation-state-map`
- `authored-ddq-systemic-leverage-ramp`
- `authored-funding-trader-ux-lp-efficiency-tradeoff`
