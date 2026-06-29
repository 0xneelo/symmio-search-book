---
id: "authored-referral-access-phasing-operating-model"
title: "Referral Access Phasing Operating Model"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/06-access-phasing#6-4-why-phasing-matters", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/02-architecture", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-06-access-phasing", "section-17-referral-program-17-docs-06-access-phasing-6-4-why-phasing-matters", "section-17-referral-program-17-docs-06-access-phasing-6-5-migration-requirements", "section-17-referral-program-17-docs-06-access-phasing-6-6-launch-sequencing-notes", "section-17-referral-program-17-docs-02-architecture-2-3-referral-code-activation-policy"]
---

# Referral Access Phasing Operating Model

Neelo's access-phasing section treats access codes as launch-control infrastructure. The early purpose is not permanent exclusivity. It is to bound high-sensitivity actions while trading, listing, attribution, monitoring, and reward accounting harden.

The operating model has three phases:

- access-gated launch, where codes are required for sensitive flows such as trading and listing;
- unified access and referral identity, where onboarding and attribution become one identity surface;
- open participation, where core use is broadly available and codes become optional accelerators.

That sequence answers two opposite risks. Opening every incentive surface immediately can outrun abuse controls. Staying gated too long can throttle the network effects that make referrals useful.

## Transition Requirements

The source names three migration requirements for every phase transition: backward compatibility windows, code format migration rules, and transparent communication to traders, listers, and partners.

Those requirements matter because access state becomes economic state once referral, rakeback, points, and claims depend on it. A transition that changes code semantics without a compatibility window can break attribution. A transition that changes issuer eligibility without public communication can create disputes about who owns future rewards.

## Issuance Policy

The same source favors qualified referral-code issuance. Possible routes include performance thresholds, curated campaign grants, and progressive unlock criteria. That keeps referral codes tied to market contribution instead of making every account immediately reward-eligible.

## Reader Implication

The public docs should describe the current phase, not imply a permanent gate. They should also separate base access, referral identity, and reward-eligible code activation, because the architecture allows those states to diverge during pre-beta and beta.

## Sources

- `vibe-papers`: Neelo, "Section 6: Access Phasing".
- `vibe-papers`: Neelo, "Section 2: Architecture".
- `spec-03`: current referral-depth and product-state caveats.

## Related Pages

- `authored-referral-issuance-and-anti-gaming`
- `authored-referral-identity-and-claim-flow`
- `authored-referral-policy-governance`
