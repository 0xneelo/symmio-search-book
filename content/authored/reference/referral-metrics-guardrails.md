---
id: "authored-referral-metrics-guardrails"
title: "Referral Metrics Guardrails"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-product-metrics-prebeta-beta#7-guardrails", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-12-product-metrics-prebeta-beta-7-guardrails", "authored-referral-metrics-and-integrity", "authored-referral-dashboard-reporting-standards"]
---

# Referral Metrics Guardrails

The product-metrics source gives three guardrails for referral measurement:

- do not optimize headline KPIs by lowering market quality thresholds;
- keep anti-gaming controls active when incentive surfaces expand;
- ensure referral growth does not outpace monitoring and dispute tooling.

Those guardrails keep the referral program aligned with market formation instead of pure growth theater.

## Headline Metrics Are Not The Goal

A referral program can make a dashboard look better while making the market worse. If the system lowers listing standards to increase new listings, increases code issuance without activation quality, or pays for activity that is easy to spoof, headline KPIs stop being evidence.

The source's first guardrail therefore protects market quality thresholds. Growth that degrades market quality is not progress toward Vibe's thesis.

## Incentives Need Controls

The second and third guardrails are operational. Incentive surfaces should not expand faster than anti-gaming, monitoring, dispute handling, and reconciliation tooling.

That is why referral metrics should be paired with integrity views. A chart that shows referral attach rate without anomaly rate, suspicious volume, dispute state, or formula version is incomplete.

## Publication Boundary

This page defines measurement guardrails. It does not publish final anti-gaming rules, anomaly thresholds, dispute procedures, freeze powers, market-quality thresholds, or enforcement policy. Those need product, risk, legal, and operator review.

## Sources

- `vibe-papers`: Neelo, "Product Metrics Framework", "Guardrails".
- `spec-03`: current referral, points, and dashboard caveats.

## Related Pages

- `authored-referral-metrics-and-integrity`
- `authored-referral-anomaly-monitoring-signals`
- `authored-referral-fail-closed-incident-operations`
