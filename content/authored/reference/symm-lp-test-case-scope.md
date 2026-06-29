---
id: "authored-symm-lp-test-case-scope"
title: "SYMM LP Test Case Scope"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/02-case-context-and-setup#2-2-test-case-scope"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-2-test-case-scope", "authored-symm-lp-case-setup"]
---

# SYMM LP Test Case Scope

The SYMM LP case study tracks one participant and one concrete deposit set. The source names LafaChief as the participant and reports `2,271,131` SYMM tokens deposited across three deposits. The same section reports a current token balance of `2,501,328.4` SYMM, a token delta of `+230,197.4` SYMM, an average deposit reference price of `$0.01280`, and a current reference price of `$0.0074`.

This makes the case auditable as a point-in-time case study. It is not an anonymous benchmark. It is not a synthetic example. The source gives the deposit ledger so later performance claims can be tied back to a defined allocation.

## Deposit Ledger

The source lists three SYMM deposits:

| Date | Token | Amount | Transaction |
| --- | --- | ---: | --- |
| `24/01/2026 12:09:07` | SYMM | `620,000` | `0x02ac33dfaebfd2f07ff35e4202753bdab5825702431200a4dae6c59b3bd075f5` |
| `06/01/2026 08:12:41` | SYMM | `825,925` | `0x95466e0f334de737971012765849ce5eb0c1965ea3c8967fc8d95d9772fb8e06` |
| `29/12/2025 11:49:29` | SYMM | `825,206` | `0xaef807a86785d9cf9e670f04dcf52f8bd02bf4fc7187aacd747bf87d4b9b2fe5` |

The ledger is useful because every downstream return, benchmark, and caveat depends on the starting inventory, deposit timing, reference prices, and final balance convention.

## Publication Boundary

The docs can cite this ledger as case-study evidence. They should not imply that these deposits are current open balances, current product terms, public treasury instructions, or audited performance statements without fresh source/operator/accounting review.

## Sources

- `vibe-papers`: Neelo, "Case Context and Setup", Section 2.2, "Test Case Scope".

## Related Pages

- `authored-symm-lp-case-setup`
- `authored-symm-lp-headline-result-shape`
- `authored-symm-lp-benchmark-reading`
