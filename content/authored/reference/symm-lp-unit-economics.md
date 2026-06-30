---
id: "authored-symm-lp-unit-economics"
title: "SYMM LP Unit Economics"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/01-executive-summary", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/06-conclusion"]
relatedGeneratedPages: ["neelo-12-case-study-symm-lp-12-docs-01-executive-summary", "neelo-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics", "neelo-12-case-study-symm-lp-12-docs-06-conclusion"]
---

# SYMM LP Unit Economics

The SYMM LP case study reports three layers of economics: token balance, realized LP profit, and unrealized LP profit. The deposited amount was `2,271,131` SYMM at an average input price of `$0.01280`, or `$29,070.4768` of deposit-time notional. At the data cut, the LP token balance had increased to `2,501,328.4` SYMM, a gain of `230,197.4` tokens.

The cash-denominated comparison is the sharper result. The source reports `$5,895.90` of realized LP profit and `$7,999.32` of unrealized LP profit, for `$13,895.22` combined against the original notional. Over the same window, passive SYMM holding is reported as negative because the token price declined from the case input price to the current price reference.

## How To Read The Sign Convention

The source's critical accounting rule is that negative user-side debt or PnL is favorable to the LP side:

- `Current Debt` is treated as realized user debt to the LP, so a negative value maps to realized LP profit.
- `Current UPnL` is current unrealized user PnL, so a negative value maps to unrealized LP profit at mark.
- `User Profit` is the aggregate user-side profitability field, so negative user profit means the LP side is up at that data cut.

Do not collapse realized and unrealized profit into one promise. Realized debt is closer to withdrawable performance. Unrealized PnL is path-dependent and can move before settlement.

## Why Volume Was Not The Main Driver

The case reports roughly `$100,000` of total notional volume and about `$1,000` average daily volume. That means the headline economics are not explained by high turnover alone. The more important drivers were directional imbalance, adverse price movement for long-biased users, funding transfers, fees, and possible liquidation cashflows.

## Reader Implication

The unit-economics page is useful because it forces the docs to distinguish token return, USDC-denominated return, realized profit, unrealized mark, and passive benchmarks. It should not be used as an APR promise without audited attribution, drawdown history, and regime-diverse evidence.

## Publication Boundary

Do not publish these unit economics as current APY, investor guidance, audited vault accounting, or proof that SYMM-style LP economics generalize to other tokens. The source-backed claim is the case-study arithmetic and sign convention; production claims need source ownership, accounting review, drawdown history, and regime-diverse benchmarks.

## Sources

- `vibe-papers`: Neelo, "Executive Summary".
- `vibe-papers`: Neelo, "Performance and Unit Economics".
- `vibe-papers`: Neelo, "Conclusion".

## Related Pages

- `authored-symm-lp-case-setup`
- `authored-symm-lp-data-guardrails`
- `neelo-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics`
