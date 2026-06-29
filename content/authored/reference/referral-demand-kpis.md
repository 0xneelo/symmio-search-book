---
id: "authored-referral-demand-kpis"
title: "Referral Demand KPIs"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-09-metrics-framework", "neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta", "authored-referral-market-creation-velocity"]
---

# Referral Demand KPIs

Supply metrics say whether markets are being created. Demand metrics say whether those markets attract real trader attention.

The source names demand KPIs such as:

- traders per active market;
- fee-generating volume;
- market turnover concentration;
- trades per market decile, depth concentration, and turnover.

This layer prevents a referral program from mistaking listed markets for working markets. A market that exists but attracts no traders is weaker evidence than a market with distributed trader participation and fee-producing activity.

## Concentration Risk

Demand distribution matters. If most fee-generating volume comes from a few markets or a few accounts, headline volume can look healthy while the long-tail market-formation thesis remains unproven. The docs should therefore explain both aggregate demand and concentration.

## Publication Boundary

The docs can define the demand layer and its purpose. They should not publish final demand thresholds, fee-quality scoring, depth formulas, market decile construction, or partner-specific performance claims until implementation and analytics owners approve them.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Product Metrics Framework".
- `spec-03`: product-state and dashboard-metric caveats.

## Related Pages

- `authored-referral-market-creation-velocity`
- `authored-referral-dashboard-reporting-standards`
- `authored-dashboard-volume`
