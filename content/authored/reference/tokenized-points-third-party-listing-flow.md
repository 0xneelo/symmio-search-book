---
id: "authored-tokenized-points-third-party-listing-flow"
title: "Tokenized Points Third-Party Listing Flow"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-3-base-hypothetical-flow", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-4-what-becomes-possible"]
---

# Tokenized Points Third-Party Listing Flow

The source's hypothetical listing path has two external steps before any point-linked perp exists.

First, external actors list a wrapper token on a permissionless spot venue, such as a DEX. Second, if the token has a qualifying spot market, independent builders could try to list it as a perp market through a permissionless venue such as Vibe Trading.

The point-linked perp is therefore not the first step. It depends on prior states:

- claimed or converted reward exposure exists;
- a third-party wrapper or token represents that exposure;
- the wrapper token has spot liquidity;
- listing criteria are met;
- builders create a derivative market around the token.

## What The Flow Enables

If that stack exists, the source says participants could trade point-linked exposure, hedge reward inventory, speculate on future demand, make markets around point-linked volatility, or arbitrage spot/perp basis.

Those are possible financial behaviors, not current endorsed user flows. The docs should keep the words "third-party", "hypothetical", and "permissionless" visible.

## Reader Implication

When readers ask whether a reward-linked ERC-20 could become a Vibe market, answer conditionally. The source says the architecture makes such a scenario technically plausible, but a live listing would still depend on external tokenization, spot liquidity, listing rules, risk controls, and explicit policy.

## Sources

- `vibe-papers`: Neelo, "Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets", "Base Hypothetical Flow" and "What Becomes Possible".
- `spec-03`: listing, transferability, and reward-policy caveats.

## Related Pages

- `authored-tokenized-points-fractionalized-wrapper-flow`
- `authored-market-creation-lifecycle`
- `authored-tokenized-points-perps-hypothetical`
