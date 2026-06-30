---
id: "authored-adverse-selection-premium-for-usdc-lps"
title: "Adverse Selection Premium For USDC LPs"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-required-apr-derivation", "authored-profitable-manipulation-condition"]
---

# Adverse Selection Premium For USDC LPs

Neelo's required-APR model adds an adverse-selection premium because low-cap perp LPs can be trading against better-informed and more strategic flow.

The source links this to two ideas. First, an LP can resemble a seller of tail-risk insurance: the LP is exposed when the market moves violently or when the system fails to close risk cleanly. Second, an attacker knows when they intend to attack. The passive LP does not. That informational asymmetry is adverse selection.

This is why the premium is not only about historical volatility. The LP is being asked to stand behind a market where toxic flow may arrive exactly when the LP is least protected. A rational market maker or insurer charges more for that job than for ordinary passive exposure.

## Documentation Rule

Docs should separate ordinary expected loss from adverse selection. Expected loss asks what failures cost on average. Adverse selection asks why the LP needs extra premium to face informed, strategic, or tail-risk-seeking counterparties.

## Publication Boundary

The source gives model ranges for this premium. Keep those as comparative analysis until approved against current Vibe market design, solver controls, eligible LP terms, and legal/accounting language.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Adverse Selection Risk Premium.

## Related Pages

- `authored-profitable-manipulation-condition`
- `authored-usdc-risk-methodology-stack`
- `authored-active-risk-management-vs-passive-physics`
