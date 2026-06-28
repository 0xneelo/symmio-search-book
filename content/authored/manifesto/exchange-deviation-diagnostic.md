---
id: "authored-exchange-deviation-diagnostic"
title: "Exchange Deviation As A Trader-Experience Diagnostic"
section: "manifesto"
track: "16 - Listing Additional Notes"
status: "publication-candidate"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/05-liquidity-as-trader-experience", "https://0xneelo.github.io/vibe_docs/docs/16-listing-additional/16-docs/06-summary"]
relatedGeneratedPages: ["neelo-16-listing-additional-16-docs-05-liquidity-as-trader-experience", "neelo-16-listing-additional-16-docs-06-summary", "authored-liquidity-as-trader-experience"]
---

# Exchange Deviation As A Trader-Experience Diagnostic

The "exchange deviation multiplier" is not a formal protocol parameter. It is a useful diagnostic for whether a perp behaves like exposure to the underlying or like exposure to the venue's internal imbalance.

When deviation is low, realized economics track the underlying story closely enough that a trader can reason about the position. The trader still faces basis, funding, fees, liquidations, and venue rules, but those do not swallow the index exposure.

When deviation is high, the trader cannot price the position by looking only at the asset. They also need to forecast who will trade the other side later, whether funding will update, whether marks and oracles will drift apart, whether PnL can be paid, and whether the venue will socialize losses or haircut outcomes.

## Why It Belongs In The Compendium

Open interest and TVL are easier to show than deviation. But for long-tail markets, deviation is often what users feel. A market with visible OI can still feel broken if the trader is mostly exposed to exchange-internal state.

Vibe should use this idea as a documentation lens. A market matures as the venue term becomes smaller, the settlement path becomes clearer, and the user's position behaves more like the reference asset.

## Sources

- `vibe-papers`: Neelo, "Section 5.2: Exchange deviation multiplier".
- `vibe-papers`: Neelo, "Section 6.2: Core vocabulary".

## Related Pages

- `authored-liquidity-as-trader-experience`
- `authored-derivatives-venue-term`
- `authored-market-maturation-risk-posture`
