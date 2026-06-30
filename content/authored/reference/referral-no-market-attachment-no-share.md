---
id: "authored-referral-no-market-attachment-no-share"
title: "No Market Attachment Means No Market-Level Share"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-07-lp-and-category-layer", "authored-market-scoped-referrals", "authored-referral-rights-ownership-model"]
---

# No Market Attachment Means No Market-Level Share

The LP and category source gives a hard accounting rule: no attachment means no market-level referral share.

That rule exists to prevent ambiguous claims. If a market-level referral can be inferred after the fact from social proof, campaign history, private conversations, or general platform participation, every successful market can generate attribution disputes. A deterministic attachment at creation time gives the accounting system a record to pay against.

This does not decide user-level referral rewards. It only defines the market-level surface. A user may have a normal referral identity while a specific market has no market-scoped referral attachment.

## Reader Implication

When readers ask why a market did not create a market-level referral payout, the docs should answer through attachment state. If no market-level referral was attached under the approved process, there is no market-level share to distribute.

## Sources

- `vibe-papers`: Neelo, "Section 7: LP and Category Layer".
- `spec-03`: referral policy and accounting caveats.

## Related Pages

- `authored-market-scoped-referrals`
- `authored-referral-rights-ownership-model`
- `authored-referral-admin-override-audit-trails`
