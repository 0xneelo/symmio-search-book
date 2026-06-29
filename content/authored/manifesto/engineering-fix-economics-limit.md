---
id: "authored-engineering-fix-economics-limit"
title: "Engineering Fixes Cannot Solve Inverse Economics"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/07-percolator-strengths"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-07-percolator-strengths", "authored-percolator-engineering-vs-economics", "authored-inverse-payoff-trap"]
---

# Engineering Fixes Cannot Solve Inverse Economics

Section 7 is careful: it credits Percolator's engineering, then lists the problems that engineering cannot fully fix. Reflexive collateral risk, negative convexity, LP lose-lose exposure, the one-times leverage constraint, spot-perp manipulation, short-side death spirals, and isolated-slab capital inefficiency all come from the economic model.

That is the central distinction for the compendium. Some flaws are implementation bugs. Others are design consequences. A bug can be patched. A design consequence can only be accepted, mitigated, bounded, or replaced.

Oracle latency is the partial exception in the source's table. Engineering can mitigate it, but the strongest mitigation may require an off-chain signer or active judgment, which weakens the fully on-chain property Section 7 credits. Even the fix creates a tradeoff.

## Why This Page Exists

Without this page, readers may hear "formally verified" and assume "financially robust." Or they may hear "token margin is risky" and assume the engineers were careless. The source says neither. It says Percolator can be well engineered while the inverse token-margined model carries structural constraints.

That nuance matters because Vibe's argument is architectural, not tribal. The target is not to beat a named competitor. The target is to explain why long-tail derivatives need stable settlement, explicit risk acceptance, inventory separation, and solver-managed refusal/repricing in the states where passive inverse mechanics break.

## Reader Implication

When a reader asks whether Percolator's issues can be patched away, route here. The answer is: some execution or oracle details can be improved, but the core inverse-token economics remain unless the collateral, settlement, and risk-bearing model changes.

## Sources

- `vibe-papers`: Neelo, "Section 7: What Percolator Gets Right", "7.2 What Engineering Cannot Fix".

## Related Pages

- `authored-percolator-engineering-vs-economics`
- `authored-inverse-payoff-trap`
- `authored-token-margined-reflexivity-risk`
