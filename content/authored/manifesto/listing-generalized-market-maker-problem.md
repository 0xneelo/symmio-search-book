---
id: "authored-listing-generalized-market-maker-problem"
title: "The Generalized Market-Maker Problem"
section: "manifesto"
track: "03 - Listing Monopoly"
status: "published"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/03-listing-monopoly/03-docs/04z-listing-and-liquidity-thesis#4z-4-the-generalized-market-maker-problem"]
relatedGeneratedPages: ["section-03-listing-monopoly-03-docs-04z-listing-and-liquidity-thesis-4z-4-the-generalized-market-maker-problem", "authored-listing-plus-liquidity-thesis", "authored-solver-as-initial-network-effect"]
---

# The Generalized Market-Maker Problem

Section 4Z names the hard part of permissionless perpetuals: generalized liquidity for many derivative markets.

Traditional venues can split the job. The venue lists the market; a specialist, market maker, or privileged participant makes it liquid. That model does not scale cleanly to thousands of long-tail perps because each symbol would need robust quoting, survivable economics, and protection against adversarial flow.

## The Three Questions

The source turns the problem into three practical questions:

- how can a protocol quote a wide universe of perp markets without a dedicated human desk per symbol;
- how can it move a new market from zero to usable depth so hedgers and speculators arrive;
- how can it resist informed flow, manipulation, and toxic flow that would exploit naive quoting or LP inventory.

Until those questions have a robust answer, permissionless perps remain partial: markets may be openable, but not necessarily tradeable.

## Publication Boundary

Do not publish generalized market making as solved in production, guaranteed across all tokens, or immune to toxic flow. Solver capacity, quoting rules, market eligibility, adverse-flow controls, and liquidity guarantees need fresh primary-source/operator/product/risk review.

## Sources

- `vibe-papers`: Neelo, "Section 4Z: Listing, Liquidity, and the Generalized Bootstrap Problem: 4Z.4 The Generalized Market Maker Problem".

## Related Pages

- `authored-solver-as-initial-network-effect`
- `authored-listing-plus-liquidity-thesis`
- `authored-why-existing-perp-solutions-fail-bootstrap`
