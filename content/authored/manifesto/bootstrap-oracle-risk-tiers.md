---
id: "authored-bootstrap-oracle-risk-tiers"
title: "Bootstrap Oracle Risk Tiers"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-4-oracle-layer", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-7-security-model"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-4-oracle-layer", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-7-security-model"]
---

# Bootstrap Oracle Risk Tiers

Permissionless perps need a way to price markets before every asset has mature institutional data coverage. Neelo's technical source treats oracle quality as a tiered risk constraint: robust multi-source feeds can support higher leverage and open interest; thinner or DEX-derived feeds require tighter limits.

That is the right product lesson. A market can be permissionless without pretending every price source is equally strong. The docs should show that oracle risk is a gating input for leverage, OI, liquidation safety, and solver exposure.

## Tiered Risk, Not Binary Eligibility

The source names price-feed properties that matter for Vibe-style markets: freshness, accuracy, manipulation resistance, and availability. For new tokens without established feeds, it sketches a DEX-derived path using pool queries, TWAP smoothing, liquidity-depth validation, and confidence bounds.

The important idea is not a specific vendor stack. It is that bootstrap markets need an explicit risk tier. Mature multi-source oracle coverage can carry more system capacity. Single-source or thin DEX-derived pricing should carry less capacity and stricter execution limits.

## Publication Boundary

The source's tables include illustrative freshness, leverage, and OI limits. Those should not be published as live product values unless confirmed by implementation owners. The compendium should instead teach the invariant: weaker price evidence must reduce allowed risk.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.4 Oracle Layer".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.7 Security Model".

## Related Pages

- `authored-oracle-circuit-breaker-paradox`
- `authored-incentive-based-attack-risk`
- `authored-perps-for-the-trenches`
