---
id: "authored-funding-model-reading-boundary"
title: "Funding Model Reading Boundary"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#how-to-read-the-rest-of-15-docs"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-00-informal-intro-how-to-read-the-rest-of-15-docs", "authored-funding-model-control-problem", "authored-funding-full-objective"]
---

# Funding Model Reading Boundary

Neelo's funding-model intro tells readers not to treat the numbered derivation as a finished law of markets. It is a rigorous map of states, controls, profit, risk, insurance, and ADL, but it is still a scaffold for control and iteration.

That reading boundary matters because Vibe's risk problem is strategic. Trader behavior changes. Solver competition changes. Market maturity changes. A model can name the tensions and the control surfaces, but it should not be published as if one static optimum solves every future market state.

## How To Read The Folder

The funding-model folder should be read as:

- a map of what the system observes;
- a map of what the system can adjust;
- a language for profit, risk, insurance, and deleveraging;
- a frame for iteration when live flow teaches the model something new.

When a later section appears to give a final answer, this intro should govern the interpretation. The model is meant to help the protocol adapt, not to remove the need for observation, governance, and operational judgment.

## Publication Boundary

Do not turn source-model equations into live product parameters, guaranteed risk controls, or final LP economics without implementation and risk review. The source-backed claim is that the model is a control scaffold.

## Sources

- `vibe-papers`: Neelo, "Informal intro", "How to read the rest of 15_docs/".

## Related Pages

- `authored-funding-model-control-problem`
- `authored-funding-full-objective`
- `authored-funding-worked-examples-reading-guide`
