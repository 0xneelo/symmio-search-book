---
id: "authored-low-cap-perp-proof-challenge"
title: "The Low-Cap Perp Proof Challenge"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/01-introduction#1-3-the-challenge-of-low-cap-perpetuals"]
relatedGeneratedPages: ["section-13-framework-value-permissionless-perps-13-docs-01-introduction-1-3-the-challenge-of-low-cap-perpetuals", "authored-usdc-vault-negative-feedback-loop", "authored-token-margined-reflexivity-risk"]
---

# The Low-Cap Perp Proof Challenge

Low-cap perpetual markets are hard because every architecture has to answer who backs payouts when the market is thin, volatile, and easy to move.

Neelo's source names four pressure points. Full stablecoin collateralization can become prohibitively expensive. External stablecoin LPs may demand yields too high for traders to fund. Token-margined designs can become reflexive when the collateral and the traded asset fall together. Thin spot liquidity makes oracle manipulation and attack economics part of the design problem.

That is why Proof of Value is acute for low-cap assets. A mature BTC or ETH market can rely on deep external liquidity, broad hedging venues, and substantial two-sided flow. A new token market often cannot.

## What The Docs Must Explain

The docs should not present low-cap perps as simply "more listings." They need to explain:

- what capital backs trader PnL;
- why LP compensation can remain sustainable;
- how oracle and manipulation risk are bounded;
- how inventory, settlement capital, insurance, and ADL differ;
- how the market can improve as it matures.

Without those answers, a low-cap perp is only a speculative symbol. With those answers, it can become credible market infrastructure.

## Publication Boundary

The source includes model-level examples for payout scale, LP APR demand, and historical protocol failures. Treat those as source-context claims until final publication review verifies numbers, examples, and current applicability.

## Sources

- `vibe-papers`: Neelo, "Section 1: Introduction: 1.3 The Challenge of Low-Cap Perpetuals".

## Related Pages

- `authored-usdc-vault-negative-feedback-loop`
- `authored-token-margined-reflexivity-risk`
- `authored-bootstrap-oracle-risk-tiers`
