---
id: "authored-tokenized-points-composable-object-chain"
title: "Tokenized Points Composable Object Chain"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-2-why-this-scenario-matters", "authored-points-value-state-lifecycle"]
---

# Tokenized Points Composable Object Chain

The tokenized-points thought experiment matters because the rewards architecture can create composable economic objects.

The source chain is:

1. points are earned;
2. points can be claimed on-chain after the approved lifecycle;
3. points can remain direct exposure or convert into packs;
4. packs can open into artifacts with embedded point exposure;
5. once value-bearing units exist on-chain, third-party builders can compose around them.

That chain is not a live policy statement. It is a warning about documentation precision. A displayed off-chain point, a claimable point, an on-chain point, a pack, an artifact, and a wrapped point-linked token are different economic states.

## Why The Chain Matters

Once an object is on-chain and value-bearing, the design space expands. External builders can create spot liquidity, wrappers, vaults, derivatives, hedges, and market-making strategies around that object. The docs need to explain the state transitions before they explain any hypothetical market.

## Reader Implication

When readers ask why points need careful accounting, route them here. The reason is not only TGE settlement. It is that on-chain reward objects can become inputs to additional markets, which magnifies the need for clear state, source buckets, eligibility, and transfer rules.

## Sources

- `vibe-papers`: Neelo, "Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets", "Why This Scenario Matters".
- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: points and TGE caveats.

## Related Pages

- `authored-points-value-state-lifecycle`
- `authored-points-claim-bridge-and-vesting`
- `authored-artifact-exposure-and-boost-rules`
