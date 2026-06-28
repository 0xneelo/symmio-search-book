---
id: "authored-shorting-death-spiral"
title: "Shorting Death Spiral"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/05-oracle-manipulation-death-spiral"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-05-oracle-manipulation-death-spiral", "authored-inverse-payoff-trap", "authored-token-margined-reflexivity-risk"]
---

# Shorting Death Spiral

The shorting death spiral is the inverse payoff trap under market stress.

In the source model, traders open large shorts, price falls, and the protocol must pay winning shorts in tokens. As price drops, each dollar of profit requires more token units. The vault drains faster, remaining LPs face pressure, liquidation can add selling, and the feedback loop deepens.

## Why ADL Is Not A Full Answer

Percolator's source-level defense is auto-deleveraging through a haircut model. That can prevent a purely technical insolvency by reducing winning traders' payouts.

But the source is clear about the credibility cost. If winning traders cannot receive full profit when the trade worked, the market has admitted that payout certainty is conditional on vault health. That may be acceptable as a last-resort emergency control, but it cannot be the normal economic answer for serious long-tail derivatives.

## Why This Matters For Vibe

The Vibe comparison source argues for a defense stack before ADL: netting, token inventory, local insurance, global insurance, dynamic pricing, and solver-managed risk controls. The important distinction is not that Vibe can promise no stress. It is that the architecture tries to make ADL a final resort rather than the first meaningful response after margin breaks.

## Reader Implication

When docs discuss low-cap shorting, they should not only describe trader opportunity. They should explain who pays a winning short and what happens if the token collapses. Payout certainty is part of market quality.

## Sources

- `vibe-papers`: Neelo, "Section 5: Oracle Paradox, Manipulation, and Death Spiral".

## Related Pages

- `authored-inverse-payoff-trap`
- `authored-trader-payout-certainty`
- `authored-funding-defense-hierarchy`
