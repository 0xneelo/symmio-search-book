---
id: "authored-vibe-settlement-contract-audit-scope"
title: "Vibe Settlement Contract Audit Scope"
section: "product-reference"
track: "Account And Safety"
status: "publication-candidate-needs-publication-date-review"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-security-audits", "sherlock-symmetrical-contest"]
sourceUrls: ["https://docs.vibe.trading/more-info/security-and-audits.md", "https://audits.sherlock.xyz/contests/85"]
relatedGeneratedPages: ["vibe-security-audits", "authored-vibe-security-and-audits", "authored-symmio-frontend-builder-audit-posture"]
---

# Vibe Settlement Contract Audit Scope

The safest way to answer "is Vibe audited?" is to name the exact contract surface the public source covers.

Vibe's official security page says the trade-settlement layer uses SYMMIO-Core v0.8.4 smart contracts and says that contract set was audited by Sherlock. The linked evidence is the Sherlock Symmetrical contest page. That supports a settlement-contract audit answer; it does not automatically prove audit coverage for every future Vibe product, every frontend integration, every token module, or every staking module.

## What The Claim Covers

The source-backed claim is narrow:

- contract family: SYMMIO-Core settlement contracts;
- version named by the public Vibe page: v0.8.4;
- audit venue named by the public Vibe page: Sherlock;
- linked public audit context: the Symmetrical contest page.

That is enough for a precise security answer, but it should remain versioned. If Vibe changes settlement contracts, adds product modules, or publishes new audit reports, this page needs a source refresh before final publication.

## Reader Guidance

For traders, the practical takeaway is that the public security claim is about the settlement-contract layer that supports trade settlement. For builders and auditors, the practical takeaway is to ask which contract version and which product surface a claim refers to before treating "audited" as universal.

## Sources

- `vibe-security-audits`: official Vibe security/audit page naming SYMMIO-Core v0.8.4 settlement contracts and Sherlock audit coverage.
- `sherlock-symmetrical-contest`: public Sherlock contest page linked from the Vibe security guide.

## Related Pages

- `authored-vibe-security-and-audits`
- `authored-vibe-sherlock-audit-contest-reference`
- `authored-symmio-frontend-builder-audit-posture`
