---
id: "authored-inverted-market-mode-semantics"
title: "Inverted Market Mode Semantics"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-3-the-inverted-market-mode", "authored-inverse-payoff-trap"]
---

# Inverted Market Mode Semantics

Percolator's inverted mode changes what long and short mean because the market represents price internally as `1 / price`.

The source gives the SOL/USD example collateralized in SOL: going long is effectively long USD exposure, which profits if SOL falls; going short is effectively short USD exposure, which profits if SOL rises. Collateral, fees, funding, and PnL are all denominated in the token itself.

That semantic inversion is not just a UI detail. It is the gateway into token-denominated payoff risk. If the market's unit of account, collateral, fees, funding, and payouts are all the same volatile token, readers must understand which side receives which exposure before they can understand liquidation, payout, and LP risk.

## Reader Implication

Docs should not describe inverted markets with ordinary linear long/short intuition. They should state the collateral unit, the internal price representation, the PnL unit, and what each side actually profits from.

## Publication Boundary

This page explains the source's architecture semantics. It should not publish live Percolator market guidance, trading advice, margin settings, or production payoff guarantees.

## Sources

- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-inverse-payoff-trap`
- `authored-token-margined-reflexivity-risk`
- `authored-usdc-settlement-inventory-separation`
