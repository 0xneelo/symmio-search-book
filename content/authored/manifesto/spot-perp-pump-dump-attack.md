---
id: "authored-spot-perp-pump-dump-attack"
title: "Spot-Perp Pump-And-Dump Attack"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/05-oracle-manipulation-death-spiral"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-05-oracle-manipulation-death-spiral", "authored-profitable-manipulation-condition", "authored-token-margined-reflexivity-risk"]
---

# Spot-Perp Pump-And-Dump Attack

Neelo's Percolator manipulation source describes a two-phase attack that uses the spot market and the perp market against each other.

In the pump phase, the attacker opens a leveraged long, buys the token on spot, pushes the oracle upward, and cashes out the long as the perp follows. In the dump phase, the attacker opens a large short, sells accumulated spot tokens, pushes the price down, and closes the short for token-denominated profit.

## Why The Sequence Matters

The important feature is coordination across venues. The perp is not attacked in isolation. The attacker can use the reference spot market to move the oracle and use the perp to extract from the LP vault. In a thin market, the cost of moving spot can be smaller than the gain from the leveraged derivative.

This is why low-cap perp documentation must discuss spot liquidity, oracle construction, OI caps, and liquidation feasibility together. A market can look safe in a single module and still be attackable as a cross-market system.

## Reader Implication

When a reader asks whether manipulation is random or structural, route here. The source's answer is that manipulation becomes structural when the attacker can profitably coordinate spot movement, oracle response, and leveraged perp PnL.

## Sources

- `vibe-papers`: Neelo, "Section 5: Oracle Paradox, Manipulation, and Death Spiral", "5.4.1 The Pump-and-Dump Attack".

## Related Pages

- `authored-profitable-manipulation-condition`
- `authored-incentive-based-attack-risk`
- `authored-token-margin-manipulation-amplifier`
