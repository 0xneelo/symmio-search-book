---
id: "authored-vibe-system-visualization"
title: "Vibe System Visualization"
section: "product-reference"
track: "Market Creation"
status: "published"
sourceKeys: ["vibe-system-visualization", "vibe-project-listing-terms", "vibe-architecture"]
sourceUrls: ["https://docs.vibe.trading/system-visualisation.md", "https://docs.vibe.trading/more-info/project-listing-terms-and-conditions.md", "https://docs.vibe.trading/architectural-overview.md"]
relatedGeneratedPages: ["vibe-system-visualization", "vibe-project-listing-terms", "authored-vibe-intent-architecture"]
---

# Vibe System Visualization

The public system-visualization page is the shortest official explanation of how a project-side perp listing can work on Vibe: a project wants a perp, discusses supply and revenue projections, agrees terms, loans token supply to the solver, gets listed, users trade, and the solver manages trading and hedging.

## Listing Loop

The source presents the listing loop as a project inventory and solver operation workflow. The project contributes supply, the solver facilitates trading, and the market creates activity around the token as a perpetual.

The source also gives example commercial ranges: a project loan is usually described as 1%-5% of supply, and 75%-85% of solver profits are periodically returned to the project depending on volume. Those figures should stay marked for operator/accounting review before final publication, because commercial terms can vary and the project-listing terms say material commercial terms belong in the applicable agreement or statement of work.

## Solver Profit Sources

The same page lists spread, funding rates, liquidations, and losing trades as solver profit sources. That phrasing is useful because it connects the project-facing story to trading mechanics: solver economics are not a single fee line; they come from multiple market-making and risk-management channels.

## Reader Implication

When a project asks "how does listing a perp with Vibe work?", route them here for the high-level loop, then to project listing terms for service, custody, profit, audit, and termination mechanics. When a trader asks what happens behind their trade, route them to the intent architecture and solver operations pages.

## Publication Boundary

Do not publish supply-loan ranges, project profit-share ranges, solver profit channels, or revenue projections as universal commercial terms. The source-backed claim is the high-level workflow and example economics; actual project terms remain agreement-specific and require operator/accounting/product review before they become current public commitments.

## Sources

- `vibe-system-visualization`: official project-to-perp workflow, supply-loan range, solver profit-source list, and project profit-share range.
- `vibe-project-listing-terms`: terms source that keeps commercial terms agreement-specific.
- `vibe-architecture`: AMFQ/legacy intent naming and solver execution context.

## Related Pages

- `authored-vibe-project-listing-terms`
- `authored-vibe-intent-architecture`
- `authored-symmio-solver-operations-and-hedging`
