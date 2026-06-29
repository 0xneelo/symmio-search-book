---
id: "authored-referral-metrics-decision-use"
title: "Referral Metrics Decision Use"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework#9-4-decision-use", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["section-17-referral-program-17-docs-09-metrics-framework-9-4-decision-use", "authored-referral-metrics-and-integrity", "authored-referral-dashboard-reporting-standards", "authored-referral-market-creation-velocity"]
---

# Referral Metrics Decision Use

Referral metrics should inform policy. They should not replace policy.

The metrics source gives the operating rule directly: a rising metric is not success if market quality falls at the same time. This is the boundary that keeps referral dashboards from becoming automatic payout, access, or expansion logic.

## How Decisions Should Use Metrics

Metrics are evidence for a decision lane. They can show whether referrals are creating useful listings, whether demand is distributed across active markets, whether onboarding friction is falling, and whether fee-generating activity is connected to real market behavior.

They cannot decide policy by themselves. If invite activation rises because referral codes become too easy to farm, or if listing count rises because quality thresholds were lowered, the metric is pointing at a problem rather than a win.

## Policy Still Needs Owners

The source implies a separation of roles:

- metrics describe what happened;
- dashboards make changes visible;
- operators and product owners decide whether to change policy;
- risk, security, legal, and accounting review decide whether an incentive can safely become public economic policy.

That separation matters because referral outputs can become points, rewards, claims, packs, artifacts, or fee-share expectations. Once incentives have value, the decision cannot be delegated to a chart.

## Publication Boundary

This page defines how to use the metrics framework. It does not publish final KPI thresholds, payout triggers, referral-depth rules, market-quality standards, freeze powers, or automatic policy changes.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework", "Decision Use".
- `spec-03`: current referral, points, and dashboard caveats.

## Related Pages

- `authored-referral-market-creation-velocity`
- `authored-referral-metrics-and-integrity`
- `authored-referral-dashboard-reporting-standards`
