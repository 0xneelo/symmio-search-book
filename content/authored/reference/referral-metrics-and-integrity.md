---
id: "authored-referral-metrics-and-integrity"
title: "Referral Metrics And Integrity"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/08-security-controls", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework#9-2-kpi-layers", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-08-security-controls", "neelo-17-referral-program-17-docs-09-metrics-framework", "section-17-referral-program-17-docs-09-metrics-framework-9-2-kpi-layers", "neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta"]
---

# Referral Metrics And Integrity

The referral program's north star is not raw signups. Neelo's metrics framework names high-quality listings created and sustained over time as the core business metric. Listings attract trader attention, and trader attention drives fee generation.

That framing prevents a common growth mistake: celebrating referral volume while market quality deteriorates. A referral system can only be considered healthy if it improves supply, demand, conversion, and integrity together.

## KPI Layers

The source separates the KPI stack into layers:

- supply: new listings, active markets, repeat listers, and time-to-first-listing;
- demand: traders per active market, fee-generating volume, turnover concentration, and demand distribution;
- growth: referral attach rate, code-to-first-trade conversion, code-to-first-listing conversion, and claim conversion;
- integrity: suspicious volume incidence, disputes, claim anomalies, vesting anomalies, and expected-versus-realized reward deviations.

## Security Controls

The security section names the core risk surfaces: points ledger tampering, signer compromise, claim replay, over-issuance, and launch-phase blind spots. The minimum control set includes signer isolation, key rotation, replay-safe claims, nonces, expiry, tier/admin audit trails, and anomaly monitoring.

The design principle is simple: incentive systems should fail closed on settlement. Growth can recover after verification. Credibility cannot recover easily after silent reward inflation.

## Reader Implication

The docs should report referral growth with phase labels, formula versions, and organic-versus-campaign separation. They should also expose the integrity frame so users understand that anti-gaming controls are part of the product, not friction added after the fact.

## Publication Boundary

This page can publish the source-backed metric layers and integrity categories. It should not publish live KPI targets, campaign thresholds, anomaly scores, dispute procedures, signer/key-rotation details, vesting formulas, reward-deviation tolerances, or enforcement outcomes until operator, implementation, security, legal, and accounting review confirm them.

## Sources

- `vibe-papers`: Neelo, "Section 8: Security Controls".
- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Product Metrics Framework".
- `spec-03`: Current product metrics and points caveats.

## Related Pages

- `authored-referral-issuance-and-anti-gaming`
- `authored-points-taxonomy`
- `neelo-17-referral-program-17-docs-09-metrics-framework`
