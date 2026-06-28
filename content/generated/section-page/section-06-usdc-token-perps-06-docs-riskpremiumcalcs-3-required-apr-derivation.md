---
id: "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-required-apr-derivation"
title: "Required APR Derivation for USDC Depositors in Imperial: 3. Required APR Derivation"
section: "vision-sections"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#3-required-apr-derivation"]
parentPageId: "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs"
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/riskPremiumCalcs.md"
headingId: "3-required-apr-derivation"
---

# Required APR Derivation for USDC Depositors in Imperial: 3. Required APR Derivation

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#3-required-apr-derivation

## Extracted Section Draft

## 3. Required APR Derivation

### 3.1 Derivation Framework

We use a modified **Capital Asset Pricing Model (CAPM)** adapted for DeFi structural risks:

```
r_I = r_f + E[Loss] + Premium(Adverse Selection, Illiquidity)
```

### 3.2 Component Breakdown

#### Risk-Free Rate ($r_f$)
- **Derivation:** Yield on low-risk USDC strategies (e.g., Aave/Compound supply APY, Uniswap V3 stable pairs).
- **Benchmark:** ~5% - 10% (historically 3-5% base + smart contract premium).
- **Justification:** This is the *opportunity cost* of capital. Rational LPs will not deploy capital for less than the "risk-free" DeFi rate.

#### Expected Loss ($E[Loss]$)
- **Derivation:** Actuarial sum of risk events (see Section 2).
- **Value:** **30% - 50%** per year.
- **Justification:** This is the *cost of doing business*. It is not "yield"; it is capital maintenance.

#### Adverse Selection Risk Premium (ASRP)
- **Derivation:** Option Pricing Theory & Lemon's Problem (Akerlof).
- **Value:** **45% - 90%** per year.
- **Justification:**
    1.  **Short Option Profile:** LPs are effectively selling "tail risk insurance" (put options) to traders. In highly volatile/manipulable markets, the premium for these options is massive (implied volatility > 150%).
    2.  **Adverse Selection:** Attackers have superior information (they know when they will attack). LPs are "uninformed" counterparties. To trade against informed order flow, market makers (LPs) require a massive spread/premium.

### 3.3 Full Calculation

**Conservative Scenario:**
```
r_I = 30% (EL) + 5% (r_f) + 45% (ASRP) = 80%
```

**Base Case:**
```
r_I = 40% (EL) + 7% (r_f) + 65% (ASRP) = 112%
```

**Aggressive Scenario:**
```
r_I = 50% (EL) + 10% (r_f) + 90% (ASRP) = 150%
```

**Realistic Range:**

```
r_I ≈ 80% - 150% per year
```

**Why the APR Requirement Remains High:**
Even though we shifted from "tail probability" to "incentive-based" risk, the required APR remains extreme (80-150%). In fact, the "incentive-based" framing makes the risk **more acute**:
- Random tail events *might* happen.
- Economically incentivized attacks *will* happen.
- This certainty requires a massive premium (ASRP) to keep rational capital in the system.

---
