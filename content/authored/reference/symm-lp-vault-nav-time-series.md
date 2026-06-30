---
id: "authored-symm-lp-vault-nav-time-series"
title: "SYMM LP Vault NAV Time Series"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/05-scaling-and-replication-framework"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-7-measurement-gaps-to-close", "section-12-case-study-symm-lp-12-docs-05-scaling-and-replication-framework-5-4-kpi-stack-for-a-beta-report", "authored-symm-lp-data-guardrails"]
---

# SYMM LP Vault NAV Time Series

The SYMM LP case study is useful as a data cut, but the source says a production-grade case study should add a vault-level time series of NAV and PnL attribution.

That requirement exists because a single dashboard state can hide path risk. A vault can look profitable at the final mark while having experienced large interim drawdowns, unstable utilization, concentrated exposure, or an unrealized gain that later reverses. A NAV time series makes the path inspectable instead of asking readers to trust only the endpoint.

The minimum time series should show the vault's starting notional, token balance, USDC balance, realized PnL, marked PnL, total NAV, and benchmark NAV across the same timestamps. It should also state the price source, timestamp policy, deposit and withdrawal treatment, and whether the reported NAV is pre-fee, post-fee, gross, or net.

## Why The Source Asks For This

The performance source reports a favorable endpoint: token balance increased, realized and unrealized LP components were positive, and the Vibe deposit benchmark beat both full hold and full sell for the observed window. The measurement-gap section then makes the publication standard stricter. The next version should not only report what the endpoint showed; it should show how the vault got there.

## Publication Boundary

Do not publish a live vault NAV chart until data ownership, accounting treatment, token pricing, fee treatment, and refresh cadence are confirmed. The source-backed requirement is that future public reporting needs this time-series layer before the case is used as repeatable LP evidence.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics: Measurement Gaps to Close".
- `vibe-papers`: Neelo, "Scaling and Replication Framework: KPI Stack for a Beta Report".

## Related Pages

- `authored-symm-lp-data-guardrails`
- `authored-symm-lp-beta-report-kpis`
- `authored-symm-lp-benchmark-reading`
