---
id: "authored-symmio-whitepaper-history-boundary"
title: "Symmio Whitepaper History Boundary"
section: "protocol-reference"
track: "Source Ingestion"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["symm-io-protocol-core-initial-commit", "symm-io-protocol-core-readme", "symmio-docs-initial-commit", "symmio-whitepaper-0-8-commit", "symmio-whitepaper-0-8-pdf", "symmio-earliest-docs", "symmio-whitepaper", "spec-04"]
sourceUrls: ["https://github.com/SYMM-IO/protocol-core/commit/e40c16ddedff545e0cb51bc137102e835dcb8753", "https://github.com/SYMM-IO/protocol-core/blob/main/README.md", "https://github.com/SYMM-IO/docs/commit/3e6e9687248cb48952d89cf7616b158d94373c54", "https://github.com/SYMM-IO/docs/commit/e1715f85768b7f06933e91e41568422591729e16", "https://github.com/SYMM-IO/docs/blob/main/Whitepaper/SYMMIO_paper_0_8.pdf", "https://github.com/SYMM-IO/docs", "https://docs.symm.io/security-and-architecture/symmio-whitepaper.md", "_specs/app-docs/04-sources.md"]
relatedGeneratedPages: ["symmio-whitepaper", "authored-symmio-clearing-house-layer", "authored-bilateral-intent-lifecycle"]
---

# Symmio Whitepaper History Boundary

The current source map has useful official Symmio history evidence. For v1, the exact original or oldest whitepaper artifact is explicitly out of scope; the launch-safe history boundary is the registered official GitHub and current-docs evidence below.

The strongest confirmed lower bound is the official `SYMM-IO/protocol-core` repository. Its initial public commit is dated 2023-06-13 and added a small README for version 0.8 of the protocol implementation. The current protocol-core README frames SYMMIO as a trustless hybrid clearing house and intent-centric meta-derivatives engine, which supports the present-day protocol description.

The official `SYMM-IO/docs` repository starts later. Its initial public commit is dated 2023-08-22 and added hedger documentation. The first located whitepaper file in that repository is `Whitepaper/SYMMIO_paper_0_8.pdf`, introduced by commit `e1715f85768b7f06933e91e41568422591729e16` on 2023-11-16. The file then appears again in the repo history on 2024-01-30 through a follow-up bug-fix commit.

A 2026-06-30 check of the current official Symmio whitepaper page confirms that the public docs still point readers to the GitHub-hosted `SYMMIO_paper_0_8.pdf`. The same page frames both the whitepaper and protocol as evolving work and presents the document as an overview of long-term vision, practical implementation, and future concepts, not as a frozen final specification.

## What This Proves

This proves that official GitHub history currently available in the source map includes:

- a public protocol-core implementation starting on 2023-06-13;
- a public docs repository starting on 2023-08-22;
- a tracked SYMMIO paper v0.8 PDF introduced on 2023-11-16;
- a current whitepaper page that points to that v0.8 PDF;
- a current README that supports the hybrid clearing-house and intent-centric protocol framing.

## What It Does Not Prove

This does not prove the exact original whitepaper, a 2021 artifact, a complete oldest-to-current version comparison, or any archived docs outside the current official repositories. Those claims are excluded from v1 source completeness rather than parked as launch blockers.

The docs should therefore avoid saying "the original whitepaper says..." unless the original artifact is later recovered. The safer wording is: "the earliest official GitHub evidence currently registered starts in 2023, and the first located whitepaper PDF in the official docs repo is SYMMIO paper v0.8."

The current whitepaper page also contains forward-looking publication language about further research. Treat that as source-page context, not a current roadmap claim, until it is reconciled with newer official sources or operator review.

## Reader Implication

When a reader asks for Symmio whitepaper history, route them here first. The answer should separate confirmed official repository evidence from the out-of-scope origin-story artifact. Current Symmio mechanics can still be cited from present docs and the current protocol-core README; historical claims should remain bounded to the registered evidence unless a future post-v1 recovery task adds an earlier artifact.

If a reader asks whether `SYMMIO_paper_0_8.pdf` is the original whitepaper, answer more narrowly: it is the first located whitepaper PDF currently registered in the official docs repository history, not proof of the exact original artifact.

## Sources

- `symm-io-protocol-core-initial-commit`: protocol-core initial public commit from 2023-06-13.
- `symm-io-protocol-core-readme`: current protocol-core README.
- `symmio-docs-initial-commit`: official docs repository initial commit from 2023-08-22.
- `symmio-whitepaper-0-8-commit`: commit introducing the v0.8 PDF on 2023-11-16.
- `symmio-whitepaper-0-8-pdf`: official `SYMMIO_paper_0_8.pdf` in the docs repository.
- `symmio-earliest-docs`: official SYMM-IO docs repository.
- `symmio-whitepaper`: current Symmio whitepaper page, including the public v0.8 PDF pointer and work-in-progress boundary.
- `spec-04`: required source-family list naming the whitepaper/history gap.

## Related Pages

- `authored-symmio-clearing-house-layer`
- `authored-bilateral-intent-lifecycle`
- `symmio-whitepaper`
