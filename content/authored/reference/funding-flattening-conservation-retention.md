---
id: "authored-funding-flattening-conservation-retention"
title: "Funding Flattening Conservation And Retention"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/08-bell-curve-flattening#key-invariants"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-08-bell-curve-flattening", "authored-funding-proportional-tail-allocation", "authored-cross-market-risk-mutualization"]
---

# Funding Flattening Conservation And Retention

Bell-curve flattening is not supposed to manufacture profit. In Neelo's source, if protocol retention is zero, the sum of flattened market profits equals the sum of raw market profits. The distribution changes, but the total is conserved.

When retention is positive, part of the transfer pool is retained as an insurance reserve. In that case, the flattened market-profit total is lower by the retained amount. The value has not disappeared; it has moved into protocol protection.

This distinction is important for publication. Cross-market mutualization should be explained as distribution compression and reserve formation, not as yield creation.

## How To Say It Publicly

The clean reader-facing version is: without retention, flattening redistributes tail outcomes; with retention, it also routes a controlled portion into insurance reserves. In both cases, the source model is about risk management, not magic returns.

That language prevents two mistakes. It avoids implying that losing markets can be subsidized without a funding source. It also avoids implying that retained value is immediately distributable user profit.

## Publication Boundary

This page explains the source invariants. It does not publish live retention fractions, reserve accounting, buyback policy, accounting treatment, or legal characterization of any retained value.

## Sources

- `vibe-papers`: Neelo, "Bell Curve Flattening", key invariants.

## Related Pages

- `authored-funding-proportional-tail-allocation`
- `authored-funding-insurance-buyback-accounting`
- `authored-funding-full-objective`
