---
id: "authored-force-close-failure-detection"
title: "Force Close Failure Detection"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/a-operational-failures/i-operational-failure"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-a-operational-failures-i-operational-failure", "authored-solver-operational-failure-force-close", "authored-force-close-versus-escape-mode"]
---

# Force Close Failure Detection

The DDQ operational-failure source begins with a simple condition: the solver stops responding to normal open or close requests in the off-chain intent/RFQ pathway.

Under normal operation, the user requests an open or close through the solver path and receives a quote or acceptance. Failure detection starts when that response does not arrive within the configured frontend and protocol assumptions. The source describes a short UI-defined timeout before the user is prompted toward the emergency on-chain route.

## Why Detection Is Separate From Closure

Detection is not the close itself. It is the moment the interface and protocol flow decide that the normal solver path is not dependable enough for the user to wait passively.

That distinction matters for support. A user asking "is the solver offline?" should not immediately receive a broad insolvency answer. Operational failure means unresponsiveness. The next step is Force Close initiation, not a claim that the solver has defaulted.

## Publication Boundary

Exact timeout values, frontend prompts, supported markets, retry behavior, and monitoring signals are implementation-specific. The source-backed mechanism is that solver non-response can route the user from off-chain intent execution to an on-chain Force Close path.

## Sources

- `vibe-papers`: Neelo DDQ, "Operational Failure".

## Related Pages

- `authored-solver-operational-failure-force-close`
- `authored-force-close-versus-escape-mode`
- `authored-solver-event-monitoring`
