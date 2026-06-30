---
id: "authored-funding-operational-path-control"
title: "Funding Operational Path Control"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#the-operational-idea-separate-from-the-formula"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-00-informal-intro-the-operational-idea-separate-from-the-formula", "authored-funding-risk-inversion", "authored-funding-defense-hierarchy"]
---

# Funding Operational Path Control

Neelo separates the product/protocol direction from the master formula. The operational idea is a path: start in a cold-start regime, keep matching highly asynchronous, place a residual solver in the middle, and increase effective leverage only as live conditions justify it.

This is not a one-way ratchet. The source describes a "two steps forward, one step back" loop. When stress appears, ADL and related tools can step in; when conditions improve, better algorithms and external solvers can help the system move up the netting spectrum again.

## The Path In Plain English

The source-backed path is:

- begin near z-score zero, where flow is not fully netted;
- keep the residual solver hedged and conservative in aggregate;
- increase effective leverage gradually as the market proves it can support more netting;
- use ADL, resets, and parameter changes as part of learning and safety;
- let better solver policies improve the timing over time.

The key is humility. The protocol can name the path and the problem shape without claiming perfect timing or full market dynamics in advance.

## Publication Boundary

Do not turn this page into a live leverage schedule, z-score policy, solver obligation, or ADL promise. The source gives the operational thesis; production parameters remain implementation and risk work.

## Sources

- `vibe-papers`: Neelo, "Informal intro", "The operational idea (separate from the formula)".

## Related Pages

- `authored-funding-risk-inversion`
- `authored-funding-defense-hierarchy`
- `authored-funding-adl-trigger-and-target`
