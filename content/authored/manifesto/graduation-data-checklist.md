---
id: "authored-graduation-data-checklist"
title: "Graduation Data Checklist"
section: "manifesto"
track: "08 — Market Structure"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/05-ode-to-the-orderbook-part2/05-docs/06-programmatic-graduation"]
relatedGeneratedPages: ["neelo-05-ode-to-the-orderbook-part2-05-docs-06-programmatic-graduation", "authored-programmatic-market-graduation", "authored-z-score-graduation-criteria"]
volumeId: "volume-03-listing-power-and-orderbooks"
---

# Graduation Data Checklist

Programmatic graduation only works if the market produces trustworthy data before the next venue decision. The Part II source names the categories a market should be judged by: sustained perp volume, trader count, liquidity depth, healthy liquidation behavior, two-sided participation, and declining dependence on solver support.

That list is more important than any one threshold. It says a market should graduate because it has become operationally healthier, not because a committee likes the story.

## How The Checklist Should Be Read

The checklist has three jobs.

First, it tests demand. Volume and trader count show whether the market is repeatedly used by more than one motivated group.

Second, it tests market quality. Liquidity depth, spread behavior, and liquidation outcomes show whether the market can withstand normal stress without becoming an artificial one-sided casino.

Third, it tests maturity. Declining solver dependence and more two-sided participation show that the market can move toward tighter execution and more order-book-like structure.

## Publication Boundary

The source gives categories, not final live formulas. This page should not publish production thresholds, weighting, cadence, graduation automation, eligible destination venues, or Z-score formulas until the product layer confirms them.

## Sources

- `vibe-papers`: Neelo, "Programmatic Graduation".

## Related Pages

- `authored-programmatic-market-graduation`
- `authored-z-score-graduation-criteria`
- `authored-vibe-as-listing-source-of-truth`
- `neelo-05-ode-to-the-orderbook-part2-05-docs-06-programmatic-graduation`
