---
id: "authored-risk-adjusted-efficiency-multiplier"
title: "Risk-Adjusted Efficiency Multiplier"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure5", "authored-systemic-leverage-comparison", "authored-usdc-risk-premium-ratio-diagnostic", "authored-risk-adjusted-capital-efficiency"]
---

# Risk-Adjusted Efficiency Multiplier

Figure5 combines two comparisons into one risk-adjusted-capital-efficiency model.

First, it compares structural leverage: the source example uses `sysLev_I ~= 0.80x` for the USDC design and `sysLev_V = 5x` for the token-inventory design, yielding a capital-efficiency ratio of roughly `6.22x`. Second, it compares required risk premium: `r_I / r_V ~= 15x`, meaning the USDC backstop capital is modeled as requiring far more compensation than token-native inventory capital.

The overall RCE ratio multiplies those terms: `6.22 * 15 ~= 93.36`. The point is not to turn `93.36x` into marketing copy. The point is to teach that capital efficiency must include both exposure capacity and the price of the capital bearing that exposure.

## Reader Implication

If USDC capital supports less exposure and demands more compensation, the design can be inefficient twice: it supports less market per unit of capital, and the capital it uses is more expensive. Token-inventory designs become compelling when they improve both sides of that equation.

## Publication Boundary

Keep the multiplier as a source-model teaching artifact. Final docs must not call it a live Vibe efficiency claim, audited ratio, or guaranteed advantage without current market parameters, vault data, realized risk premiums, and legal/risk review.

## Sources

- `vibe-papers`: Neelo, "Figure5".

## Related Pages

- `authored-systemic-leverage-comparison`
- `authored-usdc-risk-premium-ratio-diagnostic`
- `authored-risk-adjusted-capital-efficiency`
