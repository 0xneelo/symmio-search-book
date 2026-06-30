---
id: "authored-percolator-balance-sheet-safety-invariant"
title: "Percolator Balance-Sheet Safety Invariant"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "authored-percolator-formal-verification-boundary", "authored-adl-haircut-controlled-crash"]
---

# Percolator Balance-Sheet Safety Invariant

Neelo credits Percolator for enforcing a rigorous balance-sheet invariant: no user can withdraw more value than exists on the exchange balance sheet. That is a meaningful protocol-safety property.

The invariant explains how Percolator can survive technically. The contract can make sure withdrawals do not exceed the locally available balance. It can conserve balances, isolate markets, and avoid impossible token creation.

The limitation is that a conserved balance can still be economically inadequate. If a winning trader's claim is haircut through ADL, or if the token unit backing the balance has collapsed, the protocol may remain internally consistent while the user experience becomes "the market did not pay what traders expected."

## Technical Solvency Is Not Full Payout Credibility

Technical solvency asks whether the state machine avoids over-withdrawal. Payout credibility asks whether profitable positions settle in a way traders consider economically final and fair. The Percolator critique turns on that distinction.

This is why the compendium should avoid lazy language like "insolvent" when the precise problem is payout credibility under token-denominated stress. A system can avoid an accounting break by converting some stress into user haircuts, trapped capital, or volatile-unit settlement.

## Reader Implication

When a reader asks what the balance-sheet invariant proves, route here. It proves a valuable withdrawal-safety property. It does not prove that all winning positions remain fully credible in dollar terms during volatile inverse-market stress.

## Publication Boundary

Formal invariant scope, deployed-program state, withdrawal semantics, ADL/haircut rules, and user payout guarantees require primary-source, security, implementation, legal, risk, and operator review before publication as current facts. This page distinguishes source-level accounting safety from payout credibility.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right", "7.1 Engineering Achievements".

## Related Pages

- `authored-percolator-formal-verification-boundary`
- `authored-adl-haircut-controlled-crash`
- `authored-solver-drawdown-not-protocol-insolvency`
