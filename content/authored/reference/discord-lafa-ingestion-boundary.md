---
id: "authored-discord-lafa-ingestion-boundary"
title: "Discord Lafa Ingestion Boundary"
section: "answer-engine"
track: "Living Docs"
status: "published"
sourceKeys: ["discord-ingestion-contract", "spec-04", "spec-06", "spec-07"]
sourceUrls: ["data/discord-corpus.json", "_specs/app-docs/04-sources.md", "_specs/app-docs/06-answer-engine.md", "_specs/app-docs/07-research-session.md"]
relatedGeneratedPages: ["authored-dashboard-faq", "authored-search-insights-loop", "authored-volume-08-dashboard-faq-and-living-docs"]
---

# Discord Lafa Ingestion Boundary

Discord is a required demand signal for the Search Book, and the v1 source-ingestion step is now complete. Operator reconciliation marks Discord export/access as provided, the readable export was imported, and `data/discord-corpus.json` records `5,000` imported messages, `723` question clusters, and `837` configured Lafa answer candidates.

That does not make raw Discord text public copy. The committed corpus runs in `internal-only` mode: raw message content, normalized question text, Lafa answer excerpts, and related-question text are redacted from checked-in data. The system can use hashes, counts, timestamps, message ids, channel ids, and seeded-topic matches for review planning, while it must still refuse questions that ask what Lafa said in Discord until an editor approves a paraphrase and maps it to authored pages.

## Ingestion Path

The import tool is `scripts/build-discord-corpus.mjs`. It can:

- write a deterministic parked corpus report when no export is present;
- ingest JSON or JSONL exports shaped like Discord API messages, DiscordChatExporter-style `messages[]`, or channel objects with `messages[]`;
- fetch from Discord REST v10 when `SEARCH_BOOK_DISCORD_BOT_TOKEN` or `DISCORD_BOT_TOKEN` and channel ids are supplied;
- normalize message ids, channels, authors, timestamps, replies, question candidates, and Lafa-answer candidates;
- omit message text by default unless the operator has approved a citation/paraphrase mode or the run explicitly stores content.

The checked-in output is `data/discord-corpus.json`. It records import readiness, API scraper readiness, imported-message counts, question clusters, Lafa-answer candidates, missing operator inputs, and seeded topics from `QUESTIONS.md`. For actual editorial review, the raw export is handled only in local `/tmp` packets:

- `npm run search-book:discord-review` writes internal reviewer JSON/Markdown with raw excerpts outside the repo.
- `npm run search-book:discord-route-review` reads that packet, routes each raw question through the extractive answer runtime, and writes a sanitized routing report with item ids, hashes, statuses, page ids, and source keys only.

## Publication Boundary

The docs should not quote Discord, paraphrase Lafa, or promote Discord-derived FAQ entries until three inputs are present:

1. the relevant export or API scrape is imported;
2. a reliable Lafa author id map is used, not only a name match;
3. an editor approves a public-use decision for the specific claim: paraphrase into an authored page, keep as internal demand signal, or exclude.

In `internal-only` mode, generated artifacts must not store message text in committed public files. Message counts, hashes, and routing metadata can still guide internal gap planning.

## Reader Implication

When readers ask which Discord answers are authoritative, the answer is still a refusal until that specific answer has been reviewed and paraphrased into sourced Search Book prose. The current source-backed answer is about process: Discord has entered Search Book as a text-redacted demand signal, then reviewed question clusters and approved Lafa answers can seed FAQ routes, answer-validation fixtures, gap priority, and living-docs improvements.

## Sources

- `discord-ingestion-contract`: generated Discord import contract and scraper status.
- `spec-04`: source requirement naming Symmio Discord and Lafa answers.
- `spec-06`: answer-engine and living-docs loop requirement.
- `spec-07`: research-session requirement to mine Discord.

## Related Pages

- `authored-dashboard-faq`
- `authored-search-insights-loop`
- `authored-volume-08-dashboard-faq-and-living-docs`
