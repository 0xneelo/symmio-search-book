---
id: "authored-symm-lp-drawdown-recovery-reporting"
title: "SYMM LP Drawdown And Recovery Reporting"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/04-risk-analysis-and-edge-cases", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-7-measurement-gaps-to-close", "section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-4-kpi-stack-for-a-beta-report", "section-12-case-study-symm-lp-12-docs-04-risk-analysis-and-edge-cases-4-2-principal-risk-vectors"]
---

# SYMM LP Drawdown And Recovery Reporting

The SYMM LP source names max drawdown, drawdown duration, and recovery time as required beta-report fields.

That is the right standard because LP performance is not only about ending profit. A vault can finish positive while exposing depositors to large interim losses, long recovery periods, or stress that would have forced some capital to exit early. Drawdown reporting shows whether the result was operationally tolerable, not merely arithmetically positive at the end.

The risk section explains why this matters. Directional reversal, unrealized PnL volatility, leverage amplification, liquidity stress, and concentration can all turn a favorable LP snapshot into a fragile path. A drawdown report is where those risks become visible.

## What The Report Should Include

A useful drawdown section should identify:

- peak-to-trough NAV decline;
- time spent below the previous high;
- realized versus marked contribution to the drawdown;
- largest adverse move by token price, skew, open interest, and leverage;
- recovery time and whether recovery came from fees, funding, trader losses, liquidation cashflows, or token repricing.

## Publication Boundary

Do not imply that a favorable endpoint had low path risk unless the drawdown evidence proves it. The source-backed requirement is that future public reports include drawdown and recovery fields before the case is generalized or scaled.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics: Measurement Gaps to Close".
- `vibe-papers`: Neelo, "Risk Analysis and Edge Cases".
- `vibe-papers`: Neelo, "Scaling and Replication Framework: KPI Stack for a Beta Report".

## Related Pages

- `authored-symm-lp-regime-dependence`
- `authored-symm-lp-risk-and-edge-cases`
- `authored-symm-lp-beta-report-kpis`
