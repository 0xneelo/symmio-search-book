#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  sourceRegistry: path.join(searchBookRoot, "SOURCES.md"),
  outJson: path.join(searchBookRoot, "data", "source-catalog.json"),
  outJs: path.join(searchBookRoot, "data", "source-catalog.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-source-catalog.mjs [--out-json path] [--out-js path]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function stripInlineMarkdown(value) {
  return String(value || "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .trim();
}

function parseRow(line) {
  const cells = line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
  if (cells.length < 3 || cells[0] === "Key" || /^-+$/.test(cells[0])) return null;
  const key = cells[0].match(/`([^`]+)`/)?.[1];
  if (!key) return null;
  return {
    key,
    source: stripInlineMarkdown(cells[1]),
    use: stripInlineMarkdown(cells.slice(2).join(" | ")),
  };
}

function sourceKind(source) {
  if (/^https?:\/\//i.test(source)) return "public-url";
  if (/^Linear issue\b/i.test(source)) return "linear";
  if (/^\//.test(source)) return "absolute-local";
  if (/[*]/.test(source)) return "repo-pattern";
  if (/^(_specs|src|server|docs|_local|README|DESIGN|STYLEGUIDE|CLAUDE_MAX)\b/.test(source)) return "repo-local";
  return "note";
}

function hrefFor(source, kind) {
  if (kind === "public-url") return source;
  if (kind === "absolute-local") return source;
  if (kind === "repo-local") return `../../${source}`;
  return "";
}

function parseSources(markdown) {
  let group = "Ungrouped";
  const rows = [];
  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      group = heading[1].trim();
      continue;
    }
    if (!line.startsWith("|")) continue;
    const row = parseRow(line);
    if (!row) continue;
    const kind = sourceKind(row.source);
    rows.push({
      ...row,
      group,
      kind,
      href: hrefFor(row.source, kind),
    });
  }
  return rows;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const args = parseArgs(process.argv.slice(2));
const registryMarkdown = fs.readFileSync(args.sourceRegistry, "utf8");
const sources = parseSources(registryMarkdown).sort((a, b) => a.key.localeCompare(b.key));
const duplicateKeys = sources.map((source) => source.key).filter((key, index, keys) => keys.indexOf(key) !== index);
if (duplicateKeys.length) throw new Error(`Duplicate source keys: ${[...new Set(duplicateKeys)].join(", ")}`);

const sourceByKey = Object.fromEntries(sources.map((source) => [source.key, source]));
const payload = {
  generatedAt: "deterministic-build",
  sourceFile: "SOURCES.md",
  totalSources: sources.length,
  byGroup: countBy(sources, (source) => source.group),
  byKind: countBy(sources, (source) => source.kind),
  duplicateKeys: [],
  sources,
  sourceByKey,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookSourceCatalog = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ sources: payload.totalSources, groups: Object.keys(payload.byGroup).length, linked: sources.filter((source) => source.href).length }, null, 2));
