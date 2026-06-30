#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const defaults = {
  dbPath: process.env.SEARCH_BOOK_ANSWER_ENGINE_DB || path.join(repoRoot, "server", "data", "search-book-answer-engine.sqlite"),
  format: "markdown",
  limit: 20,
  sinceDays: 0,
  out: "",
};

const requiredTables = ["search_book_questions", "search_book_ratings", "search_book_gaps"];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--db") args.dbPath = path.resolve(argv[++index] || "");
    else if (arg === "--format") args.format = argv[++index] || "";
    else if (arg === "--limit") args.limit = Number(argv[++index]);
    else if (arg === "--since-days") args.sinceDays = Number(argv[++index]);
    else if (arg === "--out") args.out = path.resolve(argv[++index] || "");
    else if (arg === "--help") {
      console.log(`Usage:
  node src/search-book/scripts/summarize-living-docs-gaps.mjs [--db path] [--format json|markdown] [--limit 20] [--since-days 7] [--out path]

Environment:
  SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite

Notes:
  Reads the standalone Search Book answer-engine SQLite database directly.
  Output includes raw user questions and should stay internal to reviewers.`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.dbPath) throw new Error("--db is required or SEARCH_BOOK_ANSWER_ENGINE_DB must be set.");
  if (!["json", "markdown"].includes(args.format)) throw new Error("--format must be json or markdown.");
  if (!Number.isFinite(args.limit) || args.limit < 1) throw new Error("--limit must be a positive number.");
  if (!Number.isFinite(args.sinceDays) || args.sinceDays < 0) throw new Error("--since-days must be a non-negative number.");
  args.limit = Math.min(Math.trunc(args.limit), 200);
  args.sinceDays = Math.trunc(args.sinceDays);
  return args;
}

function rows(db, sql, ...params) {
  return db.prepare(sql).all(...params);
}

function parseJsonColumn(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function compactList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function flattenOperatorItemIds(values) {
  const ids = [];
  for (const value of String(values || "").match(/\[[^\]]*\]/g) || []) {
    const parsed = parseJsonColumn(value, []);
    for (const id of parsed) {
      if (Number.isInteger(id)) ids.push(id);
    }
  }
  return unique(ids).map(Number);
}

function sinceCutoffIso(sinceDays) {
  if (!sinceDays) return "";
  return new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();
}

function dateFilter(column, cutoff) {
  return cutoff ? `WHERE ${column} >= ?` : "";
}

function filterParams(cutoff) {
  return cutoff ? [cutoff] : [];
}

