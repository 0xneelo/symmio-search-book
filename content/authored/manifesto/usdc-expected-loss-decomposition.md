---
id: "authored-usdc-expected-loss-decomposition"
title: "USDC Expected Loss Decomposition"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-2-expected-annual-protocol-loss-model", "authored-required-risk-premium-for-usdc-lps"]
---

# USDC Expected Loss Decomposition

The risk-premium source decomposes expected annual protocol loss into event frequency and event severity:

```
EL_I = sum_j (p_j * L_j)
```

In that frame, a USDC LP is not exposed to one generic "protocol risk." The LP can be exposed to price-manipulation attacks, oracle manipulation, net-position imbalance, liquidation failure, backstop correlation, and smart-contract exploits. Each event has a different cause, frequency model, and severity profile.

This decomposition prevents the docs from collapsing all loss into trader PnL. Directional trader PnL is zero-sum inside the trading relationship. The expected-loss model is about protocol-level tail and design risk: bad debt, failed liquidations, backstop depletion, correlated stress, and other losses that can reach capital providers.

## How To Use It

For public docs, the useful answer is the structure: name the event, identify whether it is economic, operational, correlation-based, or technical, and separate frequency from severity. The exact percentages in the source should remain model outputs until reviewed against current implementation, live market data, and approved publication language.

## Publication Boundary

This page teaches the source-model expected-loss structure. It does not publish final event probabilities, severity assumptions, expected-loss percentages, capital charges, LP return requirements, or live market risk disclosures without operator, implementation, risk, legal, and accounting review.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Expected Annual Protocol Loss Model.

## Related Pages

- `authored-usdc-lp-backstop-cascade`
- `authored-required-risk-premium-for-usdc-lps`
- `authored-stress-correlation-cascade`
