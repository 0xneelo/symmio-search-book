---
id: "authored-symm-lp-benchmark-reading"
title: "Reading The SYMM LP Benchmarks"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/01-executive-summary", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-3-benchmark-comparison", "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-1-concrete-performance-metrics-three-deposits", "neelo-12-case-study-symm-lp-12-docs-01-executive-summary"]
---

# Reading The SYMM LP Benchmarks

The SYMM LP benchmark table compares three uses of the same starting notional: hold the deposited SYMM, deposit the SYMM into Vibe LP, or sell the original position into USDC at the start. The comparison is useful because it separates token mark-to-market from cash earned.

The source reports:

- Full Hold ending funds: `$16,806.37`, or `-42.19%`.
- Vibe deposit ending funds: `$32,405.05`, or `+11.47%`.
- Full Sell ending funds: `$29,070.48`, or `0.00%`.

In that window, the Vibe deposit beat Full Hold by `$15,598.68` and Full Sell by `$3,334.57`. The case also reports `+47.80%` combined realized and unrealized return on deposit-time notional before the portfolio-level token mark is applied.

## What The Benchmark Proves

The benchmark proves that, for this data window, LP cash earnings and token-count growth more than offset the decline in SYMM's mark-to-market price. That is why the Vibe-deposit scenario can show a positive total-funds outcome even while the token price fell.

It does not prove a constant yield. The source explicitly ties the outperformance to a favorable long-crowding and down-price regime. A production case study should rerun the same benchmark across multiple regimes, including uptrend and chop.

## Reader Implication

Use the benchmark table as a wealth comparison, not a headline APR. It answers "what happened to this allocation versus simple alternatives?" The next required question is whether that spread survives different skew, liquidity, leverage, and trader-profit conditions.

## Sources

- `vibe-papers`: Neelo, "Executive Summary".
- `vibe-papers`: Neelo, "Performance and Unit Economics".
- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions".

## Related Pages

- `authored-symm-lp-unit-economics`
- `authored-symm-lp-current-debt-and-upnl`
- `authored-symm-lp-risk-and-edge-cases`
