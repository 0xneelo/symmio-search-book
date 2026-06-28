---
id: "authored-protocol-owned-solver-depletion-boundary"
title: "Protocol-Owned Solver Depletion Boundary"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/ii-trader-compensation"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation", "authored-trader-compensation-continuity-model"]
---

# Protocol-Owned Solver Depletion Boundary

The DDQ separates protocol-owned solver depletion from ordinary third-party solver default.

In the bootstrapping configuration described by the source, the protocol-owned solver may be flagged as not liquidatable in the conventional account-level sense. That does not mean users are ignored or the solver can fail without consequence. It means the shortfall is handled at the protocol level through layered buffers and risk controls rather than by immediately liquidating the solver account like an outside counterparty.

The trader-compensation source defines the extreme depletion boundary as a state where protection layers have been exhausted: LP vault deposits, solver inventory, global insurance, local insurance, and ADL or other exposure-reduction controls. If all of those failed, the source model says positions would close, vaults would settle, and the protocol could restart from new deposits.

The publication-safe point is narrower than the source's strongest language. The protocol-owned solver is a bootstrapping backstop with protocol-level responsibilities. Its depletion boundary is a catastrophic system-state boundary, not a normal solver-default event.

## Publication Boundary

This page must not present the protocol-owned solver as currently non-liquidatable, practically unable to deplete, or guaranteed to make every trader whole unless the operator confirms the live deployment and public wording. Exact flags, buffer inventory, ADL policy, restart rules, and compensation semantics remain implementation review.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver default: Mode 3 - Protocol-operated solver".
- `vibe-papers`: Neelo DDQ, "Trader Compensation - Protocol-owned solver".

## Related Pages

- `authored-trader-compensation-continuity-model`
- `authored-funding-defense-hierarchy`
- `authored-loss-waterfall-and-profit-caps`
