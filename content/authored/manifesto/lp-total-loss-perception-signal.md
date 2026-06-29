---
id: "authored-lp-total-loss-perception-signal"
title: "LP Total-Loss Perception Signal"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#4-empirical-validation"]
relatedGeneratedPages: ["section-06-usdc-token-perps-06-docs-riskpremiumcalcs-4-empirical-validation", "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "authored-required-risk-premium-for-usdc-lps"]
---

# LP Total-Loss Perception Signal

Neelo's empirical-validation section adds a useful qualitative signal: potential LPs may perceive the USDC backstop as carrying very high loss risk.

That matters even before a final quantitative model is approved. If sophisticated capital providers believe they are being asked to supply stablecoin collateral against a high chance of severe or total loss, then ordinary yield language will not clear the market. The docs should explain that LP perception is part of the capital-formation problem.

This is not a final user-facing statistic. It is evidence that generic USDC capital may price low-cap perp backstop risk very differently from token holders who already own the underlying asset.

## Documentation Rule

Use LP perception as a diagnostic, not as an audited probability. It should explain why the required-return discussion exists, not become a standalone live risk disclosure number.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Empirical Validation.

## Related Pages

- `authored-required-risk-premium-for-usdc-lps`
- `authored-usdc-vault-negative-feedback-loop`
- `authored-break-even-versus-attractive-apr`
