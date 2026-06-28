---
id: "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-4-empirical-validation"
title: "Required APR Derivation for USDC Depositors in Imperial: 4. Empirical Validation"
section: "vision-sections"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#4-empirical-validation"]
parentPageId: "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs"
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/riskPremiumCalcs.md"
headingId: "4-empirical-validation"
---

# Required APR Derivation for USDC Depositors in Imperial: 4. Empirical Validation

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#4-empirical-validation

## Extracted Section Draft

## 4. Empirical Validation

### 4.1 Behavioral Evidence

From discussions with potential LPs:

> "On our side people would be okay with ~1% [APR]; there they have to expect a ~90% chance of total loss and provide USDC."

This suggests LPs perceive:
- **Very high probability of total loss** (not just 30-50% expected loss)
- **Requirement for very high APR** to compensate

### 4.2 Updated Risk-Premium Calculation

If we assume:
- **Vibecaps token providers:** Accept 1% APR or less
- **Imperial USDC LPs:** Require ~100% APR to compensate for:
  - 30-50% expected protocol loss
  - Tail risk premium
  - Opportunity cost

Then the risk-premium ratio becomes:

```
r_I / r_V ≈ 100% / 1% = 100×
```

This is even more extreme than the conservative 15× ratio used in the main analysis.

---
