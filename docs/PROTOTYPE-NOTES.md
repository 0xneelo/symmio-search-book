# Prototype Notes

**Question:** Does an ask-first docs front door make the requested compendium easier to navigate than a conventional documentation sidebar alone?

**Shape:** Four top-level views plus an addressable page reader are available from one static page:

- `?variant=classic`: ask-first front door with page cards.
- `?variant=browse`: full corpus browse surface grouped from the 794-page manifest.
- `?variant=journey`: reader-journey layout for treasuries, solvers, traders, and operators.
- `?variant=insights`: operator-style research console emphasizing gaps, tracked questions, and ratings.
- `?page=<page-id>`: exact-page reader for authored pages and generated corpus previews.

**Verdict placeholder:** No winner selected yet. The likely production shape should combine the `classic` ask bar, `browse` IA, `journey` audience routing, `insights` gap ledger, and an exact page reader backed by production-grade retrieval.

**Cleanup rule:** Delete or absorb this prototype after the docs platform decision. Do not treat `index.html` as production architecture.