function assertDatabaseReady(dbPath, db) {
  const present = new Set(rows(
    db,
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (${requiredTables.map(() => "?").join(", ")})`,
    ...requiredTables,
  ).map((item) => item.name));
  const missing = requiredTables.filter((table) => !present.has(table));
  if (missing.length) {
    throw new Error(`Search Book answer-engine database is missing required tables: ${missing.join(", ")}`);
  }
}

function questionSamples(db, gap, cutoff) {
  const params = [gap.reason, gap.pageId, gap.gapId];
  const cutoffClause = cutoff ? "AND created_at >= ?" : "";
  if (cutoff) params.push(cutoff);
  return rows(
    db,
    `
      SELECT query
      FROM search_book_gaps
      WHERE reason = ?
        AND page_id = ?
        AND gap_id = ?
        ${cutoffClause}
      ORDER BY created_at DESC
      LIMIT 3
    `,
    ...params,
  ).map((item) => item.query);
}

function buildSummary(db, args) {
  const cutoff = sinceCutoffIso(args.sinceDays);
  const countFilter = dateFilter("created_at", cutoff);
  const countParams = filterParams(cutoff);
  const totals = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM search_book_questions ${countFilter}) AS questions,
      (SELECT COUNT(*) FROM search_book_ratings ${countFilter}) AS ratings,
      (SELECT COUNT(*) FROM search_book_gaps ${countFilter}) AS gaps
  `).get(...countParams, ...countParams, ...countParams);

  const byQuestionStatus = Object.fromEntries(rows(
    db,
    `SELECT status, COUNT(*) AS count FROM search_book_questions ${countFilter} GROUP BY status`,
    ...countParams,
  ).map((row) => [row.status, row.count]));
  const byRating = Object.fromEntries(rows(
    db,
    `SELECT rating, COUNT(*) AS count FROM search_book_ratings ${countFilter} GROUP BY rating`,
    ...countParams,
  ).map((row) => [row.rating, row.count]));
  const byGapReason = Object.fromEntries(rows(
    db,
    `SELECT reason, COUNT(*) AS count FROM search_book_gaps ${countFilter} GROUP BY reason`,
    ...countParams,
  ).map((row) => [row.reason, row.count]));

  const gapWhere = cutoff ? "WHERE created_at >= ?" : "";
  const gapBacklog = rows(
    db,
    `
      SELECT
        reason,
        page_id AS pageId,
        page_title AS pageTitle,
        gap_id AS gapId,
        COUNT(*) AS count,
        MAX(created_at) AS latestCreatedAt,
        GROUP_CONCAT(DISTINCT source) AS sources,
        GROUP_CONCAT(DISTINCT rating) AS ratings,
        GROUP_CONCAT(DISTINCT operator_item_ids_json) AS operatorItemIdsJson
      FROM search_book_gaps
      ${gapWhere}
      GROUP BY reason, page_id, page_title, gap_id
      ORDER BY count DESC, latestCreatedAt DESC
      LIMIT ?
    `,
    ...filterParams(cutoff),
    args.limit,
  ).map((item) => ({
    reason: item.reason,
    pageId: item.pageId,
    pageTitle: item.pageTitle,
    gapId: item.gapId,
    count: item.count,
    latestCreatedAt: item.latestCreatedAt,
    sources: compactList(item.sources),
    ratings: compactList(item.ratings),
    operatorItemIds: flattenOperatorItemIds(item.operatorItemIdsJson),
    querySamples: questionSamples(db, item, cutoff),
  }));

  const lowRatedWhere = cutoff ? "AND r.created_at >= ?" : "";
  const lowRatedAnswers = rows(
    db,
    `
      SELECT
        r.id,
        r.event_id AS eventId,
        r.rating,
        r.query,
        r.page_id AS pageId,
        r.page_title AS pageTitle,
        r.note,
        r.created_at AS createdAt,
        q.request_id AS requestId,
        q.status AS answerStatus,
        q.confidence,
        q.refusal_reason AS refusalReason
      FROM search_book_ratings r
      LEFT JOIN search_book_questions q ON q.id = r.event_id
      WHERE r.rating IN ('no', 'not-useful')
        ${lowRatedWhere}
      ORDER BY r.created_at DESC
      LIMIT ?
    `,
    ...filterParams(cutoff),
    args.limit,
  ).map((item) => ({
    id: item.id,
    eventId: item.eventId,
    requestId: item.requestId || "",
    rating: item.rating,
    query: item.query,
    pageId: item.pageId,
    pageTitle: item.pageTitle,
    note: item.note,
    answerStatus: item.answerStatus || "",
    confidence: item.confidence || "",
    refusalReason: item.refusalReason || "",
    createdAt: item.createdAt,
  }));

  const unansweredWhere = cutoff ? "AND created_at >= ?" : "";
  const unansweredQuestions = rows(
    db,
    `
      SELECT
        id,
        request_id AS requestId,
        query,
        source,
        mode,
        status,
        page_id AS pageId,
        page_title AS pageTitle,
        confidence,
        refusal_reason AS refusalReason,
        gap_id AS gapId,
        operator_item_ids_json AS operatorItemIdsJson,
        created_at AS createdAt
      FROM search_book_questions
      WHERE status != 'answered'
        ${unansweredWhere}
      ORDER BY created_at DESC
      LIMIT ?
    `,
    ...filterParams(cutoff),
    args.limit,
  ).map((item) => ({
    id: item.id,
    requestId: item.requestId,
    query: item.query,
    source: item.source,
    mode: item.mode,
    status: item.status,
    pageId: item.pageId,
    pageTitle: item.pageTitle,
    confidence: item.confidence,
    refusalReason: item.refusalReason,
    gapId: item.gapId,
    operatorItemIds: parseJsonColumn(item.operatorItemIdsJson, []),
    createdAt: item.createdAt,
  }));

  const repeatedWhere = cutoff ? "WHERE created_at >= ?" : "";
  const repeatedQuestions = rows(
    db,
    `
      SELECT
        LOWER(TRIM(query)) AS normalizedQuery,
        MIN(query) AS query,
        COUNT(*) AS count,
        MAX(created_at) AS latestCreatedAt
      FROM search_book_questions
      ${repeatedWhere}
      GROUP BY LOWER(TRIM(query))
      HAVING count > 1
      ORDER BY count DESC, latestCreatedAt DESC
      LIMIT ?
    `,
    ...filterParams(cutoff),
    args.limit,
  ).map((item) => ({
    normalizedQuery: item.normalizedQuery,
    query: item.query,
    count: item.count,
    latestCreatedAt: item.latestCreatedAt,
  }));

  const recommendations = gapBacklog.slice(0, 10).map((gap) => ({
    priority: gap.count >= 5 ? "high" : gap.count >= 2 ? "medium" : "normal",
    action: actionForGap(gap),
    reason: gap.reason,
    count: gap.count,
    pageId: gap.pageId,
    pageTitle: gap.pageTitle,
    gapId: gap.gapId,
    operatorItemIds: gap.operatorItemIds,
  }));

  return {
    status: "ok",
    service: "search-book-living-docs-summary",
    generatedAt: new Date().toISOString(),
    database: {
      path: args.dbPath,
      adapter: "node:sqlite",
    },
    window: {
      sinceDays: args.sinceDays,
      cutoff,
      limit: args.limit,
    },
    privacy: {
      includesRawUserQuestions: true,
      publishBoundary: "Internal reviewer artifact only. Do not publish raw questions, notes, or moderation exports without an approved privacy review.",
    },
    totals,
    byQuestionStatus,
    byRating,
    byGapReason,
    queues: {
      gapBacklog,
      lowRatedAnswers,
      unansweredQuestions,
      repeatedQuestions,
    },
    recommendations,
  };
}

function actionForGap(gap) {
  if (gap.operatorItemIds.length) return "Keep parked in OPERATOR-INBOX until the operator resolves the linked item, then rerun answer validation.";
  if (gap.reason === "low-rated-answer") return "Review the cited answer and patch the linked page, route, or retrieval chunk.";
  if (gap.reason === "no-grounded-page") return "Create or route a grounded page, then add the question to the eval set.";
  if (gap.reason === "citation-validation-failed") return "Inspect citations and source keys before changing prompt/runtime behavior.";
  if (gap.reason === "page-feedback-needs-work") return "Review the linked page for clarity, source coverage, and answerability.";
  return "Review the question samples and decide whether to update content, routing, source coverage, or operator inbox state.";
}

function renderMarkdown(summary) {
  const lines = [
    "# Search Book Living Docs Gap Summary",
    "",
    `Generated: ${summary.generatedAt}`,
    `Window: ${summary.window.sinceDays ? `${summary.window.sinceDays} day(s)` : "all time"}`,
    "",
    "> Internal reviewer artifact. It includes raw user questions and notes; do not publish without an approved privacy review.",
    "",
    "## Totals",
    "",
    `- Questions: ${summary.totals.questions}`,
    `- Ratings: ${summary.totals.ratings}`,
    `- Gaps: ${summary.totals.gaps}`,
    "",
    "## Gap Backlog",
    "",
  ];
  if (!summary.queues.gapBacklog.length) {
    lines.push("- No gap backlog entries in this window.");
  } else {
    for (const gap of summary.queues.gapBacklog) {
      lines.push(`- ${gap.count}x ${gap.reason}${gap.pageId ? ` on ${gap.pageId}` : ""}${gap.gapId ? ` (${gap.gapId})` : ""}`);
      if (gap.operatorItemIds.length) lines.push(`  Operator items: ${gap.operatorItemIds.map((id) => `#${id}`).join(", ")}`);
      if (gap.querySamples.length) lines.push(`  Samples: ${gap.querySamples.map((query) => `"${query}"`).join("; ")}`);
    }
  }
  lines.push("", "## Low-Rated Answers", "");
  if (!summary.queues.lowRatedAnswers.length) {
    lines.push("- No low-rated answers in this window.");
  } else {
    for (const item of summary.queues.lowRatedAnswers) {
      lines.push(`- ${item.rating}: "${item.query}"${item.pageId ? ` -> ${item.pageId}` : ""}${item.note ? `; note: ${item.note}` : ""}`);
    }
  }
  lines.push("", "## Unanswered Or Refused Questions", "");
  if (!summary.queues.unansweredQuestions.length) {
    lines.push("- No unanswered/refused questions in this window.");
  } else {
    for (const item of summary.queues.unansweredQuestions) {
      lines.push(`- ${item.status}: "${item.query}"${item.refusalReason ? ` (${item.refusalReason})` : ""}`);
    }
  }
  lines.push("", "## Repeated Questions", "");
  if (!summary.queues.repeatedQuestions.length) {
    lines.push("- No repeated questions in this window.");
  } else {
    for (const item of summary.queues.repeatedQuestions) {
      lines.push(`- ${item.count}x "${item.query}"`);
    }
  }
  lines.push("", "## Recommended Reviewer Actions", "");
  if (!summary.recommendations.length) {
    lines.push("- No reviewer actions generated for this window.");
  } else {
    for (const item of summary.recommendations) {
      lines.push(`- [${item.priority}] ${item.action}${item.pageId ? ` (${item.pageId})` : ""}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

function writeOutput(text, outPath) {
  if (!outPath) {
    process.stdout.write(text);
    return;
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, text);
}

const args = parseArgs(process.argv.slice(2));
if (!fs.existsSync(args.dbPath)) {
  throw new Error(`Search Book answer-engine database not found at ${args.dbPath}. Set SEARCH_BOOK_ANSWER_ENGINE_DB or pass --db.`);
}
const db = new DatabaseSync(args.dbPath, { readOnly: true });
assertDatabaseReady(args.dbPath, db);
const summary = buildSummary(db, args);
const output = args.format === "json" ? `${JSON.stringify(summary, null, 2)}\n` : renderMarkdown(summary);
db.close();
writeOutput(output, args.out);
