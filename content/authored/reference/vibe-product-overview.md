---
id: "authored-vibe-product-overview"
title: "Vibe Product Overview"
section: "product-reference"
track: "Vibe Basics"
status: "publication-candidate"
sourceKeys: ["vibe-what-is", "vibe-architecture", "vibe-papers"]
sourceUrls: ["https://docs.vibe.trading/about-vibe-trading/what-is-vibe-trading.md", "https://docs.vibe.trading/architectural-overview.md", "https://github.com/0xneelo/vibe_docs"]
relatedGeneratedPages: ["vibe-product-what-is", "vibe-architecture-amfq", "authored-vibe-as-discovery-layer", "authored-market-assembly-line"]
---

# Vibe Product Overview

Vibe is the product layer for a specific market-structure thesis: perpetual markets should not be limited to the assets that already have deep order books, mature venue listings, or passive liquidity pools.

The current public Vibe docs position Vibe Trading as a perpetuals DEX with two headline surfaces: broad major-market coverage and permissionless lowcap perpetual listings for Solana or EVM pairs. The same public page currently claims Binance perp market coverage and "390+ markets." Treat that number as a current source claim, not a timeless fact; it must be refreshed before final publication.

## What Vibe Adds

Vibe combines two ideas that are usually documented separately:

- A trader-facing perpetuals product where users can trade established markets.
- A market-creation surface where projects or inventory owners can support isolated lowcap perp markets using their own supply.

Neelo's vision corpus explains why that matters. The point is not simply "more markets." The point is to move market creation upstream: from opaque venue listing committees and mature order books toward permissionless demand discovery, solver quotation, and eventual market graduation.

## Risk Framing

The public Vibe overview says its bespoke lowcap solver isolates each lowcap perp market and frames that isolation as protection against platform-wide risk if a token fails. The docs can report that product claim, but they should also route users to risk, margin, and solver pages before turning it into a guarantee.

For publication, the safer formulation is: Vibe's public product story is isolated lowcap perp listing; the exact operational guarantees, solver exposure, vault inventory treatment, and LP risk visibility must be explained on the dedicated risk pages where the relevant sources are cited.

## Reader Implication

If a reader asks "what is Vibe?", the answer should not be only a DEX category label. Vibe is a perpetuals product, a permissionless market-creation path, and a demand-discovery layer in the broader Vibe x Symmio thesis.

## Sources

- `vibe-what-is`: official product positioning, major-market and lowcap-listing claims.
- `vibe-architecture`: intent-based quotation and execution model.
- `vibe-papers`: Neelo's market-creation and discovery-layer thesis.

## Related Pages

- `authored-vibe-intent-architecture`
- `authored-vibe-as-discovery-layer`
- `authored-market-assembly-line`
- `vibe-product-what-is`
