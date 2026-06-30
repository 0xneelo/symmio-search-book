---
id: "authored-usdc-risk-methodology-stack"
title: "USDC Risk Methodology Stack"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-1-methodology-and-first-principles", "authored-required-risk-premium-for-usdc-lps"]
---

# USDC Risk Methodology Stack

Neelo's USDC risk-premium derivation is strongest when read as a stack of methods, not as one universal spreadsheet model.

The source uses rational-choice and game-theory logic for deliberate attacks: if the payoff from creating bad debt exceeds the cost of manipulation, the attack should be treated as economically likely rather than as a tiny random probability. It uses extreme-value thinking for tail risks because standard deviation can understate loss distributions where rare failures can be total. It uses CAPM and Sharpe-ratio language to ask whether stablecoin capital is receiving a competitive risk-adjusted return. It uses an option-pricing analogy because a passive LP can resemble a seller of tail-risk insurance.

That matters for documentation because each method answers a different question. Game theory asks whether an exploit is profitable. Tail-risk analysis asks how bad failure can become. CAPM asks what the capital could earn elsewhere. Option pricing asks what premium an LP should receive for absorbing volatility and adverse selection.

## Publication Boundary

The source-model stack is useful for teaching why low-cap USDC backstops can be expensive. It should not be published as an audited risk model, live Vibe pricing system, or final LP-yield promise without operator, risk, accounting, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Methodology and First Principles.

## Related Pages

- `authored-required-risk-premium-for-usdc-lps`
- `authored-token-vault-perps-versus-usdc-pools`
- `authored-risk-adjusted-capital-efficiency`
