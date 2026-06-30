---
id: "authored-symmio-funding-epochs"
title: "Symmio Funding Epochs"
section: "protocol-reference"
track: "Symmio Operations"
status: "published"
sourceKeys: ["symmio-funding-rates"]
sourceUrls: ["https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/funding-rates.md"]
relatedGeneratedPages: ["symmio-funding-rates", "authored-vibe-fees-and-funding", "authored-position-lifecycle-state-machine"]
---

# Symmio Funding Epochs

Symmio's trader docs explain funding as the mechanism that keeps a perpetual contract from drifting too far away from the underlying market price. When the long side is crowded and the perp trades above spot, longs pay shorts. When the short side is crowded and the perp trades below spot, shorts pay longs.

The operational detail that matters for the compendium is epoch timing. Each symbol has its own funding rate. Funding is applied at the end of fixed periods called epochs, and the contract exposes cycle settings such as `fundingRateEpochDuration` and `fundingRateWindowTime`. Solvers can charge funding only during the configured window around the epoch transition.

## Two Accounting Paths

The official docs describe two funding-accounting methods. Older symbols can simulate funding by adjusting a position's opened price. Newer symbols track funding as a weighted average at the symbol level and deduct it from allocated balance when charged. The second path makes funding more visible as a balance line item and avoids updating every open position at each epoch.

That distinction is useful for Vibe x Symmio docs because it separates the economic idea from the accounting implementation. A reader should know funding can affect either an opened-price representation or allocated balance depending on symbol migration status.

## Publication Boundary

The docs should not publish a universal epoch length, funding window, or rate unless the current symbol configuration is queried from contracts. Symmio's own page says solvers stream the rates they plan to apply, but contract settings remain authoritative for epoch duration and charge windows.

## Sources

- `symmio-funding-rates`: official Symmio funding-rate page.

## Related Pages

- `authored-vibe-fees-and-funding`
- `authored-position-lifecycle-state-machine`
- `authored-funding-model-control-problem`
