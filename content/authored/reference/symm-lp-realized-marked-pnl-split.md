---
id: "authored-symm-lp-realized-marked-pnl-split"
title: "SYMM LP Realized And Marked PnL Split"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "symmio-settlement", "symmio-profit-realization"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework", "https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/settlement.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/settlement-and-profit-realization.md"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-5-metric-sign-convention-critical", "section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-4-kpi-stack-for-a-beta-report", "authored-symm-lp-current-debt-and-upnl"]
---

# SYMM LP Realized And Marked PnL Split

The SYMM LP report must split realized ROI from total marked ROI.

The case-study source already separates the two components. `Current Debt` is treated as realized user debt to the LP under the stated sign convention. `Current UPnL` is the current unrealized user profit and loss at the mark. Negative values in those user-side fields are favorable to the LP, but they do not have the same cash status.

That distinction matters for public reporting. Realized PnL is closer to settled performance. Marked PnL is path-dependent. It can improve, compress, or reverse before it becomes realized. Combining both into one headline return can make a case study sound more liquid and certain than it is.

## Reporting Standard

A credible beta report should show at least three rows:

- realized ROI;
- marked-but-unrealized ROI;
- total marked ROI with the first two components visibly separated.

For a time-series report, the split should appear by day or week, not only at the final snapshot. That lets readers see whether the result came from steadily realized fees and debt, a large mark-to-market gain, or a temporary endpoint.

## Publication Boundary

Do not describe unrealized PnL as withdrawable cash. Do not collapse settlement-state, dashboard-state, and marked-state values unless the accounting owner confirms the mapping. The source-backed claim is the split itself; live withdrawal semantics and final public table labels need operator/accounting review.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics: Metric Sign Convention".
- `vibe-papers`: Neelo, "Scaling and Replication Framework: KPI Stack for a Beta Report".
- `symmio-settlement`: official settlement-state boundary.
- `symmio-profit-realization`: official LP profit-realization context.

## Related Pages

- `authored-symm-lp-current-debt-and-upnl`
- `authored-symmio-settlement-profit-realization`
- `authored-symm-lp-unit-economics`
