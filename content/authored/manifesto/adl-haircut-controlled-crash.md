---
id: "authored-adl-haircut-controlled-crash"
title: "ADL Haircut As Controlled Crash"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/05-oracle-manipulation-death-spiral"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-05-oracle-manipulation-death-spiral", "authored-shorting-death-spiral", "authored-percolator-engineering-vs-economics"]
---

# ADL Haircut As Controlled Crash

Percolator's source names auto-deleveraging through a haircut ratio as the defense when the vault cannot cover obligations. That can preserve a balance-sheet invariant. It does not preserve the market's economic promise.

The source's critique is direct: winning traders do not receive the full profit they earned. The protocol avoids technical insolvency by reducing payouts, but the market has admitted that profitable positions are conditional on vault health.

## Why The Distinction Matters

An emergency haircut can be better than an uncontrolled insolvency. It can make the crash bounded and explicit. But it is still a controlled crash. The trader experience is no longer "my position paid." It is "my winning claim was cut because the venue could not honor it."

That distinction is central to the compendium's Percolator comparison. Software correctness can prove that balances are conserved under a haircut rule. It cannot prove that serious traders will trust a venue where stress resolution routinely confiscates winning PnL.

## Reader Implication

ADL should be documented as a last-resort solvency control, not as a normal payout mechanism. A reader asking whether a market pays winners needs both answers: the technical rule that prevents insolvency and the economic cost of using that rule.

## Sources

- `vibe-papers`: Neelo, "Section 5: Oracle Paradox, Manipulation, and Death Spiral", "5.5.3 ADL as Band-Aid".

## Related Pages

- `authored-shorting-death-spiral`
- `authored-percolator-engineering-vs-economics`
- `authored-trader-payout-certainty`
