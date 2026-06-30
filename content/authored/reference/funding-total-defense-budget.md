---
id: "authored-funding-total-defense-budget"
title: "Funding Total Defense Budget"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy#total-defense-budget"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-10-defense-hierarchy", "authored-funding-insurance-spend-caps", "authored-funding-adl-trigger-and-target"]
---

# Funding Total Defense Budget

Neelo's defense hierarchy combines local and global insurance into a per-market defense budget:

```
B_m_def = B_m_loc + B_m_glob
```

That budget sits inside a broader protection sequence. For a given exposure, the source orders absorption as:

1. user netting absorbs `min(L, S)`;
2. token inventory absorbs `min(E_remaining, P * T)`;
3. local insurance absorbs `min(D_remaining, eta_loc * I_loc)`;
4. global insurance absorbs `min(D_remaining, eta_glob * I_m_glob)`;
5. ADL absorbs everything else.

## Max Loss Before ADL

The source writes the max loss before ADL as:

```
Max_Loss_Before_ADL =
    (P * T_holdings)
  + (eta_loc * I_loc)
  + (eta_glob * I_m_glob)
```

The example combines `$50,000` of token protection, `$30,000` of local insurance capacity, and `$10,000` of global allocation into `$90,000` of pre-ADL protection.

## Why This Matters

This formula prevents vague claims like "insurance protects the market." The exact question is which layer is available, how much of it can be used, and whether the remaining modeled loss exceeds the pre-ADL defense budget.

## Publication Boundary

This page explains the source-model budget structure. It should not publish live insurance balances, risk fractions, global allocations, token holdings, max-loss guarantees, or production ADL thresholds without operator, accounting, risk, legal, and implementation review.

## Sources

- `vibe-papers`: Neelo, "Defense Hierarchy", "Total Defense Budget".

## Related Pages

- `authored-funding-insurance-spend-caps`
- `authored-funding-exposure-loss-estimate`
- `authored-funding-adl-trigger-and-target`
