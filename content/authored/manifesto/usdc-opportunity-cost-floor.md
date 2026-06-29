---
id: "authored-usdc-opportunity-cost-floor"
title: "USDC Opportunity Cost Floor"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-required-apr-derivation", "authored-required-risk-premium-for-usdc-lps"]
---

# USDC Opportunity Cost Floor

Neelo's APR derivation starts with a simple floor: stablecoin capital has alternatives.

If an LP can deploy USDC into lower-risk DeFi strategies, then a low-cap perp backstop has to clear that opportunity cost before it even starts compensating for manipulation, bad debt, liquidation failure, or adverse selection. In the source formula, this is the risk-free or low-risk DeFi component:

```
r_I = r_f + E[Loss] + Premium(Adverse Selection, Illiquidity)
```

The floor is not the whole APR. It is the baseline a rational LP compares against. If the protocol only pays the opportunity-cost rate while exposing the LP to low-cap tail risk, the LP is not being paid for the actual job.

## Publication Boundary

The source uses example benchmark ranges for low-risk USDC opportunities. Public docs should not publish current rate ranges, benchmark venues, or LP return promises without current market data and operator/accounting review. The durable claim is the logic: USDC has an outside option.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Risk-Free Rate component.

## Related Pages

- `authored-required-risk-premium-for-usdc-lps`
- `authored-usdc-risk-methodology-stack`
- `authored-usdc-vault-negative-feedback-loop`
