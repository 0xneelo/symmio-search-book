---
id: "authored-pool-tail-tvl-fragmentation"
title: "Pool Tail TVL Fragmentation"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/02-collateralized-pools-gmx"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-02-collateralized-pools-gmx", "authored-collateralized-pools-finite-long-tail", "authored-pooled-backstop-mismatch"]
---

# Pool Tail TVL Fragmentation

GMX-style pooled collateral solves a real bootstrap problem: a trader can receive oracle-priced execution without waiting for a full order book. But the source notes that the long tail remains finite because capital has to be spread across risk.

As more markets are added, pool capital either concentrates in the majors or fragments across tail assets. A market can appear in the UI while the actual support behind it is too small to feel like durable liquidity.

## Why Fragmentation Matters

Tail TVL fragmentation changes the trader's real product:

- open size may be capped tightly;
- spreads or fees may need to compensate for stress;
- oracle-priced execution may not imply deep loss absorption;
- the backstop asset may not match the token narrative being traded.

That is another version of listing outrunning liquidity. The pool can quote, but the question remains: how much risk can it safely absorb for this specific long-tail market?

## Publication Boundary

This page should not publish current GMX or third-party market counts, TVL numbers, pool composition, or asset-specific capacity without current official source review. The durable claim is structural: pooled collateral helps some long-tail bootstrap, but capital fragmentation limits generalized depth.

## Sources

- `vibe-papers`: Neelo, "Section 2: Collateralized Pools (GMX-style) and Finite Long Tails".

## Related Pages

- `authored-collateralized-pools-finite-long-tail`
- `authored-pooled-backstop-mismatch`
- `authored-token-vault-perps-versus-usdc-pools`
