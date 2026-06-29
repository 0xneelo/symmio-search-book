---
id: "authored-jit-liquidity-duration-mismatch"
title: "JIT Liquidity Duration Mismatch"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/06-capital-and-historical"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-06-capital-and-historical", "authored-rfq-before-order-book", "authored-ddq-request-based-settlement-layer"]
---

# JIT Liquidity Duration Mismatch

Percolator can support atomic deposit-and-trade style liquidity, but Neelo's Section 6 critique says that does not make the capital commitment short-lived. Once the trade creates open positions, capital remains locked in the slab for the duration of those positions.

That is the duration mismatch. The LP may arrive just in time for execution, but the balance sheet cannot necessarily leave just in time afterward. The execution event is atomic; the obligation is not.

The source contrasts this with RFQ-style systems such as Symmio, where market makers can keep capital off-chain until needed and commit to a quoted bilateral flow. That does not remove counterparty risk, but it changes when capital is immobilized and who chooses to accept it.

## Why It Is Not Just A UX Difference

For professional liquidity, duration matters as much as price. A maker can quote aggressively if capital is committed for a defined trade window and repriced as conditions change. If the same capital becomes locked until user positions exit, the maker must charge for duration, liquidity loss, and adverse selection.

This is why "JIT liquidity exists" is not enough. The important question is whether the system offers JIT execution, JIT risk acceptance, or JIT capital release. Percolator's source critique says the third piece remains constrained by slab obligations.

## Reader Implication

When docs compare passive on-chain slabs to RFQ or intent systems, do not collapse them into "both can source liquidity on demand." The decisive distinction is how long capital stays committed after demand appears.

## Sources

- `vibe-papers`: Neelo, "Section 6: Capital Inefficiency and Historical Precedent", "6.1.3 JIT Limitation".

## Related Pages

- `authored-rfq-before-order-book`
- `authored-intents-solver-compact`
- `authored-solver-owned-market-maker`
