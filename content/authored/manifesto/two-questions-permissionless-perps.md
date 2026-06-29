---
id: "authored-two-questions-permissionless-perps"
title: "Two Questions For Permissionless Perps"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/10-conclusion"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-10-conclusion", "authored-vibe-percolator-trustlessness-tradeoff", "authored-usdc-hybrid-path-forward"]
---

# Two Questions For Permissionless Perps

Neelo's conclusion reduces the Vibe-versus-Percolator debate to two different questions.

Percolator asks whether a fully on-chain, formally verified, trustless derivatives engine can be built. The source's answer is yes. The engineering is impressive, but the token-margined economic model is structurally unsuitable for volatile assets.

Vibe asks whether permissionless perpetuals can be economically sustainable, LP-friendly, and safe for low-cap assets. The source's answer is also yes, but only through a different architecture: separate settlement from inventory, introduce active risk management, use defense-in-depth, and mutualize risk across markets.

## Why This Framing Matters

The two systems optimize for different truths. Percolator proves a mechanical possibility. Vibe tries to solve the market-design problem that remains after mechanical possibility is achieved.

That is why the comparison should not be flattened into "trustless versus centralized" or "on-chain versus off-chain." The more useful question is what each architecture can guarantee under low-cap stress.

## Reader Implication

When a reader wants the final takeaway from the Percolator sequence, route here. The answer is that Percolator solves the trustless-engine question better, while Vibe is designed around the harder economic question of making permissionless long-tail perps survive.

## Sources

- `vibe-papers`: Neelo, "Section 10: Conclusion", "10.5 Two Questions, Two Answers".

## Related Pages

- `authored-vibe-percolator-trustlessness-tradeoff`
- `authored-usdc-hybrid-path-forward`
- `authored-percolator-proof-of-concept-boundary`
