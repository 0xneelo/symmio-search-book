---
id: "authored-funding-math-as-problem-sharpening"
title: "Funding Math As Problem Sharpening"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#what-the-math-is-for-sharpening-the-problem"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-00-informal-intro-what-the-math-is-for-sharpening-the-problem", "authored-funding-math-not-market-solution", "authored-funding-state-variable-map"]
---

# Funding Math As Problem Sharpening

The funding model's math is not there to make the market disappear into a spreadsheet. Neelo says its role is to sharpen the problem: make state, controls, risks, and constraints explicit; show how local risk, global coupling, insurance, and ADL interact; and give language for the tradeoffs.

That makes the math useful precisely because it is bounded. It identifies the knobs. It does not prove that any one knob setting is permanent.

## What The Math Gives The Protocol

The math gives Vibe a vocabulary for questions like:

- what state is the market in;
- which controls are available before insurance or ADL;
- how local market risk interacts with global safety resources;
- when trader UX and LP economics pull in opposite directions;
- where netting, asynchrony, leverage, and conservatism sit on a spectrum.

This vocabulary makes debates more precise. It does not remove the need to test, monitor, and revise the model as markets change.

## Publication Boundary

Do not publish the mathematical source as a finished production policy. It supports control reasoning and research. Live knobs, weights, caps, and thresholds need current implementation evidence and operator review.

## Sources

- `vibe-papers`: Neelo, "Informal intro", "What the math is for: sharpening the problem".

## Related Pages

- `authored-funding-math-not-market-solution`
- `authored-funding-state-variable-map`
- `authored-funding-control-actions-map`
