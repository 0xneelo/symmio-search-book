---
id: "authored-symm-lp-regime-updated-benchmarks"
title: "SYMM LP Regime-Updated Benchmarks"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/04-risk-analysis-and-edge-cases", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-3-benchmark-comparison", "section-12-case-study-symm-lp-12-docs-04-risk-analysis-and-edge-cases-4-4-edge-cases-to-test-before-scaling", "section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-5-replication-risk"]
---

# SYMM LP Regime-Updated Benchmarks

The SYMM LP benchmark table should be refreshed across regimes, not treated as a permanent spread.

The source compares three scenarios for the same starting notional: full hold, Vibe deposit, and full sell. In the observed window, the Vibe deposit outperformed both alternatives. The source also states why that spread is regime-sensitive: the sample appears to benefit from long crowding while price moved down.

That means the next reporting step is not a bigger headline. It is repeated benchmarking under different market states.

## Regimes To Re-run

The risk section names the important cases:

- prolonged uptrend with profitable long traders;
- chop regime with low directional edge but persistent fees;
- sudden gap move with thin order-book or liquidation stress;
- community activity decay where open interest and turnover fall.

Each report should rerun the same benchmark format, using the same start/end conventions, and show whether Vibe deposit still beats full hold and full sell after fees, marks, realized/unrealized split, and drawdown.

## Publication Boundary

Do not present the original benchmark spread as a general LP return profile. It proves the case window, not every future market. Public docs should say the benchmark method is reusable, while the result must be updated across regimes before scaling claims become credible.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics: Benchmark Comparison".
- `vibe-papers`: Neelo, "Risk Analysis and Edge Cases".
- `vibe-papers`: Neelo, "Scaling and Replication Framework: Replication Risk".

## Related Pages

- `authored-symm-lp-benchmark-reading`
- `authored-symm-lp-regime-dependence`
- `authored-symm-lp-proof-of-possibility`
