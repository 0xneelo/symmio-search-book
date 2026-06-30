---
id: "authored-funding-key-innovations-summary"
title: "Funding Key Innovations Summary"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/02-index#key-innovations"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-02-index-key-innovations", "authored-funding-two-mode-utilization-switch", "authored-funding-defense-hierarchy"]
---

# Funding Key Innovations Summary

The funding-model index names four innovations: two utilization modes, bell-curve flattening, a five-layer defense hierarchy before ADL, and anti-cyclical liquidations. Together, they describe why the model is built for token-margined long-tail markets rather than for a generic perp fee table.

The first innovation is the separation between token-inventory utilization and insurance-fund utilization. Ordinary stress begins with the question of whether token inventory can cover exposure. Tail stress begins when exposure pushes beyond that inventory and the system has to reason about insurance capacity.

The second innovation is bell-curve flattening. The source model can transfer value from profitable markets to stressed markets through a capped and rule-bound pool. That does not erase losses. It defines when surplus can be used to support markets that are temporarily or structurally below target.

The third innovation is defense in depth. The source names a sequence before ADL: netting, token inventory, local insurance, global insurance, and then ADL. That sequence matters because it tells readers that forced deleveraging should not be the first answer to imbalance.

The fourth innovation is anti-cyclical liquidation treatment. Liquidation profits are framed as buyback and defense inputs rather than as forced spot selling of the base token into stress. In the source's thesis, liquidation is an inventory and risk reallocation event inside the system, not an automatic reason to dump project inventory externally.

## Why These Four Belong Together

Two utilization modes identify the state. Bell-curve flattening connects markets. Defense in depth determines the order of protection. Anti-cyclical liquidation accounting changes how stress cashflows feed the system. The innovation is not any single mechanism in isolation; it is the combination of state classification, cross-market smoothing, layered defense, and liquidation accounting.

## Publication Boundary

This page summarizes source-model innovations. It does not claim that all four mechanisms are live with final production parameters, that global support is unconditional, that ADL can never occur, or that liquidations create guaranteed buy pressure. Production docs need implementation and risk review for each mechanism.

## Sources

- `vibe-papers`: Neelo, "Vibe Perpetual Market - Full Mathematical Derivation", "Key Innovations".

## Related Pages

- `authored-funding-two-mode-utilization-switch`
- `authored-funding-defense-hierarchy`
- `authored-funding-core-invariant`
