---
id: "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-1-methodology-and-first-principles"
title: "Required APR Derivation for USDC Depositors in Imperial: 1. Methodology and First Principles"
section: "vision-sections"
track: "06 - USDC vs Token-Margined Perpetuals"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#1-methodology-and-first-principles"]
parentPageId: "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs"
sourcePath: "Docs/public/06_usdc_token_perps/06_docs/riskPremiumCalcs.md"
headingId: "1-methodology-and-first-principles"
---

# Required APR Derivation for USDC Depositors in Imperial: 1. Methodology and First Principles

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs#1-methodology-and-first-principles

## Extracted Section Draft

## 1. Methodology and First Principles

To ensure our APR derivation is robust and not merely arbitrary, we ground each variable in established financial and economic frameworks:

1.  **Rational Choice Theory / Game Theory** for attack probabilities ($p_j$):
    *   **Principle:** Attacks are not random events but deliberate actions by rational agents.
    *   **Model:** An attack occurs if $Expected Payoff > Cost$.
    *   **Implication:** If a vulnerability is profitable to exploit, the probability of attack approaches 1 (certainty), not a small random percentage.

2.  **Extreme Value Theory (EVT)** for operational tail risks:
    *   **Principle:** In complex systems (DeFi protocols), loss distributions are "fat-tailed" (leptokurtic).
    *   **Model:** Standard deviations underestimate risk; we must look at "Tail Value at Risk" (TVaR) or "Expected Shortfall" (ES).
    *   **Implication:** A small "probability" of failure results in total loss, requiring a premium far exceeding the mathematical expectation of loss.

3.  **CAPM and Sharpe Ratios** for Opportunity Cost ($r_f$) and Risk Premiums:
    *   **Principle:** Capital is scarce and mobile. It flows to the highest risk-adjusted return.
    *   **Model:** $Return = RiskFree + \beta \times MarketRiskPremium + Alpha$.
    *   **Implication:** LPs will not deposit USDC in a high-risk protocol unless the Sharpe Ratio (Return/Risk) is competitive with other DeFi opportunities (e.g., Aave, Compound, Uniswap).

4.  **Option Pricing Theory (Black-Scholes Analogy)** for LP positions:
    *   **Principle:** Providing liquidity in a delta-neutral protocol is analogous to writing put options.
    *   **Model:** LPs are short volatility (gamma). When prices move extremely (jump diffusion), LPs suffer losses.
    *   **Implication:** The APR must equal the premium of the "put option" LPs are effectively selling to the market (protection against price crashes/pumps).

---
