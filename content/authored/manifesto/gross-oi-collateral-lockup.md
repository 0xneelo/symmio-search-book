---
id: "authored-gross-oi-collateral-lockup"
title: "Gross OI Collateral Lockup"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/06-capital-and-historical"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-06-capital-and-historical", "authored-slab-isolation-capital-inefficiency", "authored-percolator-one-market-one-slab-accounting"]
---

# Gross OI Collateral Lockup

Neelo's Percolator capital critique separates two different ideas: whether an LP is economically hedged and whether the on-chain risk engine releases capital. In the source, Percolator can still lock collateral based on gross open interest even when the LP's net position is close to flat.

That lock is not arbitrary. The source says it is necessary to prevent withdrawal-rug scenarios. If an LP could withdraw backing while user positions remained open, the market might preserve local accounting only by weakening payout credibility. The risk engine therefore keeps capital inside the slab for the lifetime of the obligations.

The cost is opportunity cost. Capital that is trapped against gross OI cannot be redeployed to stronger markets, other hedges, or higher-return inventory uses. The LP becomes hostage to open interest rather than simply paid for live risk.

## Why This Matters For Long-Tail Markets

Long-tail perp systems need breadth. If every market makes LP capital stay locked against gross exposure, the system may be technically permissionless while economically narrow. Professional liquidity providers care about portfolio turnover, net exposure, and opportunity cost, not only whether a single market's invariant is locally correct.

## Reader Implication

When a reader asks why "hedged" does not automatically mean "capital efficient," route here. A venue can reduce directional exposure and still consume too much balance sheet if collateral release follows gross obligations rather than net economic risk.

## Publication Boundary

Live collateral ratios, netting rules, slab capacity, leverage limits, and capital-efficiency comparisons require implementation, risk, and operator review before publication as current production parameters. This page keeps the source-level accounting thesis separate from live Percolator or Vibe solvency claims.

## Sources

- `vibe-papers`: Neelo, "Section 6: Capital Inefficiency and Historical Precedent", "6.1.2 Collateral Lock-Up".

## Related Pages

- `authored-slab-isolation-capital-inefficiency`
- `authored-token-margined-lp-lose-lose`
- `authored-systemic-leverage-comparison`
