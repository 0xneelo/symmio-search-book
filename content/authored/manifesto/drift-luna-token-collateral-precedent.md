---
id: "authored-drift-luna-token-collateral-precedent"
title: "Drift LUNA Token-Collateral Precedent"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/06-capital-and-historical"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-06-capital-and-historical", "authored-token-margined-reflexivity-risk", "authored-token-margin-manipulation-amplifier"]
---

# Drift LUNA Token-Collateral Precedent

Neelo's historical section uses Drift V1 and the LUNA crash as a concrete token-collateral warning. In the source account, token collateral fell toward zero while the protocol still owed winning shorts, insurance was drained, and Drift later relaunched with USDC-based liquidity.

The mechanism matters more than the brand example. Token-margined systems can lose backing at the same moment liabilities expand. If the token is the collateral unit and the thing being shorted, a collapse damages the asset side while winners demand payment from the system.

That is why this source belongs next to the reflexivity pages. The risk is not merely "collateral price can move." It is that collateral quality is correlated with market stress in the exact direction that stresses the payout obligation.

## Why Black Swans Are The Wrong Exception

Calling this a black swan can make the design problem sound external. For long-tail tokens, violent idiosyncratic collapse is part of the product surface. The system is being asked to list tokens whose liquidity, narrative, treasury behavior, and holder base can change quickly.

If the collateral unit can become nearly worthless while the market owes short-side profits, the venue needs stable settlement capital, active refusal/repricing, loss containment, or some other explicit answer. A local balance-sheet invariant is not enough if the unit of account itself disappears.

## Reader Implication

When a reader asks why Vibe separates settlement from token inventory, route here. The source's Drift/LUNA precedent makes the separation legible: market-native inventory can be useful for alignment, but it should not become the only asset backing stress-state payouts.

## Sources

- `vibe-papers`: Neelo, "Section 6: Capital Inefficiency and Historical Precedent", "6.2.2 Drift V1 (Solana)".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-usdc-settlement-inventory-separation`
- `authored-token-margin-manipulation-amplifier`
