---
id: "authored-referral-market-creation-velocity"
title: "Referral Market Creation Velocity"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/11-conclusion", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-09-metrics-framework", "section-17-referral-program-17-docs-09-metrics-framework-9-1-north-star", "neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta", "section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-2-north-star-metric"]
---

# Referral Market Creation Velocity

Neelo's metrics framework names high-quality listings created and sustained over time as the referral program's core business metric. The product-metrics chapter gives the public label: market creation velocity.

That choice is important. Raw users, raw invites, or raw referral-code activations can rise while the market layer gets worse. The referral system only matters to Vibe if it helps create tradable opportunities that attract demand and generate fees.

## What The Metric Protects

Market creation velocity protects the docs from treating referrals as a standalone marketing widget. The conclusion of the referral source says the program connects user acquisition, market creation, and fee distribution. If a referral loop increases acquisition but does not improve market supply, it is not proving the core thesis.

Useful supporting signals include:

- new listings per week and active markets;
- time-to-first-listing and weekly active listers;
- traders per active market and fee-generating volume;
- repeat listers and market activation rates.

Those signals distinguish creation from sustained quality. A market that is listed but never attracts two-sided interest is weaker evidence than a market that produces repeated lister activity, trader participation, and fee flow.

## Guardrail

The product-metrics chapter warns against optimizing headline KPIs by lowering market-quality thresholds. In this compendium, referral success should be described as quality-adjusted market formation, not maximum referral count.

## Publication Boundary

This page explains the source-backed north star and supporting metric categories. It should not publish live dashboard formulas, exact launch targets, market-quality thresholds, listing approval rules, partner performance guarantees, issuer eligibility, or reward payout consequences until those are approved for public release. Treat market creation velocity as an evaluation lens, not a promise that any specific campaign, listing, or partner flow will produce volume or fees.

## Reader Implication

When users ask whether the referral system is working, the answer should route to market creation first. Invite growth is useful only when it compounds into listings, active markets, demand distribution, and credible fee generation.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Product Metrics Framework".
- `vibe-papers`: Neelo, "Section 11: Conclusion".
- `spec-03`: current product-state and dashboard caveats.

## Related Pages

- `authored-referral-architecture-as-market-formation`
- `authored-market-scoped-referrals`
- `authored-referral-metrics-and-integrity`
