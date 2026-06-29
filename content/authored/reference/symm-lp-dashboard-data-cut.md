---
id: "authored-symm-lp-dashboard-data-cut"
title: "SYMM LP Dashboard Data Cut"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/02-case-context-and-setup", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-7-data-cut-dashboard-state", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-2-data-values-referenced", "authored-symm-lp-data-guardrails"]
---

# SYMM LP Dashboard Data Cut

The SYMM LP case study uses a specific dashboard state as its data cut. That matters because the case is not a continuously audited time series in the current source. It is a point-in-time interpretation of displayed fields.

The setup source records user-side fields including `User Profit = -5,816.45`, `Current Debt = -5,895.90`, and `Current UPnL = -7,999.32`. It also records market-state fields such as total open interest, long open interest, short open interest, open positions, and utilization.

## How To Read The Cut

The data cut gives the state that the performance section interprets. Negative user-side debt and UPnL are favorable to the LP in the case-study sign convention, but the field names are still user-side fields.

That is why this page should be read beside the data-guardrails page. A single cut can show the mechanism, but it cannot prove drawdown behavior, attribution over time, or whether the same fields would remain favorable after settlement, market reversal, or higher volume.

## Reader Implication

When a reader asks what data the case relies on, answer with the cut, not only the summary. The source has a concrete dashboard snapshot, and the public docs should keep that snapshot tied to its timestamp and state rather than making it sound like an always-current product metric.

This also gives reviewers a checklist for production: any public LP case should identify source fields, sign conventions, time window, current versus realized accounting, and reproducibility notes.

## Publication Boundary

Do not publish the case as audited current performance, live dashboard truth, or a recurring report until source ownership, current data access, refresh cadence, and accounting treatment are confirmed. The source-backed claim is that the case study interprets a specific dashboard data cut.

## Sources

- `vibe-papers`: Neelo, "Case Context and Setup".
- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions".

## Related Pages

- `authored-symm-lp-data-guardrails`
- `authored-symm-lp-current-debt-and-upnl`
- `authored-symm-lp-beta-report-kpis`
- `section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-7-data-cut-dashboard-state`
