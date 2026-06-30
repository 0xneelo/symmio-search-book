---
id: "authored-symm-lp-gross-to-net-attribution-bridge"
title: "SYMM LP Gross-To-Net Attribution Bridge"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-6-revenue-attribution-qualitative", "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-7-measurement-gaps-to-close", "section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-4-kpi-stack-for-a-beta-report"]
---

# SYMM LP Gross-To-Net Attribution Bridge

A gross-to-net attribution bridge explains where LP profit came from and what reduced it before the final net result.

The SYMM LP source says the dominant revenue share came from trader-side losses in a long-skew down-price regime, with additional contributions from funding, fees, and liquidation-related cashflows. It also says a production-grade case study should add a gross-to-net bridge covering funding, fees, liquidations, slippage, and attribution.

That bridge is important because "LP profit" is not one mechanism. The same final number could come from trader losses, funding transfers, trading fees, liquidation events, token mark movement, or accounting treatment. Without attribution, readers cannot tell whether the result is durable, repeatable, or merely a one-window regime artifact.

## Bridge Shape

The public report should start from gross economic drivers and reconcile to the final LP result:

- trader PnL transfer;
- funding transfer;
- trading fees;
- liquidation-related cashflows;
- slippage, execution cost, or hedge cost if applicable;
- fee deductions, vault expenses, or accounting adjustments;
- final realized and marked LP result.

## Publication Boundary

Do not use the bridge to imply every channel is live, automated, withdrawable, or allocated to LPs in the same way until accounting and implementation owners confirm it. The source-backed requirement is attribution discipline: public performance should show the path from gross drivers to net LP outcome.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics: Revenue Attribution".
- `vibe-papers`: Neelo, "Performance and Unit Economics: Measurement Gaps to Close".
- `vibe-papers`: Neelo, "Scaling and Replication Framework: KPI Stack for a Beta Report".

## Related Pages

- `authored-symm-lp-economic-channels`
- `authored-symm-lp-unit-economics`
- `authored-symm-lp-data-guardrails`
