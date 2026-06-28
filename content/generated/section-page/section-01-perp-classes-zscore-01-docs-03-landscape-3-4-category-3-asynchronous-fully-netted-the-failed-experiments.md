---
id: "section-01-perp-classes-zscore-01-docs-03-landscape-3-4-category-3-asynchronous-fully-netted-the-failed-experiments"
title: "Section 3: The Landscape of Existing Protocols: 3.4 Category 3: Asynchronous + Fully Netted (The Failed Experiments)"
section: "vision-sections"
track: "01 — Perps Categories & Bootstrap Trilemma"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-4-category-3-asynchronous-fully-netted-the-failed-experiments"]
parentPageId: "neelo-01-perp-classes-zscore-01-docs-03-landscape"
sourcePath: "Docs/public/01_perp_classes_zscore/01_docs/03-Landscape.md"
headingId: "3-4-category-3-asynchronous-fully-netted-the-failed-experiments"
---

# Section 3: The Landscape of Existing Protocols: 3.4 Category 3: Asynchronous + Fully Netted (The Failed Experiments)

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/03-landscape#3-4-category-3-asynchronous-fully-netted-the-failed-experiments

## Extracted Section Draft

## 3.4 Category 3: Asynchronous + Fully Netted (The Failed Experiments)

### 3.4.1 The Attractive but Flawed Concept

Several protocols have attempted to combine:
- **Asynchronous execution** (for permissionless listing)
- **Netted positions** (for capital efficiency)

In theory, this would give the best of both worlds. In practice, it fails.

### 3.4.2 Derp.fun Analysis

**Claimed Architecture**:
- Permissionless market creation
- Traders trade "against each other" asynchronously
- Dynamic funding rates incentivize balance
- No LP vault required

**The Fundamental Problem**:

Consider a new market launch:

1. **T=0**: Market created for token XYZ
2. **T=1**: Trader A opens 100 XYZ long
3. **T=2**: Price increases 10%
4. **T=3**: Trader A wants to close with profit

**Question**: Who pays Trader A's profit?

In a netted system, shorts pay longs. But:
- No shorts exist yet
- The protocol has no collateral
- Trader A cannot be paid

**Proposed Solution (Dynamic Funding)**:

Derp.fun's answer: "Extreme funding rates will incentivize shorts"

**Reality**:
```
Scenario: Token pumping 50%
Required short incentive: Enormous (paying to lose?)
Actual short interest: Zero (why short a pumping token?)
Result: Longs cannot be paid
```

This is not a theoretical problem—it is mathematically guaranteed to occur in any bootstrapping scenario.

### 3.4.3 Why Dynamic Incentives Cannot Solve This

The argument goes: "If funding is high enough, someone will take the other side."

**Counter-arguments**:

1. **No rational short**: During bootstrap, price discovery is uncertain. Shorting means betting against unknown momentum. No funding rate compensates for unlimited downside risk.

2. **Information asymmetry**: Early markets have informed traders (insiders, early holders). Why would anyone take the other side of an informed trade?

3. **Adverse selection**: If the funding rate to short is +500% APR, what does that signal? That everyone wants to be long. Why would you short?

4. **Game theory**: Knowing shorts won't come, longs won't enter either. The market fails to start.

### 3.4.4 Imperial and Similar Protocols

Multiple protocols have attempted variations:
- Isolated perpetual pools with netted accounting
- Virtual AMMs with implied counterparties
- "Community-backed" perpetual positions

**Common Failure Mode**:
All require someone to take losses during bootstrap. Without a defined, capitalized counterparty, this someone doesn't exist.

### 3.4.5 The Core Insight

**Asynchronous + Netted is a contradiction for bootstrap:**

- Asynchronous means "execute without matching"
- Netted means "all payouts come from other participants"
- Combined: "Execute without matching, but only pay from matches"

This is logically incoherent for new markets.

### 3.4.6 Summary: Failed Experiment Lessons

| What They Tried | Why It Fails |
|-----------------|--------------|
| Async execution | Requires counterparty |
| Netted accounting | No counterparty exists |
| Dynamic funding | Cannot force other side |
| Permissionless listing | Markets immediately break |

**Conclusion**: The async + netted combination is architecturally invalid for market bootstrap. Protocols attempting this approach will fail regardless of implementation quality.

---
