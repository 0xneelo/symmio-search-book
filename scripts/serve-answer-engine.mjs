#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { answerQuery, defaults as runtimeDefaults, loadRuntime } from "./run-llm-rag-answer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const config = {
  host: process.env.SEARCH_BOOK_ANSWER_ENGINE_HOST || "127.0.0.1",
  port: Number(process.env.SEARCH_BOOK_ANSWER_ENGINE_PORT || 8787),
  dbPath: process.env.SEARCH_BOOK_ANSWER_ENGINE_DB || path.join(repoRoot, "server", "data", "search-book-answer-engine.sqlite"),
  defaultMode: process.env.SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE || "extractive",
  maxBodyBytes: Number(process.env.SEARCH_BOOK_ANSWER_ENGINE_MAX_BODY_BYTES || 64_000),
  maxRecentEvents: Number(process.env.SEARCH_BOOK_ANSWER_ENGINE_MAX_RECENT_EVENTS || 25),
  rateLimitPerMinute: Number(process.env.SEARCH_BOOK_ANSWER_ENGINE_RATE_LIMIT_PER_MINUTE || 60),
};

const allowedModes = new Set(["extractive", "llm"]);
const allowedRatings = new Set(["yes", "no", "useful", "not-useful"]);
const rateBuckets = new Map();

function nowIso() {
  return new Date().toISOString();
}

