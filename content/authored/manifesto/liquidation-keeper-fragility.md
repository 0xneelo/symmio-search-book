---
id: "authored-liquidation-keeper-fragility"
title: "Liquidation And Keeper Fragility"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-2-expected-annual-protocol-loss-model", "authored-usdc-lp-backstop-cascade"]
---

# Liquidation And Keeper Fragility

Neelo's USDC risk model treats liquidation failure as its own risk event because correct pricing is not enough if the system cannot close unsafe exposure in time.

In thin markets, liquidation can fail for practical reasons: the reference market moves too quickly, a manipulation happens within a short block window, available liquidity is too shallow, or keeper economics do not justify fast execution during stress. The source therefore separates liquidation failure from oracle manipulation and from net-position imbalance. They can interact, but they are not the same failure.

For USDC LPs, this distinction matters. A pool can be exposed to bad debt even if the system knows a position is unsafe. If no reliable actor can execute the liquidation at an economically coherent price before losses exceed margin and backstop resources, the residual loss can move toward LP capital.

## Documentation Rule

Do not describe liquidation as a magic cleanup step. In low-cap markets, liquidation quality depends on executable liquidity, keeper incentives, timing, collateral, oracle behavior, and stress coordination.

## Publication Boundary

Current keeper incentives, liquidation thresholds, block timing assumptions, force-close behavior, and Vibe/Symmio implementation details require implementation and risk review. This page captures the source-model fragility, not a final live liquidation spec.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Risk Event Decomposition and Other Risk Events.

## Related Pages

- `authored-usdc-lp-backstop-cascade`
- `authored-symmio-cross-margin-liquidations`
- `authored-tail-event-profit-cap-emergency-brake`
