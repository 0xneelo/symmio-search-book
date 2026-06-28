---
id: "authored-collateralized-pools-finite-long-tail"
title: "Collateralized Pools Have A Finite Long Tail"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/02-collateralized-pools-gmx", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/06-summary"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-02-collateralized-pools-gmx", "neelo-16-listing-additional-16-docs-06-summary", "authored-token-vault-perps-versus-usdc-pools"]
---

# Collateralized Pools Have A Finite Long Tail

Pool-style perp venues solve one part of the long-tail problem by making liquidity a protocol object. A trader does not need to wait for a fully populated order book if a pool can quote against oracle prices and absorb the other side.

That helps bootstrap some markets. It does not create an unlimited long tail. The same pooled collateral that gives a market a counterparty also creates risk concentration, oracle exposure, backstop mismatch, and TVL fragmentation. As the market list grows, capital either concentrates in majors or becomes too thin across tail assets to feel reliable.

The source frames this as "listing outruns liquidity" in another form. A pool can make a market appear earlier than a CLOB could, but the user still has to ask what backs PnL, how much tail TVL exists, what asset supplies the backstop, and whether the pool's collateral matches the token narrative being traded.

## Why This Matters For Vibe

Vibe's token-inventory and solver-risk thesis should be read against this pool limitation. The goal is not merely to create a pool for every token. It is to match market-specific inventory, stable settlement, solver pricing, and risk controls to the phase of the market.

## Sources

- `vibe-papers`: Neelo, "Section 2: Collateralized Pools (GMX-style) and Finite Long Tails".
- `vibe-papers`: Neelo, "Section 6: Summary - Model Map and Where the Gap Remains".

## Related Pages

- `authored-token-vault-perps-versus-usdc-pools`
- `authored-required-risk-premium-for-usdc-lps`
- `authored-hybrid-perps-comparative-advantage`
