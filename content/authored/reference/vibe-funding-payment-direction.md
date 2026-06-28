---
id: "authored-vibe-funding-payment-direction"
title: "Vibe Funding Payment Direction"
section: "product-reference"
track: "Fees"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-funding", "vibe-fees"]
sourceUrls: ["https://docs.vibe.trading/trading/funding.md", "https://docs.vibe.trading/trading/fees.md"]
relatedGeneratedPages: ["vibe-funding", "vibe-fees", "authored-vibe-fees-and-funding"]
---

# Vibe Funding Payment Direction

Funding is the recurring holding-cost layer for perpetuals. It is not the same thing as an entry or exit fee.

The official funding guide explains the direction this way: when perpetual prices are above spot, long traders pay the short-side solver; when perpetual prices are below spot, the short-side solver pays long traders. The mechanism is meant to pull the perpetual price back toward the underlying spot market.

## Why Direction Can Change

Funding direction depends on market state and position side. A trader cannot know the full cost of holding a position by reading only the open/close fee categories. The trade can have an upfront cost profile, then a funding profile that changes while the position remains open.

The same source also says Vibe relies on solver quotes and real-time trader/solver interaction for funding-rate inputs. It states that if the amount owed is lower than the blockchain gas cost, the funding payment is not processed because each update requires an on-chain interaction.

## Reader Guidance

Answer funding questions in three parts:

- identify whether the question is about a one-time trade fee or recurring funding;
- explain that funding direction depends on perp-versus-spot alignment and side;
- avoid promising a funding payment when the source's minimum-payment threshold says tiny amounts may not be processed.

## Sources

- `vibe-funding`: official funding direction, solver-pricing context, and minimum-payment threshold.
- `vibe-fees`: official distinction between fee categories and trade-cost disclosure.

## Related Pages

- `authored-vibe-fees-and-funding`
- `authored-vibe-trade-panel-cost-breakdown`
- `authored-funding-as-market-balancing`
