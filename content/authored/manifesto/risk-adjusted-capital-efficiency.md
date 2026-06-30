---
id: "authored-risk-adjusted-capital-efficiency"
title: "Capital Efficiency Must Be Risk-Adjusted"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure4", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure5", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure4", "neelo-06-usdc-token-perps-06-docs-figure5", "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs"]
---

# Capital Efficiency Must Be Risk-Adjusted

The USDC-versus-token-vault source makes a useful distinction: gross leverage is not the same thing as useful capital efficiency.

A system can report open interest against deposited capital, but if the capital is expensive, fragile, or exposed to adverse selection, the headline ratio misleads. For low-cap perps, the cost of backstop capital can be the constraint. A USDC LP pool may need conservative leverage and a high risk premium. Token inventory may support more market-specific exposure because the holder already bears the asset risk.

Figure4 compares structural leverage. Figure5 then adds the risk-premium multiplier. The resulting source-model claim is that VibeCaps-style token inventory can be far more risk-adjusted-capital-efficient than an external USDC LP design.

## What The Docs Should Teach

Capital efficiency has to answer three questions:

1. How much market exposure can the capital safely support?
2. What return does that capital require to participate?
3. Who absorbs the loss when the market moves through the model?

Without those questions, "more leverage" and "more OI" can hide a worse design.

## Publication Boundary

This page uses source-model comparison evidence to teach risk-adjusted capital efficiency. It does not publish a live efficiency ratio, final leverage claim, LP yield promise, or audited capital-efficiency advantage without current market parameters, vault data, risk review, legal review, and operator approval.

## Sources

- `vibe-papers`: Neelo, "Figure4".
- `vibe-papers`: Neelo, "Figure5".
- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial".

## Related Pages

- `authored-hybrid-perps-comparative-advantage`
- `authored-lp-yield-capital-efficiency-pillar`
- `authored-token-vault-perps-versus-usdc-pools`
