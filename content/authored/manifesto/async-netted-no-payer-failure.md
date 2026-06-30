---
id: "authored-async-netted-no-payer-failure"
title: "The Async-Netted No-Payer Failure"
section: "manifesto"
track: "01 — Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/04-bootstrap-trilemma#4-4-why-single-architectures-fail", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-5-the-complete-framework"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-04-bootstrap-trilemma-4-4-why-single-architectures-fail", "section-01-perp-classes-zscore-01-docs-02-framework-2-5-the-complete-framework", "authored-static-perp-design-failures"]
---

# The Async-Netted No-Payer Failure

The most tempting impossible quadrant is asynchronous plus fully netted. It appears to promise everything a new market wants: trades can arrive without a simultaneous counterparty, listings can be permissionless, and the system does not tie up vault capital.

Neelo's trilemma source says the failure is direct. Netted accounting means winning traders are paid by losing traders. Asynchronous entry means a long or short can exist before the opposite side exists. If the trader wins before an offsetting counterparty has appeared, there is no defined payer.

Funding incentives do not solve that base case. A protocol can try to attract the other side later, but a reliable market cannot depend on someone voluntarily appearing after the first trader is already in profit. At bootstrap, the counterparty path has to be known before the trade is accepted.

This is why the no-payer failure is not only a liquidity problem. It is an obligation problem. A market that lets exposure open without a credible payout source has created the appearance of a perp without completing the economic circuit.

## Reader Implication

Use this page when readers ask why Vibe cannot simply be a cheap permissionless netting layer. Cheap netting works after balance exists. Before balance exists, the system needs a solver, vault, inventory path, or some other capitalized payer behind the residual exposure.

## Sources

- `vibe-papers`: Neelo, "Section 4: Why Single Architectures Fail".
- `vibe-papers`: Neelo, "Section 2: The Complete Framework".

## Related Pages

- `authored-static-perp-design-failures`
- `authored-collateralization-payout-source`
- `authored-technically-async-economically-sync`
