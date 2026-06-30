---
id: "authored-discord-lafa-ingestion-boundary"
title: "Discord Lafa Ingestion Boundary"
section: "answer-engine"
track: "Living Docs"
status: "published"
sourceKeys: ["discord-ingestion-contract", "spec-04", "spec-06", "spec-07"]
sourceUrls: ["src/search-book/data/discord-corpus.json", "_specs/app-docs/04-sources.md", "_specs/app-docs/06-answer-engine.md", "_specs/app-docs/07-research-session.md"]
relatedGeneratedPages: ["authored-dashboard-faq", "authored-search-insights-loop", "authored-volume-08-dashboard-faq-and-living-docs"]
---

# Discord Lafa Ingestion Boundary

Discord is a required demand signal for the Search Book, but it is not yet a source corpus. The current repository now has an ingestion contract and scraper path; it does not have the operator-approved Discord export, Lafa author identity map, or publication boundary needed to publish Discord-derived answers.

That distinction keeps the answer engine honest. The system can seed a local FAQ from product code, public docs, Linear research, and tracked questions. It must still refuse questions that ask what Lafa said in Discord until a real export or API scrape is imported and reviewed.

## Ingestion Path

The import tool is `src/search-book/scripts/build-discord-corpus.mjs`. It can:

- write a deterministic parked corpus report when no export is present;
- ingest JSON or JSONL exports shaped like Discord API messages, DiscordChatExporter-style `messages[]`, or channel objects with `messages[]`;
- fetch from Discord REST v10 when `SEARCH_BOOK_DISCORD_BOT_TOKEN` or `DISCORD_BOT_TOKEN` and channel ids are supplied;
- normalize message ids, channels, authors, timestamps, replies, question candidates, and Lafa-answer candidates;
- omit message text by default unless the operator has approved a citation/paraphrase mode or the run explicitly stores content.

The output is `src/search-book/data/discord-corpus.json`. It records import readiness, API scraper readiness, imported-message counts, question clusters, Lafa-answer candidates, missing operator inputs, and seeded topics from `QUESTIONS.md`.

## Publication Boundary

The docs should not quote Discord, paraphrase Lafa, or promote Discord-derived FAQ entries until three inputs are present:

1. channel access or an export for the relevant Symmio/Vibe Discord channels;
2. a reliable Lafa author id map, not only a name match;
3. an operator-approved public-use mode: cite, paraphrase, internal-only, or exclude.

If the publication mode is unknown or internal-only, generated artifacts should not store message text in committed public files. Message counts and cluster metadata can still guide internal gap planning.

## Reader Implication

When readers ask which Discord answers are authoritative, the answer is still a refusal. The current source-backed answer is about process: Discord will enter Search Book through a reviewed import path, then question clusters and approved Lafa answers can seed FAQ routes, answer-validation fixtures, gap priority, and living-docs improvements.

## Sources

- `discord-ingestion-contract`: generated Discord import contract and scraper status.
- `spec-04`: source requirement naming Symmio Discord and Lafa answers.
- `spec-06`: answer-engine and living-docs loop requirement.
- `spec-07`: research-session requirement to mine Discord.

## Related Pages

- `authored-dashboard-faq`
- `authored-search-insights-loop`
- `authored-volume-08-dashboard-faq-and-living-docs`
