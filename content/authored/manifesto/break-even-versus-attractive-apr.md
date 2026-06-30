---
id: "authored-break-even-versus-attractive-apr"
title: "Break-Even Versus Attractive APR"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-economic-interpretation", "authored-required-risk-premium-for-usdc-lps"]
---

# Break-Even Versus Attractive APR

The economic interpretation section makes a useful distinction: an LP break-even APR is not the same as an attractive APR.

In the source model, break-even means the LP earns enough to cover expected loss and still match the outside USDC opportunity:

```
r_I >= E[Loss] + r_f
```

That only gets the LP to indifference in expectation. To be attractive, the return must also compensate for tail risk, volatility of losses, and adverse selection. A rational LP does not supply fragile backstop capital merely to expect the same outcome as a simpler USDC strategy after absorbing more complicated risk.

## Reader Implication

When documentation discusses LP incentives, it should not treat "positive expected return" as enough. The capital has to be worth deploying after expected loss, opportunity cost, tail risk, and operational complexity.

## Publication Boundary

The source's break-even and attractive-APR ranges are model outputs. They should not become live Vibe LP marketing copy, target yields, or promises of capital availability without operator, accounting, legal, and implementation approval.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Economic Interpretation.

## Related Pages

- `authored-required-risk-premium-for-usdc-lps`
- `authored-usdc-opportunity-cost-floor`
- `authored-adverse-selection-premium-for-usdc-lps`
