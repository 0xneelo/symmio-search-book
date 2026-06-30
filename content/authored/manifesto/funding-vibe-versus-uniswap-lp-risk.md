---
id: "authored-funding-vibe-versus-uniswap-lp-risk"
title: "Funding Vibe Versus Uniswap LP Risk"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/06-lp-profit#comparison-uniswap-vs-vibe-lp-profit"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-06-lp-profit", "authored-funding-risk-inversion", "authored-token-vault-perps-versus-usdc-pools"]
---

# Funding Vibe Versus Uniswap LP Risk

Neelo's LP-profit section contrasts a spot AMM LP with a Vibe-style semi-AMM perp LP. In the spot AMM case, the LP faces impermanent-loss math tied directly to price movement between deposit and withdrawal. In the Vibe-style perp model, the LP result is instead driven by fees, funding, liquidations, trader PnL, hedge PnL, and shortfall risk.

That does not make Vibe risk-free. It means the risk is different. A Uniswap-style LP is exposed to a price-only curve. A Vibe-style residual counterparty is exposed to trader behavior, market imbalance, hedging execution, liquidation performance, insurance capacity, and the ability of pricing controls to rebalance flow before harder defenses are needed.

## Why This Matters

The comparison keeps the manifesto precise. Vibe is not simply "better LP yield" or "no risk." It is a different risk architecture for a different problem: bootstrapping long-tail derivatives where trader demand may be episodic, two-sided flow may be weak at launch, and residual counterparty capital must be paid for taking the hard side.

The source argues that if traders lose on average, the LP side can have positive expectancy. The docs must still present that as a model condition, not a universal promise. Actual results depend on market regime, trader composition, fees, funding, liquidations, hedging, and shortfall controls.

## Publication Boundary

This page explains the source comparison. It does not guarantee positive LP returns, compare live products, publish expected trader-loss rates, or claim that Vibe removes all LP risk. Public LP-performance wording needs operator, accounting, and legal review.

## Sources

- `vibe-papers`: Neelo, "Comparison: Uniswap vs Vibe LP Profit".

## Related Pages

- `authored-funding-risk-inversion`
- `authored-token-vault-perps-versus-usdc-pools`
- `authored-symm-lp-proof-of-possibility`