function eventId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function truncate(value, maxLength) {
  const text = String(value || "");
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

function jsonText(value) {
  return JSON.stringify(value ?? null);
}

function jsonResponse(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(`${body}\n`);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > config.maxBodyBytes) {
        reject(Object.assign(new Error("Request body too large."), { statusCode: 413 }));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(Object.assign(new Error("Request body must be valid JSON."), { statusCode: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function openDatabase(dbPath) {
  ensureDir(dbPath);
  const db = new DatabaseSync(dbPath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS search_book_questions (
      id TEXT PRIMARY KEY,
      request_id TEXT NOT NULL,
      query TEXT NOT NULL,
      source TEXT NOT NULL,
      mode TEXT NOT NULL,
      status TEXT NOT NULL,
      page_id TEXT NOT NULL,
      page_title TEXT NOT NULL,
      confidence TEXT NOT NULL,
      refusal_reason TEXT NOT NULL,
      gap_id TEXT NOT NULL,
      operator_item_ids_json TEXT NOT NULL,
      response_json TEXT NOT NULL,
      citations_json TEXT NOT NULL,
      llm_usage_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_search_book_questions_created_at
      ON search_book_questions(created_at DESC);

    CREATE TABLE IF NOT EXISTS search_book_ratings (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      rating TEXT NOT NULL,
      query TEXT NOT NULL,
      page_id TEXT NOT NULL,
      page_title TEXT NOT NULL,
      note TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(event_id) REFERENCES search_book_questions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_search_book_ratings_created_at
      ON search_book_ratings(created_at DESC);

    CREATE TABLE IF NOT EXISTS search_book_gaps (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      query TEXT NOT NULL,
      reason TEXT NOT NULL,
      page_id TEXT NOT NULL,
      page_title TEXT NOT NULL,
      source TEXT NOT NULL,
      rating TEXT NOT NULL,
      gap_id TEXT NOT NULL,
      operator_item_ids_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_search_book_gaps_created_at
      ON search_book_gaps(created_at DESC);
  `);
  return db;
}

function pageTitleForResponse(response, context) {
  const primaryPageId = response.primaryPageId || "";
  const candidate = (context?.candidatePages || []).find((page) => page.pageId === primaryPageId);
  if (candidate?.pageTitle) return candidate.pageTitle;
  const citation = (response.citations || []).find((item) => item.pageId === primaryPageId) || (response.citations || [])[0];
  return citation?.pageTitle || "";
}

function statusForQuestionEvent(response) {
  if (response.status === "answered") return "answered";
  if (response.status === "operator-blocked-refusal") return "operator-blocked-refusal";
  if (response.refusalReason === "no-grounded-context" || response.refusalReason === "no-grounded-page") return "no-grounded-page";
  return "refused";
}

function operatorItemIdsForResponse(response) {
  const ids = response.gapEvent?.operatorItemIds || [];
  return ids.filter((id) => Number.isInteger(id));
}

function persistGap(db, gap) {
  db.prepare(`
    INSERT INTO search_book_gaps (
      id, event_id, query, reason, page_id, page_title, source, rating,
      gap_id, operator_item_ids_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    gap.id,
    gap.eventId,
    gap.query,
    gap.reason,
    gap.pageId,
    gap.pageTitle,
    gap.source,
    gap.rating,
    gap.gapId,
    jsonText(gap.operatorItemIds || []),
    gap.createdAt,
  );
}

function persistQuestion(db, request, result) {
  const response = result.response || {};
  const context = result.context || null;
  const id = eventId("question");
  const createdAt = nowIso();
  const pageTitle = pageTitleForResponse(response, context);
  const gapId = response.gapEvent?.gapId || "";
  const operatorItemIds = operatorItemIdsForResponse(response);
  const eventStatus = statusForQuestionEvent(response);

  db.prepare(`
    INSERT INTO search_book_questions (
      id, request_id, query, source, mode, status, page_id, page_title, confidence,
      refusal_reason, gap_id, operator_item_ids_json, response_json, citations_json,
      llm_usage_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    response.requestId || request.requestId,
    request.query,
    request.source,
    request.mode,
    eventStatus,
    response.primaryPageId || "",
    pageTitle,
    response.confidence || "",
    response.refusalReason || "",
    gapId,
    jsonText(operatorItemIds),
    jsonText(response),
    jsonText(response.citations || []),
    jsonText(response.llmUsage || {}),
    createdAt,
  );

  if (response.gapEvent) {
    persistGap(db, {
      id: eventId("gap"),
      eventId: id,
      query: request.query,
      reason: response.gapEvent.reason || response.refusalReason || "no-grounded-page",
      pageId: response.primaryPageId || "",
      pageTitle,
      source: request.source,
      rating: "",
      gapId,
      operatorItemIds,
      createdAt,
    });
  }

  return {
    id,
    requestId: response.requestId || request.requestId,
    status: eventStatus,
    pageId: response.primaryPageId || "",
    pageTitle,
    gapId,
    operatorItemIds,
    createdAt,
  };
}

function persistRating(db, body) {
  const eventIdValue = truncate(body.eventId, 160);
  const rating = truncate(body.rating, 32);
  if (!eventIdValue) throw Object.assign(new Error("rating requires eventId."), { statusCode: 400 });
  if (!allowedRatings.has(rating)) throw Object.assign(new Error("rating must be yes, no, useful, or not-useful."), { statusCode: 400 });

  const question = db.prepare("SELECT * FROM search_book_questions WHERE id = ?").get(eventIdValue);
  if (!question) throw Object.assign(new Error("rating eventId does not match a persisted question."), { statusCode: 404 });

  const id = eventId("rating");
  const createdAt = nowIso();
  const note = truncate(body.note, 2000);
  db.prepare(`
    INSERT INTO search_book_ratings (
      id, event_id, rating, query, page_id, page_title, note, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    question.id,
    rating,
    question.query,
    question.page_id,
    question.page_title,
    note,
    createdAt,
  );

  if (rating === "no" || rating === "not-useful") {
    persistGap(db, {
      id: eventId("gap"),
      eventId: question.id,
      query: question.query,
      reason: "low-rated-answer",
      pageId: question.page_id,
      pageTitle: question.page_title,
      source: "rating",
      rating,
      gapId: question.gap_id || "",
      operatorItemIds: JSON.parse(question.operator_item_ids_json || "[]"),
      createdAt,
    });
  }

  return {
    id,
    eventId: question.id,
    rating,
    query: question.query,
    pageId: question.page_id,
    pageTitle: question.page_title,
    createdAt,
  };
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

function insightRows(db) {
  const limit = Math.max(1, Math.min(config.maxRecentEvents, 100));
  const questions = rows(
    db,
    "SELECT * FROM search_book_questions ORDER BY created_at DESC LIMIT ?",
    limit,
  ).map((item) => ({
    id: item.id,
    requestId: item.request_id,
    query: item.query,
    source: item.source,
    mode: item.mode,
    status: item.status,
    pageId: item.page_id,
    pageTitle: item.page_title,
    confidence: item.confidence,
    refusalReason: item.refusal_reason,
    gapId: item.gap_id,
    operatorItemIds: parseJsonColumn(item.operator_item_ids_json, []),
    createdAt: item.created_at,
  }));
  const ratings = rows(
    db,
    "SELECT * FROM search_book_ratings ORDER BY created_at DESC LIMIT ?",
    limit,
  ).map((item) => ({
    id: item.id,
    eventId: item.event_id,
    rating: item.rating,
    query: item.query,
    pageId: item.page_id,
    pageTitle: item.page_title,
    note: item.note,
    createdAt: item.created_at,
  }));
  const gaps = rows(
    db,
    "SELECT * FROM search_book_gaps ORDER BY created_at DESC LIMIT ?",
    limit,
  ).map((item) => ({
    id: item.id,
    eventId: item.event_id,
    query: item.query,
    reason: item.reason,
    pageId: item.page_id,
    pageTitle: item.page_title,
    source: item.source,
    rating: item.rating,
    gapId: item.gap_id,
    operatorItemIds: parseJsonColumn(item.operator_item_ids_json, []),
    createdAt: item.created_at,
  }));
  return { questions, ratings, gaps };
}

function counts(db) {
  const byQuestionStatus = Object.fromEntries(rows(
    db,
    "SELECT status, COUNT(*) AS count FROM search_book_questions GROUP BY status",
  ).map((row) => [row.status, row.count]));
  const byRating = Object.fromEntries(rows(
    db,
    "SELECT rating, COUNT(*) AS count FROM search_book_ratings GROUP BY rating",
  ).map((row) => [row.rating, row.count]));
  const byGapReason = Object.fromEntries(rows(
    db,
    "SELECT reason, COUNT(*) AS count FROM search_book_gaps GROUP BY reason",
  ).map((row) => [row.reason, row.count]));
  const totals = db.prepare(`
    SELECT
      (SELECT COUNT(*) FROM search_book_questions) AS questions,
      (SELECT COUNT(*) FROM search_book_ratings) AS ratings,
      (SELECT COUNT(*) FROM search_book_gaps) AS gaps
  `).get();
  return { totals, byQuestionStatus, byRating, byGapReason };
}

function serviceConfigRefusal({ query, requestId, source }) {
  return {
    response: {
      requestId,
      status: "operator-blocked-refusal",
      answer: "",
      primaryPageId: "",
      citations: [],
      refusalReason: "operator-access-required",
      message: "LLM mode requires approved model credentials in the service environment. The API key was not read, printed, or persisted.",
      gapEvent: {
        id: `gap-${requestId}`,
        query,
        reason: "operator-access-required",
        page: "",
        gapId: "",
        operatorItemIds: [11],
        time: "runtime",
      },
      suggestedQueries: ["What is Vibe Trading?", "What are intents?", "What does a solver do?"],
      events: [
        {
          type: "gap-created",
          pageId: "",
          query,
          source,
          gapId: "",
          operatorItemIds: [11],
          reason: "operator-access-required",
        },
      ],
      relatedPageIds: [],
    },
    context: null,
  };
}

function checkRateLimit(req) {
  if (!config.rateLimitPerMinute) return true;
  const key = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const bucket = rateBuckets.get(key) || { windowStart: now, count: 0 };
  if (now - bucket.windowStart >= windowMs) {
    bucket.windowStart = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  rateBuckets.set(key, bucket);
  return bucket.count <= config.rateLimitPerMinute;
}

async function handleAnswer(db, runtime, req, res) {
  const body = await readJsonBody(req);
  const query = truncate(body.query, 4000).trim();
  if (!query) throw Object.assign(new Error("answer requires query."), { statusCode: 400 });
  const mode = body.mode || config.defaultMode;
  if (!allowedModes.has(mode)) throw Object.assign(new Error("mode must be extractive or llm."), { statusCode: 400 });

  const request = {
    ...runtimeDefaults,
    query,
    mode,
    requestId: truncate(body.requestId, 160) || `service-${Date.now().toString(36)}-${crypto.randomUUID()}`,
    source: truncate(body.source, 120) || "answer-engine-service",
    maxChunks: Number.isInteger(body.maxChunks) ? body.maxChunks : runtimeDefaults.maxChunks,
    maxContextWords: Number.isInteger(body.maxContextWords) ? body.maxContextWords : runtimeDefaults.maxContextWords,
  };

  let result;
  try {
    result = await answerQuery(request, runtime);
  } catch (error) {
    if (mode === "llm" && /LLM mode requires approved runtime configuration/.test(error.message || "")) {
      result = serviceConfigRefusal(request);
    } else {
      throw error;
    }
  }

  const persisted = persistQuestion(db, request, result);
  jsonResponse(res, 200, {
    ...result.response,
    persisted,
  });
}

async function handleRating(db, req, res) {
  const body = await readJsonBody(req);
  const persisted = persistRating(db, body);
  jsonResponse(res, 200, { status: "recorded", persisted });
}

function handleInsights(db, res) {
  jsonResponse(res, 200, {
    status: "ok",
    generatedAt: nowIso(),
    storage: {
      adapter: "node:sqlite",
      tables: ["search_book_questions", "search_book_ratings", "search_book_gaps"],
    },
    ...counts(db),
    recent: insightRows(db),
  });
}

function createServer() {
  if (!allowedModes.has(config.defaultMode)) {
    throw new Error("SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE must be extractive or llm.");
  }
  const db = openDatabase(config.dbPath);
  const runtime = loadRuntime(runtimeDefaults);
  return http.createServer(async (req, res) => {
    try {
      if (req.method === "OPTIONS") {
        jsonResponse(res, 204, {});
        return;
      }
      if (!checkRateLimit(req)) {
        jsonResponse(res, 429, { status: "rate-limited", message: "Too many requests." });
        return;
      }
      const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
      if (req.method === "GET" && url.pathname === "/health") {
        jsonResponse(res, 200, {
          status: "ok",
          service: "search-book-answer-engine",
          defaultMode: config.defaultMode,
          datastore: "sqlite",
          runtime: {
            answerChunks: runtime.answerChunks.totalChunks || 0,
            questionRoutes: runtime.questionRoutes.totalRoutes || 0,
            openOperatorItems: runtime.openInboxItems.length,
          },
        });
        return;
      }
      if (req.method === "POST" && url.pathname === "/api/search-book/answer") {
        await handleAnswer(db, runtime, req, res);
        return;
      }
      if (req.method === "POST" && url.pathname === "/api/search-book/rating") {
        await handleRating(db, req, res);
        return;
      }
      if (req.method === "GET" && url.pathname === "/api/search-book/insights") {
        handleInsights(db, res);
        return;
      }
      jsonResponse(res, 404, { status: "not-found" });
    } catch (error) {
      jsonResponse(res, error.statusCode || 500, {
        status: "error",
        message: error.statusCode ? error.message : "Search Book answer-engine service error.",
      });
    }
  });
}

const server = createServer();
server.on("error", (error) => {
  console.error(JSON.stringify({
    status: "error",
    service: "search-book-answer-engine",
    code: error.code || "SERVER_ERROR",
    message: "Answer-engine service failed to start.",
  }));
  process.exit(1);
});
server.listen(config.port, config.host, () => {
  console.log(JSON.stringify({
    status: "listening",
    service: "search-book-answer-engine",
    host: config.host,
    port: config.port,
    defaultMode: config.defaultMode,
    datastore: "sqlite",
  }));
});
