---
id: "authored-symm-lp-current-debt-and-upnl"
title: "SYMM LP Current Debt And UPnL"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "symmio-settlement", "symmio-profit-realization"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions", "https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/settlement.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/settlement-and-profit-realization.md"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-5-metric-sign-convention-critical", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-3-metric-definitions-lp-perspective", "authored-symmio-settlement-profit-realization"]
---

# SYMM LP Current Debt And UPnL

The SYMM LP case study uses user-side accounting fields to describe LP-side economics. `Current Debt` is users' already realized debt to the LP. `Current UPnL` is users' current unrealized profit and loss at the mark. In the case-study sign convention, a negative user-side value is favorable to the LP.

That makes the reported data cut easier to read:

- `Current Debt = -5,895.90` maps to about `$5,895.90` of realized LP profit.
- `Current UPnL = -7,999.32` maps to about `$7,999.32` of unrealized LP edge at that mark.
- `User Profit = -5,816.45` means users were net down at the referenced dashboard state.

## Realized Versus Marked

The distinction is not cosmetic. `Current Debt` is the realized component and the source describes it as withdrawable for the LP. `Current UPnL` is mark-to-market; it can move before it is realized. A public case study should not treat both as identical cash.

This maps to the broader Symmio settlement boundary: unrealized PnL and realized allocated balance are different states. Settlement and profit-realization mechanics exist because open-position PnL has to be converted into realized accounting state before it behaves like spendable or withdrawable balance.

## Reader Implication

When a user asks whether the LP "made money," the precise answer is split. The case shows a realized component, an unrealized component, and a favorable user-side mark at one data cut. The stronger production claim still needs vault-level attribution, settlement history, and drawdown reporting.

## Publication Boundary

Do not publish `Current Debt`, `Current UPnL`, or `User Profit` as interchangeable cash balances, audited LP profit, current vault performance, or withdrawal guarantees. The source-backed claim is the sign convention and the realized-versus-marked distinction in the case-study data cut; final public reporting needs settlement/accounting review.

## Sources

- `vibe-papers`: Neelo, "Performance and Unit Economics".
- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions".
- `symmio-settlement`: official settlement state boundary.
- `symmio-profit-realization`: official LP profit-realization context.

## Related Pages

- `authored-symm-lp-unit-economics`
- `authored-symm-lp-data-guardrails`
- `authored-symmio-settlement-profit-realization`
