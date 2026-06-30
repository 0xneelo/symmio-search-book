---
id: "authored-bootstrap-trilemma-summary"
title: "The Bootstrap Trilemma Summary"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-9-summary"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-9-summary", "authored-bootstrap-trilemma-three-properties", "authored-single-architecture-failure-matrix"]
---

# The Bootstrap Trilemma Summary

The short version of the bootstrap trilemma is that each static perp architecture gives up one of the three properties a new market wants: permissionless listing, capital efficiency, and reliable counterparty guarantees.

| Property | Netted Async | Collateralized | Order Book |
| --- | --- | --- | --- |
| Permissionless | Yes | Yes | No |
| Capital efficient | Yes | No | Yes |
| Reliable counterparty | No | Yes | Yes |

The table is not a ranking of venues. It is a failure map. Netted asynchronous systems can look elegant until a profitable imbalance needs someone to pay. Collateralized systems can make the first trade work, but they do it by locking or charging for risk capital. Order books are efficient once liquidity exists, but they do not manufacture the missing counterparty for unknown markets.

The source's conclusion is that the solution has to be hybrid. It must traverse the design space as markets mature rather than pretending one static architecture can be best at birth, growth, and maturity.

## Sources

- `vibe-papers`: Neelo, "Section 4: The Bootstrap Trilemma: 4.9 Summary".

## Related Pages

- `authored-trilemma-escape-route`
- `authored-bootstrap-pick-two-reality`
- `authored-landscape-comparative-analysis`
