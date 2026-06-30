---
id: "authored-estimated-network-revenue"
title: "Estimated Network Revenue"
section: "dashboard-reference"
track: "Revenue"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["local-revenue-doc", "dashboard-revenue-doc", "server-pulse", "spec-03", "syn-203", "syn-166"]
sourceUrls: ["docs/network-revenue.md", "src/dashboard/revenue-doc.jsx", "server/pulse.js", "_specs/app-docs/03-grounding.md", "Linear SYN-203", "Linear SYN-166"]
relatedGeneratedPages: ["local-network-revenue", "local-revenue-pulse", "linear-phase-b-revenue", "linear-usd-counter"]
---

# Estimated Network Revenue

The current dashboard model estimates network revenue from descendant trading volume, the platform-fee rate, and the referrer platform share. The Phase A formula is:

```text
networkVolume × platformFeeRate × referrerPlatformShare
```

In words: Phase A estimated referrer revenue equals `networkVolume × platformFeeRate × referrerPlatformShare`.

The v1 defaults are a `0.05%` platform fee (`5 bps`) and a `30%` referrer platform share. These are Phase A defaults for the estimated dashboard model, not a claim that every possible future revenue stream is already live.

This page must remain explicit about status. The local implementation and app docs support a Phase A estimate. Phase B economics are out of scope for v1. Items such as spread, liquidations, funding, solver/LP splits, venue-specific accounting, and points farmed should stay labeled as roadmap or designed economics until they have separate source and implementation support.

The live counter should also be documented as a display model, not as a settlement guarantee. The dashboard pulse uses volume history and monotonic display behavior to make earning motion legible. That helps users understand direction and participation, but final accounting still depends on the revenue model and data sources the product owner approves for publication.

The historical USD-counter request is covered by this estimated-revenue page and the revenue-pulse page. It asks for a user-visible counter and scenario model; it does not make Phase B revenue streams live or payable in v1.

## Reader Implication

Users should read the counter as an estimate of current Phase A network economics, not as an immutable protocol balance. Builders and operators should keep formula inputs, venue coverage, and Phase B components separately labeled.

## Sources

- `local-revenue-doc`: Local network revenue document.
- `dashboard-revenue-doc`: In-app dashboard revenue page.
- `server-pulse`: Current pulse/revenue implementation, formula, and defaults.
- `spec-03`: Grounding matrix and revenue-status guidance.
- `syn-203`: Phase B revenue scope and data-dependency research.
- `syn-166`: historical USD-counter product request.

## Related Pages

- `authored-network-volume`
- `local-network-revenue`
- `local-revenue-pulse`
- `linear-phase-b-revenue`
- `linear-usd-counter`
