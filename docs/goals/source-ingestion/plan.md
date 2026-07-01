# Plan: Source Ingestion Final Mile

Target repo: `/home/tabor/apps/symmio-search-book`.

Do not edit the frozen legacy tree at `/home/tabor/projects/onboarding-app/src/search-book`.

## 1. Check The Current Ledger

Before work:

```sh
sed -n '1,120p' _specs/app-docs/OPERATOR-INBOX.md
node -e 'const s=require("./data/source-ingestion.json"); const d=require("./data/discord-corpus.json"); console.log({source:s.byStatus, sourceReady:s.sourceCompletionReady, discord:{status:d.status, corpusReady:d.corpusReady, messages:d.totals?.importedMessages}})'
git status --short
```

Expected before Discord import:

- Source ingestion: 16 complete, 1 parked.
- Discord corpus: parked unreadable export, 0 messages.
- Open items: #17, #11, #4.

## 2. Import Discord When #17 Is Resolved

When the operator provides a readable copy or releases the file lock:

1. Put the readable export in a gitignored local path or pass it through the existing importer configuration.
2. Run `scripts/build-discord-corpus.mjs` against the real export.
3. Review generated `data/discord-corpus.json` counts, question clusters, and Lafa answer candidates.
4. Keep private/community text within the approved public-use boundary; do not publish private or identity-sensitive content as static copy.
5. Rebuild:

```sh
npm run search-book:verify
node scripts/check-readiness-evidence.mjs
git diff --check
```

## 3. Fold Safe Discord Demand Into The Product

After import, update only launch-safe surfaces:

- FAQ/question seeds in `QUESTIONS.md` or generated route inputs where the corpus supports them.
- Gap queue wording for repeated unresolved community questions.
- Authored boundary pages if a repeated question needs a public explainer.

Do not use Discord content to answer unsupported protocol, financial, secret, or private-roadmap questions.

## 4. Close The Source Follow-Up

When source ingestion reaches 17/17:

- Move OPERATOR-INBOX #17 to resolved with the import path, message counts, and verification command.
- Update `GAPS.md`, `PROGRESS.md`, `FINAL-REPORT.md`, and `_local/agent-worklog.md`.
- Commit a scoped checkpoint.
- Update SYN-289 with before/after counts and verification output.

## Still Out Of Scope

- Production VPS env install (#11).
- Public deploy route/platform decision (#4).
- Reopening #2, #5, #6, #7, or #12.
