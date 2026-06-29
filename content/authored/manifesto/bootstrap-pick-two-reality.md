---
id: "authored-bootstrap-pick-two-reality"
title: "The Pick-Two Reality In Perp Market Design"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-5-the-pick-two-reality"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-5-the-pick-two-reality", "authored-bootstrap-trilemma-three-properties", "authored-landscape-comparative-analysis"]
---

# The Pick-Two Reality In Perp Market Design

The pick-two section translates the trilemma into the choices existing designs tend to make. A static architecture can look strong because it optimizes two properties clearly. The missing third property explains where it breaks.

Permissionless plus capital efficient gives the cleanest theoretical promise: list anything without heavy collateral. But if the system is netted and the other side is missing, there is no reliable counterparty. The market is open and efficient on paper, but winning traders cannot be paid during the first profitable imbalance.

Capital efficient plus reliable counterparty describes mature order-book-style venues. When both sides exist and insurance or margin systems are in place, the market can be deep and efficient. The missing property is permissionless bootstrap: the design cannot make an unknown market liquid merely by declaring it listed.

Permissionless plus reliable counterparty describes vault or pool-backed bootstrap. A market can trade before two-sided flow exists because capital stands behind it. The missing property is efficiency: the capital taking that risk must be compensated, and the market pays through fees, spreads, caps, leverage limits, or risk budgets.

The point is not that one corner is morally better. The point is that Vibe's lifecycle architecture has to explain how a market moves between corners as evidence changes.

## Publication Boundary

The source uses Derp.fun, Hyperliquid, and GMX-style categories as examples. Treat those as source-time architecture examples until current project status, live listing policies, market-maker economics, fee levels, insurance rules, and product behavior are verified from primary sources.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma: 4.5 The Pick-Two Reality".

## Related Pages

- `authored-bootstrap-trilemma-three-properties`
- `authored-landscape-comparative-analysis`
- `authored-existing-perp-landscape-overview`
