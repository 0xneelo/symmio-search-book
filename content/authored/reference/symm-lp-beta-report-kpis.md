---
id: "authored-symm-lp-beta-report-kpis"
title: "SYMM LP Beta Report KPI Stack"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/04-risk-analysis-and-edge-cases", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-4-kpi-stack-for-a-beta-report", "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-7-measurement-gaps-to-close", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-4-interpretation-guardrails"]
---

# SYMM LP Beta Report KPI Stack

The SYMM LP source gives enough evidence for a proof-of-mechanism page, but a repeated public beta report needs a stricter KPI stack. The goal is to show whether LP economics are durable, attributable, and safe to scale.

Minimum beta-report metrics should include:

- net ROI versus a token-hold benchmark;
- realized ROI versus total marked ROI;
- maximum drawdown and recovery time;
- fee, funding, liquidation, and user-PnL attribution;
- open-interest concentration and leverage distribution;
- capacity stress at higher TVL tiers.

## Accounting Requirements

The report also needs a sign-convention dictionary for dashboard fields. `Current Debt`, `Current UPnL`, and `User Profit` are user-side fields; negative values are favorable to the LP side only under the stated convention. Realized and unrealized components should stay separate in public tables.

The source also calls for vault-level time series, day/week realized and unrealized splits, max drawdown duration, and a gross-to-net bridge. Without those, a single snapshot can look more complete than it is.

## Reader Implication

The KPI stack turns a compelling case study into an operational reporting standard. It lets future LPs see not only that a period was profitable, but where the profit came from, how much was realized, what risk was carried, and when scaling should stop.

## Sources

- `vibe-papers`: Neelo, "Scaling and Replication Framework".
- `vibe-papers`: Neelo, "Risk Analysis and Edge Cases".
- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions".

## Related Pages

- `authored-symm-lp-replication-framework`
- `authored-symm-lp-data-guardrails`
- `authored-symm-lp-current-debt-and-upnl`
