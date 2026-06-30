---
id: "authored-perp-market-as-credit-system"
title: "Perp Market As Credit System"
section: "manifesto"
track: "07 — Architecture Thesis"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/01-introduction", "https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/02-pillar-one-exploit-resistance"]
relatedGeneratedPages: ["neelo-10-vibe-pillars-10-docs-01-introduction", "neelo-10-vibe-pillars-10-docs-02-pillar-one-exploit-resistance", "authored-vibe-pillars"]
---

# Perp Market As Credit System

The Vibe Pillars paper starts by refusing to treat a perpetual market as only a price chart with leverage attached.

A perp market is a credit system. Traders post margin and receive exposure. Counterparties absorb risk. Solvers, market makers, LPs, or vaults stand behind the market during stress. If collateral, liquidation, oracle, execution, or counterparty continuity breaks, the venue can become exploitable, unbootstrappable, or uneconomic.

## Why This Matters

This framing explains why Vibe cannot be documented as "more listings plus leverage." Low-cap perpetuals are difficult because the system is extending exposure before the market has mature depth. Defense, counterparty formation, and capital incentives all become part of the product.

The credit-system lens also separates market-structure risk from ordinary smart-contract risk. A contract can be secure while the market it runs is economically fragile. The docs should therefore explain who takes risk, how collateral backs exposure, and what happens when price, liquidity, and liquidation timing move against the system.

## Reader Guidance

When a reader asks why Vibe needs so much architecture around solvers, vaults, margins, funding, and liquidation controls, route them here first. The answer is that a perp venue is underwriting exposure, not just rendering a trading widget.

## Sources

- `vibe-papers`: Neelo, "Introduction" in Vibe Pillars.
- `vibe-papers`: Neelo, "Pillar One: Exploit Resistance".

## Related Pages

- `authored-vibe-pillars`
- `authored-exploit-resistance-pillar`
- `authored-collateral-margin-cva`
