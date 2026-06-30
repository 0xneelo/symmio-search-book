---
id: "authored-symm-lp-data-guardrails"
title: "SYMM LP Data Guardrails"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics"]
relatedGeneratedPages: ["neelo-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-3-metric-definitions-lp-perspective", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-4-interpretation-guardrails"]
---

# SYMM LP Data Guardrails

The SYMM LP case-study data is useful because it names the exact metrics being interpreted, but it should still be treated as a snapshot. The source uses dashboard values, case inputs, and daily-series references; it does not present a full audited vault report with every trade, fee, liquidation, drawdown, and attribution bridge.

The key dashboard fields are:

- total tokens, locked tokens, free tokens, and total USDC;
- user profit, current debt, current UPnL, total OI, long OI, and short OI;
- long utilization, open-interest quantity, and open-position count;
- deposited tokens, current token balance, average deposit price, current price reference, and realized/unrealized LP profit.

## Guardrails For Publication

Do not treat one data cut as a full-cycle performance report. Do not sum heterogeneous dashboard fields unless the accounting method confirms they are additive. Keep realized and unrealized components separate. Explain that negative user-side debt or PnL is favorable to the LP side only under the stated sign convention.

The reproducibility note also matters. The source window starts at the first deposit timestamp and runs through the referenced dashboard snapshot. Daily annualized yield is computed from average per-day yield times 365, without compounding. That convention should be visible whenever the case is converted into public-facing yield language.

## Reader Implication

This page is the boundary between compelling evidence and overclaiming. It lets the compendium use the SYMM case as a proof of mechanism while still asking for audited attribution, time series, drawdown, gross-to-net bridges, and benchmark updates before publishing it as a general LP performance standard.

## Publication Boundary

Do not treat the data cut as a complete audit, a current vault statement, or a public accounting standard. Final public reporting needs durable raw sources, owner-approved sign conventions, refresh cadence, realized/unrealized reconciliation, and accounting review before figures are reused outside this case-study context.

## Sources

- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions".
- `vibe-papers`: Neelo, "Performance and Unit Economics".

## Related Pages

- `authored-symm-lp-unit-economics`
- `authored-symm-lp-risk-and-edge-cases`
- `neelo-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions`
