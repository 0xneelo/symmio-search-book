---
id: "authored-landscape-comparative-analysis"
title: "The Landscape Comparative Analysis"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-6-comparative-analysis-table"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-03-landscape-3-6-comparative-analysis-table", "authored-existing-perp-landscape-overview", "authored-perp-framework-summary"]
---

# The Landscape Comparative Analysis

The comparative table turns Neelo's protocol taxonomy into an audit checklist. It asks the same questions of each architecture: how does matching happen, who provides collateral, where does insurance sit, can the market bootstrap, can it scale, and what is the source-time status?

The important lesson is not a static league table. It is the pattern underneath the table. Synchronous netted systems score well on scale once two-sided liquidity exists, but poorly on bootstrap. Asynchronous fully collateralized systems score well on bootstrap, but poorly on scale because LP capital bears the residual risk. Async-netted systems appear to solve both, but fail the payout guarantee. Hybrid systems are promising only if they define how the market changes stage over time.

For the compendium, this table should become a reader-facing diagnostic. When someone asks why Vibe needs a lifecycle model, the answer is visible in the columns: no single static row gives permissionless listing, capital efficiency, and reliable counterparty guarantees across the whole market lifecycle.

## Publication Boundary

The source-time table includes protocols such as Hyperliquid, dYdX, GMX v1, Gains, Derp.fun, and Vibe. Current market leadership, status labels, matching architecture, collateral treatment, insurance behavior, supported assets, and scale/bootstrapping outcomes must be verified from current primary sources before publication as live comparison.

## Sources

- `vibe-papers`: Neelo, "Section 3: The Landscape of Existing Protocols: 3.6 Comparative Analysis Table".

## Related Pages

- `authored-existing-perp-landscape-overview`
- `authored-perp-framework-summary`
- `authored-bootstrap-trilemma`
