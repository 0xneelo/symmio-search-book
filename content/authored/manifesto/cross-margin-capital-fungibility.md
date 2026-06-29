---
id: "authored-cross-margin-capital-fungibility"
title: "Cross-Margin Capital Fungibility"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/08-structurally-superior-alternative"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-08-structurally-superior-alternative", "authored-slab-isolation-capital-inefficiency", "authored-systemic-leverage-comparison"]
---

# Cross-Margin Capital Fungibility

Neelo's Section 8 says USDC-margined hybrid design can improve capital efficiency because cross-margining and netting become possible. Capital can be made fungible across markets instead of being trapped in one isolated slab per market.

This is the mirror image of the Percolator capital critique. In a one-market-one-slab model, each market asks for its own collateral and locks it against that market's gross obligations. In a cross-market USDC risk layer, positive and negative exposures can be evaluated as a portfolio, and stable settlement capital can be allocated where the current risk actually sits.

Fungibility does not mean unlimited shared risk. A sane system still needs market limits, eligibility, local budgets, global insurance caps, and isolation when a market becomes toxic. But capital efficiency comes from being able to share usable settlement capital without pretending every market is equally safe.

## Why This Matters For The Long Tail

The long tail creates many small markets. If every market requires independent, idle, non-nettable backing, the system can list widely while liquidity remains shallow. Cross-margin capital makes a broader market set more plausible because risk can be measured across positions, not only inside one slab.

The hard part is governance and risk policy: when to net, when to isolate, and when to deny shared protection. That is why this page should be read with the defense-hierarchy and source-completeness caveats.

## Reader Implication

When a reader asks why capital efficiency improves under the hybrid model, route here. The answer is not only "USDC is stable." It is that stable settlement capital can be netted, reallocated, and governed across markets in ways isolated token slabs cannot.

## Sources

- `vibe-papers`: Neelo, "Section 8: The Structurally Superior Alternative", "8.2 How This Fixes Each Problem".

## Related Pages

- `authored-slab-isolation-capital-inefficiency`
- `authored-systemic-leverage-comparison`
- `authored-cross-market-risk-mutualization`
