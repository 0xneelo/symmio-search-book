# Execution Protocol

Use this for the remaining source-ingestion follow-up.

## Coordination

1. Read `_local/agent-worklog.md`, `_specs/app-docs/OPERATOR-INBOX.md`, and `git status --short`.
2. Work only in `/home/tabor/apps/symmio-search-book`.
3. Do not edit `/home/tabor/projects/onboarding-app/src/search-book`.
4. Do not reopen resolved operator items #2, #5, #6, #7, or #12.
5. If a new issue appears after actually running the importer, create a new scoped inbox entry instead of changing old resolved entries.

## Linear

Current tracking:

- SYN-289: readable Discord export file release (#17).
- SYN-281: production VPS env install (#11).
- SYN-285: public frontend platform/repo/deploy route (#4).

For a new source-import subtask, file or update a Linear child under SYN-209, add the relevant search-book labels, and leave a short status comment with:

- files touched,
- before/after generated counts,
- verification commands,
- any remaining operator item number.

## Commit Cadence

Commit after each coherent verified slice. Stage only the files touched for that slice. Do not include secrets, local exports, SQLite DBs, or unrelated WIP.

Minimum verification for docs/data-only source ingestion changes:

```sh
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
git diff --check
```

Live LLM eval is only required when runtime prompts, validation, or answer behavior changes.
