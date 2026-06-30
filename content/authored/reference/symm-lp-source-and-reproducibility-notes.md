---
id: "authored-symm-lp-source-and-reproducibility-notes"
title: "SYMM LP Source And Reproducibility Notes"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions#7-1-sources-used", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions#7-5-reproducibility-notes"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-1-sources-used", "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-5-reproducibility-notes", "authored-symm-lp-data-guardrails", "authored-symm-lp-yield-methodology"]
---

# SYMM LP Source And Reproducibility Notes

The SYMM LP data-snapshot section names the source set behind the case study: `../16_data.md` and provided dashboard screenshots from the same SYMM session. The reproducibility notes then define the analysis window and annualization convention.

The analysis window starts at the first deposit timestamp, `29/12/2025 11:49:29`, and runs through the referenced dashboard snapshot data cut, `20:48:23`. The daily series uses the same case-study source set. Annualization uses average per-day yield times `365`, without compounding.

## Why This Page Exists

Source and reproducibility notes are not administrative detail. They are what prevent a strong case study from becoming vague yield marketing.

If a reader cannot see which data cut was used, where the daily series came from, when the window began and ended, and how annualization was computed, they cannot reproduce or audit the case. They also cannot compare it safely against later LP reports.

## Publication Boundary

Do not treat this source list as a complete audit trail. It identifies the case-study sources named in Neelo's document, but final public reporting needs durable source files, ownership, refresh cadence, raw trade or accounting records where available, and a reviewer-approved reconciliation process.

## Sources

- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions", "7.1 Sources Used".
- `vibe-papers`: Neelo, "Data Snapshot and Metric Definitions", "7.5 Reproducibility Notes".

## Related Pages

- `authored-symm-lp-data-guardrails`
- `authored-symm-lp-yield-methodology`
- `authored-symm-lp-dashboard-data-cut`
