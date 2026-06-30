---
id: "authored-referral-supporting-kpi-set"
title: "Referral Supporting KPI Set"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta#3-supporting-kpi-set", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-3-supporting-kpi-set", "authored-referral-market-creation-velocity", "authored-referral-supply-kpis", "authored-referral-demand-kpis"]
---

# Referral Supporting KPI Set

The product-metrics source lists supporting KPIs that explain market creation velocity instead of replacing it.

The list is deliberately mixed. Some KPIs measure supply, some measure onboarding friction, some measure referral-loop participation, and some measure demand quality.

## KPI Layers

Supply growth is measured by new listings per week. Market depth is measured by active markets, which distinguishes one-time creation from sustained trading surfaces.

Onboarding efficiency is measured by time-to-first-listing. Creator retention is measured by weekly active listers, because a one-off listing burst is weaker than repeated supply behavior.

Referral attach rate measures whether attribution participates in the growth loop. Traders per active market measures demand distribution and helps detect concentration risk. Fee-generating volume ties usage to economic output instead of vanity activity.

## How To Read The Set

No single supporting KPI proves referral success. The set is useful because it forces the dashboard to ask several questions at once:

- are more markets being created;
- are those markets active;
- are creators returning;
- are referrals attached to real market behavior;
- is demand distributed across markets;
- is the activity generating fees.

That is the difference between referral reporting and a simple invite counter.

## Publication Boundary

This page defines the source's KPI categories. It does not publish final formulas, target bands, data sources, eligibility thresholds, referral-depth accounting, or payout rules. Each public metric should be versioned when product owners approve it for release.

## Sources

- `vibe-papers`: Neelo, "Product Metrics Framework", "Supporting KPI set".
- `spec-03`: current dashboard, referral, and revenue caveats.

## Related Pages

- `authored-referral-market-creation-velocity`
- `authored-referral-supply-kpis`
- `authored-referral-demand-kpis`
