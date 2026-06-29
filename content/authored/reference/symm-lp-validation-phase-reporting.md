---
id: "authored-symm-lp-validation-phase-reporting"
title: "SYMM LP Validation Phase Reporting"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-3-practical-deployment-playbook", "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-7-measurement-gaps-to-close", "authored-symm-lp-beta-report-kpis"]
---

# SYMM LP Validation Phase Reporting

The validation phase begins after the pilot has enough activity to produce weekly PnL attribution and drawdown reports.

The source's question is direct: did returns come from repeatable market structure or one lucky directional window? A validation report should answer that before more capital enters. It should show whether realized profit, marked profit, funding, fees, liquidations, trader-side losses, and token price movement are recurring or concentrated in one event.

Weekly cadence matters because it turns the case from a final screenshot into an operating record. A reader can see whether the strategy survived multiple market states, whether drawdowns recovered, and whether attribution changed as trader behavior changed.

## Minimum Validation Packet

A validation report should include:

- realized versus marked PnL split;
- drawdown and recovery time;
- gross-to-net attribution;
- open-interest concentration and leverage distribution;
- benchmark update versus token hold and full sell;
- notes on any liquidity, liquidation, or data-quality issue.

## Publication Boundary

Do not move from pilot to public scale using only endpoint profit. The source-backed validation rule is that weekly attribution and drawdown evidence should exist before the case is treated as more than an observed pilot.

## Sources

- `vibe-papers`: Neelo, "Scaling and Replication Framework: Practical Deployment Playbook".
- `vibe-papers`: Neelo, "Performance and Unit Economics: Measurement Gaps to Close".

## Related Pages

- `authored-symm-lp-beta-report-kpis`
- `authored-symm-lp-realized-marked-pnl-split`
- `authored-symm-lp-drawdown-recovery-reporting`
