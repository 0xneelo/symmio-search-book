---
id: "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-3-benchmark-comparison"
title: "Performance and Unit Economics: 3.3 Benchmark Comparison"
section: "vision-sections"
track: "12 - First Vibe Perp Vault Case study"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-3-benchmark-comparison"]
parentPageId: "neelo-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics"
sourcePath: "Docs/public/12_case_study_symm_lp/12_docs/03-Performance-and-Unit-Economics.md"
headingId: "3-3-benchmark-comparison"
---

# Performance and Unit Economics: 3.3 Benchmark Comparison

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics#3-3-benchmark-comparison

## Extracted Section Draft

## 3.3 Benchmark Comparison

Benchmarks are evaluated on the same starting capital (`moneyIN = $29,070.48`) using three scenarios.

| Scenario | moneyIN | tokenNow | tokenValNow | usdcNow | tokenPnL | totalFunds |
|---|---:|---:|---:|---:|---:|---:|
| Bench1 - Full Hold | `29,070.48` | `2,271,131.00` | `16,806.37` | `0.00` | `-12,264.11` | `16,806.37` |
| Bench2 - Vibe deposit | `29,070.48` | `2,501,328.40` | `18,509.83` | `13,895.22` | `-10,560.65` | `32,405.05` |
| Bench3 - Full Sell (USDC hold baseline) | `29,070.48` | `2,271,131.00` | `0.00` | `29,070.48` | `-29,070.48` | `29,070.48` |

Portfolio-level returns from `totalFunds`:

- Bench1 (Full Hold): `16,806.37 / 29,070.48 - 1 = -42.19%`
- Bench2 (Vibe deposit): `32,405.05 / 29,070.48 - 1 = +11.47%`
- Bench3 (Full Sell): `29,070.48 / 29,070.48 - 1 = 0.00%`

Vibe deposit (Bench2) spread vs alternatives:

- vs Full Hold: `32,405.05 - 16,806.37 = +15,598.68` (`+53.66pp` return spread)
- vs Full Sell: `32,405.05 - 29,070.48 = +3,334.57` (`+11.47pp` return spread)

Interpretation:

- this framing separates token mark-to-market (`tokenPnL`) from cash earned (`usdcNow`) and compares end-of-period total wealth directly;
- in this window, Vibe deposit outperforms both passive holding and immediate full-sell baselines;
- the excess over Full Hold is regime-sensitive (long crowding + down move), so it should not be treated as a constant edge.
