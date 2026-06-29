---
id: "authored-stable-margin-manipulation-cost"
title: "Stable Margin Makes Manipulation Cost Real Capital"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/08-structurally-superior-alternative"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-08-structurally-superior-alternative", "authored-token-margin-manipulation-amplifier", "authored-profitable-manipulation-condition"]
---

# Stable Margin Makes Manipulation Cost Real Capital

Neelo's Section 8 contrasts token margin with USDC margin in manipulation states. In the USDC-margined alternative, an attacker still needs capital to move the spot market, but the derivative payout and collateral base are not denominated in the same volatile token being manipulated.

That changes the attack arithmetic. In a token-margined design, the attacker may use the token's own reflexivity against the market: the collateral, payout unit, LP balance sheet, and manipulated asset can all move together. In the USDC-margined model, the attacker must spend real stable capital and extract against bounded USDC obligations.

This does not mean manipulation disappears. It means the feedback loop is less self-amplifying. The market can combine stable margin with solver quote controls, OI limits, dynamic spreads, funding, and refusal rather than relying on passive token-denominated mechanics.

## Bounded Liability Is A Control Surface

Manipulation defense begins with economics. If the cost to push the reference market is lower than the payout extracted from the perp, the attack can be rational. Stable margin helps by making the payout legible in USDC and by preventing the manipulated token from simultaneously weakening the collateral unit.

The defense is strongest when the solver can also notice bad market states and refuse or reprice. Stable margin is the base; active risk management is the response.

## Reader Implication

When a reader asks why USDC margin helps manipulation defense, route here. The answer is not that USDC makes spot liquidity deep. The answer is that stable margin removes one reflexive amplifier and makes the attacker's economics easier to bound.

## Sources

- `vibe-papers`: Neelo, "Section 8: The Structurally Superior Alternative", "8.2 How This Fixes Each Problem".

## Related Pages

- `authored-token-margin-manipulation-amplifier`
- `authored-profitable-manipulation-condition`
- `authored-solver-refusal-as-oracle-defense`
