---
id: "authored-funding-solver-token-inventory-defense"
title: "Funding Solver Token Inventory Defense"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#layer-2-solver-token-inventory"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-defense-hierarchy", "authored-funding-token-inventory-utilization-mode"]
---

# Funding Solver Token Inventory Defense

After user netting, Neelo's defense hierarchy uses solver token inventory. The solver's actual token holdings can cover net exposure before the model spends insurance.

The source defines covered amount as:

```
Covered Amount = min(E_usd, P * T_holdings)
```

and the token protection amount as:

```
Protection_tokens = P * T_holdings
```

The source example uses `5,000` tokens at `$10`, giving `$50,000` of token protection. If net exposure is `$40,000`, the exposure is fully covered by token inventory.

## When Inventory Is Exhausted

The source says that if:

```
E_usd > P * T_holdings
```

then unhedged exposure emerges, the system switches toward insurance mode, and dynamic pricing becomes more aggressive.

That transition is important for readers. Token inventory is a real defense layer, but it is not infinite. Once exposure exceeds inventory value, the market stops being only an inventory-utilization problem and starts becoming an insurance-budget problem.

## Publication Boundary

This page explains the source-model inventory layer. It should not publish live token balances, custody rights, inventory management policy, market-specific coverage levels, utilization thresholds, or production insurance-mode triggers without operator, accounting, risk, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy", "Layer 2: Solver Token Inventory".

## Related Pages

- `authored-funding-token-inventory-utilization-mode`
- `authored-project-token-inventory-without-stablecoin`
- `authored-token-holder-incremental-risk-alignment`
