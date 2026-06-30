---
id: "authored-funding-defense-hierarchy"
title: "Funding Defense Hierarchy"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "neelo-15-funding-model-15-docs-09-insurance-adl", "authored-funding-as-market-balancing"]
---

# Funding Defense Hierarchy

Neelo's funding model frames ADL as the last resort, not the first line of defense. Before auto-deleveraging, the model describes a layered protection stack: user position netting, solver token inventory, local insurance, capped global insurance, and only then ADL.

That order matters because each layer has a different cost.

## The Stack

User position netting is the cleanest protection: longs and shorts naturally offset each other. Solver token inventory is the next layer, using actual token holdings to cover net exposure. Local insurance then creates market-specific USDC protection from liquidation proceeds, solver profits, and CVA-style charges. Global insurance can add shared protection, but the source model limits eligibility and allocation so weak markets cannot drain the whole system.

ADL enters only after those defenses are exhausted or exposure exceeds the safe level implied by the model.

## Why This Belongs In The Vision Spine

The hierarchy explains why funding and insurance cannot be reduced to a fee. They are part of the same solvency design as token inventory, dynamic pricing, and risk limits. In a permissionless long-tail venue, the docs need to show readers where losses are absorbed before they ask who gets deleveraged.

## Publication Boundary

This page summarizes the Neelo model. Final public docs need operator and implementation review before publishing concrete percentages, allocation caps, eligibility policy, or Vibe/Symmio production ADL behavior.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy: The Complete Protection Stack".

## Related Pages

- `authored-funding-as-market-balancing`
- `authored-economic-clarity-for-permissionless-perps`
- `authored-token-margined-reflexivity-risk`
- `neelo-15-funding-model-15-docs-10-defense-hierarchy`
