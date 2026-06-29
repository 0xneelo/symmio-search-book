---
id: "authored-referral-phase-version-reporting-rules"
title: "Referral Phase And Version Reporting Rules"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-09-metrics-framework", "neelo-17-referral-program-17-docs-12-product-metrics-prebeta-beta", "authored-referral-dashboard-reporting-standards"]
---

# Referral Phase And Version Reporting Rules

Neelo's reporting rules are as important as the KPIs themselves: separate organic growth from campaign imports, keep formula versions explicit, and publish phase labels.

The product-metrics source defines the rollout phases as beta access-gated, beta, and open phase. Metrics from those phases should not be compared as if the product state were identical. A gated launch can show high conversion because the cohort is curated. An open phase can show lower conversion while proving broader reach.

Formula versioning prevents another failure mode. If the scoring logic changes and the chart does not say so, readers can mistake an instrumentation change for real product acceleration or decay.

## Decision Use

The metrics framework says metrics should inform policy, not substitute for it. A metric that rises while market quality falls is not success. Public docs should preserve that rule so growth dashboards do not become a license to lower quality thresholds.

## Publication Boundary

The docs can require phase labels, organic/campaign separation, formula versions, and stable definitions. Final formula text, target bands, campaign import labels, phase dates, and policy thresholds remain owner-approved release-note material.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Product Metrics Framework".
- `spec-03`: dashboard and product-metric caveats.

## Related Pages

- `authored-referral-dashboard-reporting-standards`
- `authored-referral-market-creation-velocity`
- `authored-referral-access-phasing-operating-model`
