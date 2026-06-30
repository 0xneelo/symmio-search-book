---
id: "authored-long-tail-perp-model-map"
title: "The Long-Tail Perp Model Map"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-transcript", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/06-summary", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs-overview"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-transcript", "neelo-16-listing-additional-16-docs-06-summary", "neelo-16-listing-additional-16-docs-overview", "authored-technically-async-economically-sync"]
---

# The Long-Tail Perp Model Map

The raw Listing Additional transcript is the source's rough field analysis of dYdX-style vault rails, strict Hyperliquid-style listing, GMX-style pooled collateral, Percolator-family markets, and Vibe's hybrid solver/inventory approach. The structured notes reduce that landscape to a model map.

CLOBs are best when a market is mature enough for continuous two-sided flow. Vault or LP rails can support some order-book liquidity, but they do not remove maker economics. Strict listing policy protects microstructure at the cost of breadth.

Collateralized pools can quote earlier than a CLOB, but they face finite universe size, tail TVL fragmentation, oracle risk, and mismatch between the pool's backstop and the token narrative being traded.

Percolator-family systems can open markets quickly and keep more logic on-chain, but fast listing does not answer settlement reliability when the book is one-sided, USDC settlement lacks inventory, or token-margined collateral becomes reflexive.

Vibe's thesis sits in the gap between those rows. The system needs the openness of permissionless listing, the trader legibility of stable settlement, the market specificity of token inventory, and the operational judgment of a solver/risk layer that can change behavior as the market matures.

## Reader Implication

This page should orient readers before they enter the deeper architecture sections. Every design is a tradeoff. The question is not "which primitive is universally best?" The question is which primitive fits the market phase and who absorbs the residual risk.

## Sources

- `vibe-papers`: Neelo, "Section 6: Summary - Model Map and Where the Gap Remains".
- `vibe-papers`: Neelo, "Permissionless Perps in Practice: Order Books, Pools, and the Percolator Wave".
- `vibe-papers`: Neelo, "16_transcript".

## Related Pages

- `authored-clob-vault-rails-long-tail-limits`
- `authored-collateralized-pools-finite-long-tail`
- `authored-percolator-wave-settlement-reality`
