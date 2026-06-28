#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  contentDir: path.join(searchBookRoot, "content", "authored"),
  outJson: path.join(searchBookRoot, "data", "authored-pages.json"),
  outJs: path.join(searchBookRoot, "data", "authored-pages.js"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--content-dir") args.contentDir = argv[++index];
    else if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node src/search-book/scripts/build-authored-index.mjs [--content-dir src/search-book/content/authored]");
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

function listMarkdownFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath];
    return [];
  });
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return JSON.parse(trimmed);
  }
  return trimmed.replace(/^"|"$/g, "");
}

function parseFrontmatter(markdown, filePath) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter: ${filePath}`);
  const data = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const splitAt = line.indexOf(":");
    if (splitAt === -1) throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    const key = line.slice(0, splitAt).trim();
    const value = line.slice(splitAt + 1).trim();
    data[key] = parseScalar(value);
  }
  return { data, body: match[2].trim() };
}

function stripMarkdown(markdown) {
  return String(markdown || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\|/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function toPage(filePath, args) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(markdown, filePath);
  const relativePath = path.relative(searchBookRoot, filePath).split(path.sep).join("/");
  for (const key of ["id", "title", "section", "track", "status"]) {
    if (!data[key]) throw new Error(`Missing ${key} in ${filePath}`);
  }
  return {
    id: data.id,
    title: data.title,
    section: data.section,
    track: data.track,
    granularity: "authored-page",
    status: data.status,
    sourceKeys: data.sourceKeys || [],
    sourceUrls: data.sourceUrls || [],
    relatedGeneratedPages: data.relatedGeneratedPages || [],
    file: relativePath,
    bodyMarkdown: body,
    excerpt: stripMarkdown(body).slice(0, 1200),
  };
}

const args = parseArgs(process.argv.slice(2));
const pages = listMarkdownFiles(args.contentDir)
  .map((filePath) => toPage(filePath, args))
  .sort((a, b) => a.id.localeCompare(b.id));

const duplicateIds = pages.map((page) => page.id).filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateIds.length) throw new Error(`Duplicate authored page ids: ${[...new Set(duplicateIds)].join(", ")}`);

const payload = {
  generatedAt: "deterministic-build",
  totalPages: pages.length,
  byStatus: countBy(pages, (page) => page.status),
  bySection: countBy(pages, (page) => page.section),
  pages,
};

ensureDir(path.dirname(args.outJson));
fs.writeFileSync(args.outJson, `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(args.outJs, `window.SearchBookAuthored = ${JSON.stringify(payload)};\n`);
console.log(JSON.stringify({ pages: payload.totalPages, sections: payload.bySection }, null, 2));
