---
id: "authored-symmio-settlement-profit-realization"
title: "Symmio Settlement And Profit Realization"
section: "protocol-reference"
track: "Symmio Operations"
status: "published"
sourceKeys: ["symmio-settlement", "symmio-profit-realization"]
sourceUrls: ["https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/settlement.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/settlement-and-profit-realization.md"]
relatedGeneratedPages: ["symmio-settlement", "symmio-profit-realization", "authored-bilateral-intent-lifecycle"]
---

# Symmio Settlement And Profit Realization

Symmio separates unrealized PnL from allocated balance. Unrealized PnL is what open positions are worth on paper. Allocated balance is realized collateral that can cover losses, open new positions, or be withdrawn. Settlement is the mechanism that converts enough unrealized profit into usable allocated balance so the account can keep operating.

The official trader docs describe a common case: a trader is profitable overall, but wants to close a losing leg and does not have enough realized collateral to cover that loss. A solver can submit Muon-signed data attesting to current prices and unrealized PnL across the account. If the contract verifies the signature and solvency conditions, profitable positions can be partially realized into allocated balance, letting the losing close proceed without creating uncollateralized risk.

## Solver View

The liquidity-provider docs explain why settlement matters for PartyB. Without settlement, a profitable account can still get stuck because its gains are unrealized while its closing loss requires realized collateral. Settlement is therefore an operational tool for keeping good traders from being blocked by accounting state.

Newer Symmio settlement behavior also handles accumulated funding fees, so position PnL and owed funding can be considered together when a solver settles positions.

## Publication Boundary

This page should not imply that every frontend exposes settlement identically. The source-backed claim is narrower: settlement converts enough unrealized profit and funding-accounting state into realized allocated balance under Muon-backed and solvency-preserving checks.

## Sources

- `symmio-settlement`: official trader settlement explanation.
- `symmio-profit-realization`: official liquidity-provider profit-realization context.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-solver-event-monitoring`
- `authored-symmio-cross-margin-liquidations`
