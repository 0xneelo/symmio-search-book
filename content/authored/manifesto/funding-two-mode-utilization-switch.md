---
id: "authored-funding-two-mode-utilization-switch"
title: "Funding Two Mode Utilization Switch"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#overview", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-transition-diagram"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-05-utilization-modes-overview", "section-15-funding-model-15-docs-05-utilization-modes-mode-transition-diagram", "authored-funding-token-inventory-utilization-mode", "authored-funding-insurance-fund-utilization-mode"]
---

# Funding Two Mode Utilization Switch

Neelo's utilization-mode source says the model tracks two different utilization metrics and switches between them based on exposure state. That is the core reason the system can be both capital-efficient in ordinary states and more aggressive when token inventory is no longer the binding defense.

The first mode is token-inventory utilization. It asks whether un-netted exposure is still inside available token coverage. The second mode is insurance-fund utilization. It asks whether modeled exposure loss would consume local or eligible global insurance capacity.

## The Transition

The source transition diagram moves from token-inventory mode to insurance-fund mode when exposure grows beyond token coverage. In the diagram, token-inventory mode prices normally around token inventory utilization. Insurance-fund mode uses the more urgent utilization measure and can involve aggressive pricing plus proximity to ADL.

The reverse transition happens when exposure is reduced through hedging, ADL, or other controls and token-inventory coverage becomes the relevant constraint again.

## Why Two Modes Matter

A single utilization metric can understate risk. If a market only watches token inventory, it can miss the point where the residual problem has become an insurance-capacity problem. If it only watches insurance, it can overstate ordinary inventory pressure and become too conservative before the defense budget is actually relevant.

Two modes let the model ask the right question at the right time: "How scarce is token coverage?" in ordinary and stress states, then "How much defense budget would the modeled loss consume?" once exposure passes coverage.

## Publication Boundary

This page explains the source-model switch. It should not publish live transition thresholds, exact loss-estimate horizons, insurance budget composition, hedging rules, ADL mechanics, user-facing guarantees, or production parameter values without operator, risk, legal, accounting, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Utilization Modes: Token Inventory vs Insurance Fund", "Overview".
- `vibe-papers`: Neelo, "Utilization Modes: Token Inventory vs Insurance Fund", "Mode Transition Diagram".

## Related Pages

- `authored-funding-token-inventory-utilization-mode`
- `authored-funding-insurance-fund-utilization-mode`
- `authored-funding-rate-regime-model`
