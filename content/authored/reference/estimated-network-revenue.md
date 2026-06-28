---
id: "authored-estimated-network-revenue"
title: "Estimated Network Revenue"
section: "dashboard-reference"
track: "Revenue"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "spec-03"]
sourceUrls: ["docs/network-revenue.md", "src/dashboard/revenue-doc.jsx", "server/pulse.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-network-revenue", "local-revenue-pulse"]
---

# Estimated Network Revenue

The current dashboard model estimates network revenue from descendant trading volume, a configurable platform-fee input, and a configurable referrer-share input. The reference formula is:

```text
estimated referrer revenue = network volume x platform fee rate x referrer share
```

This page must remain explicit about status. The local implementation and app docs support a Phase A estimate. They do not prove that every future revenue stream is live, final, or publicly discloseable. Phase B items such as spread, liquidations, funding, solver/LP splits, venue-specific accounting, and points farmed are tracked as roadmap or designed economics until the operator resolves the public disclosure boundary.

The live counter should also be documented as a display model, not as a settlement guarantee. The dashboard pulse uses volume history and monotonic display behavior to make earning motion legible. That helps users understand direction and participation, but final accounting still depends on the revenue model and data sources the product owner approves for publication.

## Reader Implication

Users should read the counter as an estimate of current network economics, not as an immutable protocol balance. Builders and operators should keep formula inputs, venue coverage, and Phase B components separately labeled.

## Open Gap

Operator inbox item `#1` must resolve the public revenue disclosure boundary before this page becomes final.

## Sources

- `local-revenue-doc`: Local network revenue document.
- `dashboard-revenue-doc`: In-app dashboard revenue page.
- `server-pulse`: Current pulse/revenue implementation.
- `spec-03`: Grounding matrix and revenue-status guidance.

## Related Pages

- `authored-network-volume`
- `local-network-revenue`
- `local-revenue-pulse`
