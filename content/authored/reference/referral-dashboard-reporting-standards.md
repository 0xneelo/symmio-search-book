---
id: "authored-referral-dashboard-reporting-standards"
title: "Referral Dashboard Reporting Standards"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework#9-3-reporting-rules", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/14-meeting-traceability", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta", "section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-5-dashboard-architecture", "section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-6-reporting-standards", "neelo-17-referral-program-17-docs-09-metrics-framework", "section-17-referral-program-17-docs-09-metrics-framework-9-3-reporting-rules", "neelo-17-referral-program-17-docs-14-meeting-traceability"]
---

# Referral Dashboard Reporting Standards

The product-metrics chapter defines minimum external dashboard views for a referral rollout: acquisition funnel, market supply, market demand, and integrity.

That structure matters because a referral dashboard can otherwise over-index on the easiest numbers to inflate. Code issued, signups, and first deposits are useful, but they do not prove market quality by themselves.

## Minimum Views

The source's dashboard architecture separates:

- acquisition funnel: code issued, signup, first deposit, first trade, first listing;
- market supply: new listings, active markets, and repeat listers;
- market demand: trades per market decile, depth concentration, and turnover;
- integrity: anomaly flags, suspicious volume ratio, and false-positive rates.

The metrics framework adds reporting rules: separate organic growth from campaign imports, keep formula versions explicit, and publish phase labels such as pre-beta, beta, and open.

## Traceability

The design coverage map is a routing layer for referral documentation. It says concept details should live in their owning chapter, with the map updated when chapter scope changes. The same principle should apply to dashboards: if a number is public, the docs should route to its definition, owner, and phase.

## Reader Implication

Referral dashboards should present metrics as versioned evidence, not free-floating proof. A public chart needs phase labels, formula versions, organic-versus-campaign separation, and a link back to the rule that defines it.

## Publication Boundary

This page defines reporting standards for public referral dashboards. It should not publish live dashboard availability, exact KPI formulas, metric thresholds, campaign import rules, anomaly flags, false-positive rates, or launch-phase performance targets until operator and implementation review confirm the public reporting contract.

## Sources

- `vibe-papers`: Neelo, "Product Metrics Framework".
- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Design Coverage Map".
- `spec-03`: current dashboard metrics caveats.

## Related Pages

- `authored-dashboard-overview`
- `authored-dashboard-volume`
- `authored-referral-metrics-and-integrity`
