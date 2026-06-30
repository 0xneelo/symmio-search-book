---
id: "authored-vibe-project-supply-loan-flow"
title: "Vibe Project Supply Loan Flow"
section: "product-reference"
track: "Market Creation"
status: "published"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-system-visualization", "vibe-project-listing-terms", "vibe-architecture"]
sourceUrls: ["https://docs.vibe.trading/system-visualisation.md", "https://docs.vibe.trading/more-info/project-listing-terms-and-conditions.md", "https://docs.vibe.trading/architectural-overview.md"]
relatedGeneratedPages: ["vibe-system-visualization", "vibe-project-listing-terms", "authored-vibe-system-visualization"]
---

# Vibe Project Supply Loan Flow

The project-side listing loop starts with inventory, not only a ticker request.

Vibe's system-visualization source describes a project that wants a perpetual market, discusses supply and revenue projections, agrees terms, loans token supply to the solver, receives a listing, and then lets users trade while the solver manages trading and hedging.

## The Flow

The public source supports this sequence:

- the project wants a perp market for its token;
- Vibe and the project discuss supply and revenue projections;
- the parties agree listing and commercial terms;
- the project loans token supply to the solver or market-making arrangement;
- the perp is listed;
- users trade the market;
- the solver manages trading and hedging around the supplied inventory.

The source also gives a typical supply-loan range, but the project-listing terms make commercial terms agreement-specific. That means the compendium can explain the workflow and source example while avoiding a universal promise about any project's required supply.

## Reader Guidance

For a project, the core question is not "can I add a symbol?" It is "what inventory, agreement, risk, and reporting path supports the symbol?" Route broad market-creation questions here first, then to project-listing terms for custody, audit, profit, and exit mechanics.

## Publication Boundary

Do not publish supply-loan ranges, required inventory, revenue projections, solver borrowing rights, custody mechanics, or project-specific listing commitments as universal terms. The source-backed claim is the workflow: project inventory supports solver-managed market creation under agreement-specific terms.

## Sources

- `vibe-system-visualization`: official project-to-perp workflow, supply-loan range, listing, trading, and solver hedging loop.
- `vibe-project-listing-terms`: agreement-specific commercial terms and service framing.
- `vibe-architecture`: solver and intent execution context.

## Related Pages

- `authored-vibe-system-visualization`
- `authored-vibe-project-listing-terms`
- `authored-vibe-project-token-custody-boundary`
