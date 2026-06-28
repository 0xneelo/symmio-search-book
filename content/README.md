# Generated Content Corpus

`content/generated/` is mechanically generated from `page-manifest.json`.

It is useful because it gives every planned compendium page a concrete, source-traceable draft file:

- `source-page/`: Neelo source pages imported from primary markdown when available.
- `section-page/`: standalone section pages extracted from Neelo H2 headings.
- `companion-page/`: source-mapped pages for Vibe, Symmio, dashboard, Linear, and competitive references.

These files are not the final editorial pass. Treat statuses in each page frontmatter as authoritative:

- `draft-imported-from-primary-source`: imported source draft, needs restructuring and cross-links.
- `draft-extracted-from-primary-source`: extracted section draft, needs restructuring and cross-links.
- `draft-imported-from-generated-html`: fallback from generated site HTML because markdown was not present in the local clone.
- `source-mapped`: companion page mapped to primary sources, needs authoring.
- `needs-reconciliation`: companion page blocked by an operator-inbox decision or contradiction.

Regenerate with:

```sh
node src/search-book/scripts/build-content-corpus.mjs --docs-root /tmp/vibe_docs/Docs/public --docs-data /tmp/vibe_docs/Website/public/generated/docs-data.json
```
