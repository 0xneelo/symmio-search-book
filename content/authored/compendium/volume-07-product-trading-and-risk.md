---
id: "authored-volume-07-product-trading-and-risk"
title: "Volume 07: Product, Trading, And Risk Guides"
section: "compendium"
track: "Volume 07"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["spec-03", "vibe-llms", "vibe-margin", "symmio-core"]
sourceUrls: ["_specs/app-docs/03-grounding.md", "https://docs.vibe.trading/llms.txt", "https://docs.vibe.trading/trading/managing-vibecaps-margin.md", "https://docs.symm.io/"]
relatedGeneratedPages: ["vibe-fees", "vibe-funding", "vibe-vibecaps-margin", "vibe-account-health-liquidations"]
---

# Volume 07: Product, Trading, And Risk Guides

This volume is the user's practical product reference. It answers the questions that appear after the thesis lands: what can I trade, how does margin work, what are fees and funding, what happens near liquidation, and where does Vibe behavior differ from a generic perps venue?

The source material here is intentionally more operational than the manifesto volumes. It should be precise, quiet, and explicit about what the current product does. When the docs mention future Barometer or Phase B improvements, those should remain labeled as roadmap unless the implementation evidence changes.

## What This Volume Does

- It groups trading guides, fee pages, funding explanations, collateral behavior, and liquidation/account-health references.
- It links user-facing Vibe docs back to the economic and protocol volumes that explain why the mechanics exist.
- It keeps risk language concrete rather than promotional.
- It gives the answer engine grounded pages for common product questions.

## Reader Implication

If you came to use the product rather than study the thesis, this volume is your reference shelf. It should make the product legible without hiding the risk model.

## Sources

- `spec-03`: Product reference grounding.
- `vibe-llms`: Public Vibe docs index.
- `vibe-margin`: VibeCaps margin guide.
- `symmio-core`: Symmio protocol source for settlement context.

## Related Pages

- `vibe-fees`
- `vibe-funding`
- `vibe-vibecaps-margin`
- `vibe-account-health-liquidations`
