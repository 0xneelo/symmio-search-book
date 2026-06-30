---
id: "authored-referral-market-creation-attachment"
title: "Referral Attachment At Market Creation"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/07-lp-and-category-layer", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-07-lp-and-category-layer", "authored-market-scoped-referrals", "authored-referral-market-creation-velocity"]
---

# Referral Attachment At Market Creation

Neelo's LP and category layer introduces a second referral surface: market-scoped referral attachment at market creation time.

This is different from a normal user invite. A user-level referral can explain who brought a trader into the system. A market-scoped referral explains who helped originate or distribute a specific listed market. That distinction matters because the attached referral is tied to that market's fee flow, not automatically to all future activity by the same user.

Market-creation attachment turns referral architecture into supply infrastructure. It lets the system account for the partner, creator, lister, or distributor who helps bring a tradable opportunity into existence.

## Publication Boundary

The docs can explain the concept safely. They should not publish final attachment eligibility, lister roles, UI steps, attachment timing, market-review criteria, or partner rights until product, commercial, legal, and implementation owners confirm the live model.

## Sources

- `vibe-papers`: Neelo, "Section 7: LP and Category Layer".
- `spec-03`: referral and market-publication caveats.

## Related Pages

- `authored-market-scoped-referrals`
- `authored-referral-market-creation-velocity`
- `authored-referral-supply-kpis`
