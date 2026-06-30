---
id: "authored-tokenized-points-market-risk-boundary"
title: "Tokenized Points Market Risk Boundary"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/13-hypothetical-tokenized-points-perps", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-7-major-risks-and-constraints", "section-17-referral-program-17-docs-13-hypothetical-tokenized-points-perps-13-8-final-take"]
---

# Tokenized Points Market Risk Boundary

The tokenized-points source lists the risks before it closes the thought experiment: thin-market manipulation, valuation ambiguity, reflexive leverage loops, legal and disclosure constraints, and user confusion between official and third-party instruments.

Those risks define the publication boundary. A point-linked market can be technically plausible and still be unsafe to describe as an endorsed product.

## Required Guardrails

Any public mention of point-linked derivative scenarios needs:

- strong labeling that separates official product policy from community-built markets;
- transparent risk communication around liquidity, valuation, leverage, and wrapper mechanics;
- clear disclosure that reward-object policy, transferability, and TGE treatment are not inferred from a third-party market;
- avoidance of implied guarantees about listing, support, redemption, price discovery, or eligibility.

The source's final take is that on-chain state can become a financial primitive, and financial primitives can become derivative markets. That is a composability thesis, not a safety guarantee.

## Reader Implication

When a reader asks what could go wrong with tokenized points perps, route here. The short answer is: the market can confuse official rewards with third-party wrappers, amplify thin-liquidity manipulation, and create derivative exposure before the underlying reward policy is fully understood.

## Sources

- `vibe-papers`: Neelo, "Section 13: Hypothetical Scenarios for Tokenized Points Perpetual Markets", "Major Risks and Constraints" and "Final Take".
- `spec-03`: current points and public-disclosure caveats.

## Related Pages

- `authored-tokenized-points-product-disclaimer`
- `authored-reward-packs-future-facing-status`
- `authored-referral-public-statement-readiness`
