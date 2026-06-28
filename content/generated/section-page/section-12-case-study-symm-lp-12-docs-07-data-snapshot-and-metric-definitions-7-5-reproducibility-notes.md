---
id: "section-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions-7-5-reproducibility-notes"
title: "Data Snapshot and Metric Definitions: 7.5 Reproducibility Notes"
section: "vision-sections"
track: "12 - First Vibe Perp Vault Case study"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions#7-5-reproducibility-notes"]
parentPageId: "neelo-12-case-study-symm-lp-12-docs-07-data-snapshot-and-metric-definitions"
sourcePath: "Docs/public/12_case_study_symm_lp/12_docs/07-Data-Snapshot-and-Metric-Definitions.md"
headingId: "7-5-reproducibility-notes"
---

# Data Snapshot and Metric Definitions: 7.5 Reproducibility Notes

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/07-data-snapshot-and-metric-definitions#7-5-reproducibility-notes

## Extracted Section Draft

## 7.5 Reproducibility Notes

- Analysis window: first deposit timestamp (`29/12/2025 11:49:29`) through the referenced dashboard snapshot (`20:48:23` data cut used in this case study).
- Daily-series source: same case-study source set listed in Section 7.1 (`../16_data.md` plus the provided SYMM dashboard screenshots).
- Annualization convention: compute average per-day yield over the window, then annualize with `avgYield_year = avgYield_day * 365` (no compounding adjustment).
