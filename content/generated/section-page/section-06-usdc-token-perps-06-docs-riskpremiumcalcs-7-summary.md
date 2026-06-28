---
id: "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-7-summary"
title: "Required APR Derivation for USDC Depositors in Imperial: 7. Summary"
section: "vision-sections"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#7-summary"]
parentPageId: "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs"
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/riskPremiumCalcs.md"
headingId: "7-summary"
---

# Required APR Derivation for USDC Depositors in Imperial: 7. Summary

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#7-summary

## Extracted Section Draft

## 7. Summary

**Required APR for USDC LPs in Imperial:**

```
r_I ≈ 80% - 150% per year
```

**Derived from:**
1. Expected annual protocol loss: **30% - 50%**
2. Risk-free rate (opportunity cost): **5% - 10%**
3. Adverse Selection Risk Premium: **45% - 90%**

**Economic rationale:**
- LPs must be compensated for high expected losses
- **Adverse selection:** Attacks are targeted, not random; LPs are the "yield"
- Must exceed opportunity cost of USDC
- Market equilibrium requires high APR to attract capital

**Implications:**
- Very poor risk-adjusted capital efficiency
- Sustainability challenges (high fees, token emissions)
- Token-backed designs (like Vibecaps) avoid this problem entirely
