---
id: "authored-required-risk-premium-for-usdc-lps"
title: "Required Risk Premium For USDC LPs"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-required-apr-derivation", "neelo-06-usdc-token-perps-06-docs-figure5"]
---

# Required Risk Premium For USDC LPs

The USDC source's APR derivation is useful because it treats LP yield as compensation for risk, not as a marketing number.

For a stablecoin LP, the required return is not just "what APY sounds attractive?" It has at least three components: the opportunity cost of deploying USDC elsewhere, expected protocol losses, and a premium for adverse selection and tail risk. In low-cap perp markets, the source argues that those components can dominate the economics.

That framing helps the compendium explain why generic USDC backstops can be expensive. If the LP pool is exposed to manipulation, bad debt, liquidation failure, and fat-tail market states, then a low headline yield is not conservative. It may be underpriced risk.

## What To Publish Carefully

The exact APR ranges and risk-premium ratios in the source are model outputs. They are useful for comparative reasoning, but they should not be presented as final Vibe economics, guaranteed LP demand, or audited market data.

The publishable thesis is the equation: low-cap backstop capital needs a return high enough to cover opportunity cost, expected loss, and adverse selection.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial".
- `vibe-papers`: Neelo, "Figure5".

## Related Pages

- `authored-token-vault-perps-versus-usdc-pools`
- `authored-economic-clarity-for-permissionless-perps`
- `authored-symm-lp-unit-economics`
