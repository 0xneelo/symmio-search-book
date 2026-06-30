---
id: "authored-tokenized-points-fractionalized-wrapper-flow"
title: "Tokenized Points Fractionalized Wrapper Flow"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-3-base-hypothetical-flow", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-5-hypothetical-case-study"]
---

# Tokenized Points Fractionalized Wrapper Flow

The source's base hypothetical flow includes an independent fractionalization contract. In the example, that contract accepts deposited packs, mints an ERC-20 representation of pooled pack exposure, and enables transferable fungible claims on that basket.

That flow has several distinct states:

- users earn points from trading, referrals, LP activity, or selected programs;
- points are finalized and claimed on-chain after vesting or authorization rules;
- points can remain direct exposure or convert into packs and artifacts if future policy permits;
- an independent wrapper can pool packs;
- the wrapper can issue a fungible token representing exposure to the pooled basket.

## What The Wrapper Does Not Prove

A hypothetical wrapper does not prove that packs are live, that packs are transferable, that wrappers are endorsed, that wrapper tokens qualify for TGE exposure, or that Vibe will list a resulting market.

The wrapper example is valuable because it shows how quickly reward objects can become composable once they leave a purely internal ledger. It is not a final product path.

## Reader Implication

When users ask whether packs or artifacts can be pooled or tokenized, answer by separating possibility from policy. The source demonstrates a possible third-party wrapper route. It does not approve wrapper contracts, wrapper token economics, custody, eligibility, or redemption semantics.

## Sources

- `vibe-papers`: Neelo, "Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets", "Base Hypothetical Flow" and "Hypothetical Case Study".
- `spec-03`: final pack, artifact, transferability, and TGE rules remain owner-review.

## Related Pages

- `authored-reward-pack-ev-supply-policy`
- `authored-artifact-exposure-and-boost-rules`
- `authored-tge-qualifying-exposure-across-rewards`
