#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = searchBookRoot;

const requiredTables = [
  "search_book_questions",
  "search_book_ratings",
  "search_book_gaps",
  "search_book_answer_cache",
];

const defaults = {
  dbPath: process.env.SEARCH_BOOK_ANSWER_ENGINE_DB || path.join(repoRoot, "server", "data", "search-book-answer-engine.sqlite"),
  out: "",
  manifest: "",
  restoreCheck: true,
  dryRun: false,
};

function usage() {
  return `Usage:
  node src/search-book/scripts/backup-answer-engine-db.mjs [--db path] [--out path] [--manifest path] [--no-restore-check] [--dry-run]

Environment:
  SEARCH_BOOK_ANSWER_ENGINE_DB=/path/to/search-book-answer-engine.sqlite

Notes:
  Creates a SQLite-consistent backup with VACUUM INTO.
  The backup and manifest are internal operational artifacts; do not commit production DB files.`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--db") args.dbPath = path.resolve(argv[++index] || "");
    else if (arg === "--out") args.out = path.resolve(argv[++index] || "");
    else if (arg === "--manifest") args.manifest = path.resolve(argv[++index] || "");
    else if (arg === "--no-restore-check") args.restoreCheck = false;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--help") {
      console.log(usage());
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.dbPath) throw new Error("--db is required or SEARCH_BOOK_ANSWER_ENGINE_DB must be set.");
  if (!args.out) {
    const stamp = new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");
    args.out = path.join(path.dirname(args.dbPath), "backups", `search-book-answer-engine-${stamp}.sqlite`);
  }
  if (!args.manifest) args.manifest = `${args.out}.manifest.json`;
  return args;
}

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function sqliteStringLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function tablePresence(db) {
  const present = new Set(db.prepare(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (${requiredTables.map(() => "?").join(", ")})`,
  ).all(...requiredTables).map((row) => row.name));
  return {
    present: [...present].sort(),
    missing: requiredTables.filter((table) => !present.has(table)),
  };
}

function assertSchema(db, label) {
  const presence = tablePresence(db);
  if (presence.missing.length) {
    throw new Error(`${label} is missing required Search Book tables: ${presence.missing.join(", ")}`);
  }
}

function tableCounts(db) {
  return Object.fromEntries(requiredTables.map((table) => [
    table,
    db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count,
  ]));
}

function pragmaValue(db, name) {
  const row = db.prepare(`PRAGMA ${name}`).get();
  return row ? Object.values(row)[0] : null;
}

function integrityCheck(db) {
  const row = db.prepare("PRAGMA integrity_check").get();
  return row ? Object.values(row)[0] : "";
}

function collectStats(db, label) {
  assertSchema(db, label);
  return {
    tables: tableCounts(db),
    pageCount: pragmaValue(db, "page_count"),
    pageSize: pragmaValue(db, "page_size"),
    journalMode: pragmaValue(db, "journal_mode"),
  };
}

function compareCounts(sourceCounts, backupCounts) {
  return Object.fromEntries(requiredTables.map((table) => [
    table,
    {
      source: sourceCounts[table],
      backup: backupCounts[table],
      matched: sourceCounts[table] === backupCounts[table],
    },
  ]));
}

function backupDatabase(args) {
  if (!fs.existsSync(args.dbPath)) {
    throw new Error(`Search Book answer-engine database not found at ${args.dbPath}.`);
  }
  if (fs.existsSync(args.out)) {
    throw new Error(`Backup output already exists at ${args.out}. Choose a new --out path.`);
  }
  if (fs.existsSync(args.manifest)) {
    throw new Error(`Manifest output already exists at ${args.manifest}. Choose a new --manifest path.`);
  }

  const sourceSizeBytes = fs.statSync(args.dbPath).size;
  const sourceDb = new DatabaseSync(args.dbPath, { readOnly: true });
  let sourceStats;
  try {
    sourceStats = collectStats(sourceDb, "Source database");
    if (!args.dryRun) {
      ensureParent(args.out);
      sourceDb.exec(`VACUUM INTO ${sqliteStringLiteral(args.out)}`);
    }
  } finally {
    sourceDb.close();
  }

  if (args.dryRun) {
    return {
      service: "search-book-answer-engine-backup",
      status: "dry-run",
      sourceDb: args.dbPath,
      backupPath: args.out,
      manifestPath: args.manifest,
      sourceSizeBytes,
      source: sourceStats,
    };
  }

  const backupSizeBytes = fs.statSync(args.out).size;
  const manifest = {
    service: "search-book-answer-engine-backup",
    status: "passed",
    generatedAt: new Date().toISOString(),
    sourceDb: args.dbPath,
    backupPath: args.out,
    manifestPath: args.manifest,
    sourceSizeBytes,
    backupSizeBytes,
    backupSha256: sha256File(args.out),
    source: sourceStats,
    restoreCheck: {
      enabled: args.restoreCheck,
      status: args.restoreCheck ? "pending" : "skipped",
    },
    boundary: "Internal operational artifact. Do not commit production DB backups or manifests that contain production paths or raw question counts.",
  };

  if (args.restoreCheck) {
    const backupDb = new DatabaseSync(args.out, { readOnly: true });
    try {
      const backupStats = collectStats(backupDb, "Backup database");
      const integrity = integrityCheck(backupDb);
      const tableComparisons = compareCounts(sourceStats.tables, backupStats.tables);
      const countsMatched = Object.values(tableComparisons).every((item) => item.matched);
      manifest.restoreCheck = {
        enabled: true,
        status: integrity === "ok" && countsMatched ? "passed" : "failed",
        integrity,
        tables: tableComparisons,
        backup: backupStats,
      };
      if (manifest.restoreCheck.status !== "passed") {
        throw new Error(`Restore check failed for ${args.out}.`);
      }
    } finally {
      backupDb.close();
    }
  }

  ensureParent(args.manifest);
  fs.writeFileSync(args.manifest, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = backupDatabase(args);
  console.log(JSON.stringify(result, null, 2));
}

main();
