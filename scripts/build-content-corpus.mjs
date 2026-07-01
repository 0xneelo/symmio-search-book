#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertCompendiumPageTarget } from "./compendium-target.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  manifest: path.join(searchBookRoot, "page-manifest.json"),
  docsRoot: process.env.VIBE_DOCS_PUBLIC || "/tmp/vibe_docs/Docs/public",
  docsData: process.env.VIBE_DOCS_DATA || "/tmp/vibe_docs/Website/public/generated/docs-data.json",
  outDir: path.join(searchBookRoot, "content", "generated"),
  indexJson: path.join(searchBookRoot, "data", "search-index.json"),
  indexJs: path.join(searchBookRoot, "data", "search-index.js"),
  stats: path.join(searchBookRoot, "data", "content-stats.json"),
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--manifest") args.manifest = argv[++index];
    else if (arg === "--docs-root") args.docsRoot = argv[++index];
    else if (arg === "--docs-data") args.docsData = argv[++index];
    else if (arg === "--out-dir") args.outDir = argv[++index];
    else if (arg === "--index-json") args.indexJson = argv[++index];
    else if (arg === "--index-js") args.indexJs = argv[++index];
    else if (arg === "--stats") args.stats = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/build-content-corpus.mjs [--docs-root /tmp/vibe_docs/Docs/public] [--docs-data /tmp/vibe_docs/Website/public/generated/docs-data.json]");
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toRelativeSourcePath(sourcePath) {
  return sourcePath.replace(/^Docs\/public\//, "");
}

function yamlString(value) {
  return JSON.stringify(String(value ?? ""));
}

function yamlArray(values) {
  if (!values || values.length === 0) return "[]";
  return `[${values.map((value) => yamlString(value)).join(", ")}]`;
}

function normalizeHeading(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_#[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function headingSlug(value) {
  return normalizeHeading(value)
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function compactSlug(value) {
  return String(value || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function headingTextFromPageTitle(page) {
  const parentTitle = page.parentPageId
    ? page.title.replace(/^.*?:\s*/, "")
    : page.title;
  return parentTitle.trim();
}

function extractSection(markdown, page) {
  const headingTitle = headingTextFromPageTitle(page);
  const wantedSlug = page.headingId || headingSlug(headingTitle);
  const wantedCompactSlug = compactSlug(wantedSlug);
  const wantedTitle = normalizeHeading(headingTitle);
  const lines = markdown.split(/\r?\n/);
  let start = -1;
  let level = Number(page.headingLevel || 2);

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const currentLevel = match[1].length;
    const currentTitle = match[2].trim();
    if (
      currentLevel === level &&
      (headingSlug(currentTitle) === wantedSlug ||
        compactSlug(headingSlug(currentTitle)) === wantedCompactSlug ||
        normalizeHeading(currentTitle) === wantedTitle)
    ) {
      start = index;
      break;
    }
  }

  if (start === -1) return "";

  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{1,6})\s+/);
    if (match && match[1].length <= level) {
      end = index;
      break;
    }
  }

  return lines.slice(start, end).join("\n").trim();
}

function stripMarkdown(markdown) {
  return String(markdown || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeMarkdownOutput(markdown) {
  return String(markdown || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .trimEnd();
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, "--")
    .replace(/&ndash;/g, "-")
    .replace(/&times;/g, "x")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
}

function htmlToMarkdown(html) {
  return decodeEntities(
    String(html || "")
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n\n")
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n\n")
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n")
      .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n")
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n\n")
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
      .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "_$1_")
      .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "_$1_")
      .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n"),
  ).trim();
}

function buildFrontmatter(page, status) {
  const lines = [
    "---",
    `id: ${yamlString(page.id)}`,
    `title: ${yamlString(page.title)}`,
    `section: ${yamlString(page.section)}`,
    `track: ${yamlString(page.track)}`,
    `granularity: ${yamlString(page.granularity)}`,
    `status: ${yamlString(status)}`,
    `sourcePriority: ${yamlString(page.sourcePriority)}`,
    `sourceKeys: ${yamlArray(page.sourceKeys)}`,
    `sourceUrls: ${yamlArray(page.sourceUrls)}`,
  ];

  if (page.parentPageId) lines.push(`parentPageId: ${yamlString(page.parentPageId)}`);
  if (page.sourcePath) lines.push(`sourcePath: ${yamlString(page.sourcePath)}`);
  if (page.headingId) lines.push(`headingId: ${yamlString(page.headingId)}`);
  lines.push("---");
  return lines.join("\n");
}

function sourceNote(page) {
  const urls = (page.sourceUrls || []).map((url) => `- ${url}`).join("\n");
  return ["## Sources", urls || "- Source pending"].join("\n");
}

function companionBody(page) {
  return [
    `# ${page.title}`,
    "",
    "> Authoring status: this companion page is source-mapped, but not fully written yet. It should be authored from the primary sources listed below before publication.",
    "",
    "## Current Brief",
    "",
    page.brief || "Brief pending.",
    "",
    sourceNote(page),
  ].join("\n");
}

function sourceBody(page, markdown, importedFrom = "primary markdown source") {
  return [
    `# ${page.title}`,
    "",
    `> Draft status: imported from the ${importedFrom}. Needs editorial restructuring, cross-links, and source-note polish before final publication.`,
    "",
    sourceNote(page),
    "",
    "## Source Draft",
    "",
    markdown.trim(),
  ].join("\n");
}

function sectionBody(page, markdown) {
  const body = markdown.trim() || `No exact section body was extracted. Use the parent source page: ${page.parentPageId}.`;
  return [
    `# ${page.title}`,
    "",
    "> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.",
    "",
    sourceNote(page),
    "",
    "## Extracted Section Draft",
    "",
    body,
  ].join("\n");
}

function renderedFallback(page, renderedByUrl) {
  const url = (page.sourceUrls || [])[0];
  return url ? renderedByUrl.get(url) : null;
}

function contentForPage(page, args, missingSources, renderedByUrl) {
  if (page.granularity === "companion-page") {
    return { status: page.status || "needs-authoring-from-primary-sources", body: companionBody(page) };
  }

  const relativePath = toRelativeSourcePath(page.sourcePath || "");
  const sourceFile = path.join(args.docsRoot, relativePath);
  if (!fs.existsSync(sourceFile)) {
    const rendered = renderedFallback(page, renderedByUrl);
    if (rendered?.html) {
      return {
        status: "draft-imported-from-generated-html",
        body: sourceBody(page, htmlToMarkdown(rendered.html), "generated Neelo docs HTML because source markdown is not present in the local clone"),
      };
    }

    missingSources.push({ id: page.id, sourceFile });
    const body = [
      `# ${page.title}`,
      "",
      "> Draft status: source file missing in this local environment. Regenerate after restoring the Neelo docs clone.",
      "",
      sourceNote(page),
    ].join("\n");
    return { status: "source-file-missing", body };
  }

  const markdown = fs.readFileSync(sourceFile, "utf8");
  if (page.granularity === "section-page") {
    const section = extractSection(markdown, page);
    return {
      status: section ? "draft-extracted-from-primary-source" : "needs-section-extraction-review",
      body: sectionBody(page, section),
    };
  }

  return { status: "draft-imported-from-primary-source", body: sourceBody(page, markdown) };
}

function writePage(page, args, generatedFiles, searchIndex, missingSources, renderedByUrl) {
  const { status, body } = contentForPage(page, args, missingSources, renderedByUrl);
  const dir = path.join(args.outDir, page.granularity);
  ensureDir(dir);
  const filePath = path.join(dir, `${page.id}.md`);
  const content = sanitizeMarkdownOutput(`${buildFrontmatter(page, status)}\n\n${body}`);
  fs.writeFileSync(filePath, `${content}\n`);
  generatedFiles.push(filePath);

  searchIndex.push({
    id: page.id,
    title: page.title,
    section: page.section,
    track: page.track,
    granularity: page.granularity,
    status,
    sourceKeys: page.sourceKeys || [],
    sourceUrls: page.sourceUrls || [],
    file: path.posix.join("content/generated", page.granularity, `${page.id}.md`),
    excerpt: stripMarkdown(body).slice(0, 1200),
  });
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

const args = parseArgs(process.argv.slice(2));
const manifest = readJson(args.manifest);
const docsData = fs.existsSync(args.docsData) ? readJson(args.docsData) : { pages: [] };
const renderedByUrl = new Map(docsData.pages.map((page) => [`https://0xneelo.github.io/vibe_docs${page.href}`, page]));
const generatedFiles = [];
const searchIndex = [];
const missingSources = [];

ensureDir(args.outDir);
ensureDir(path.dirname(args.indexJson));

for (const page of manifest.pages) {
  writePage(page, args, generatedFiles, searchIndex, missingSources, renderedByUrl);
}

const stats = {
  generatedAt: "deterministic-build",
  manifestVersion: manifest.manifestVersion,
  totalPages: manifest.pages.length,
  generatedFiles: generatedFiles.length,
  indexEntries: searchIndex.length,
  missingSources,
  byGranularity: countBy(searchIndex, (page) => page.granularity),
  byStatus: countBy(searchIndex, (page) => page.status),
};

fs.writeFileSync(args.indexJson, `${JSON.stringify(searchIndex, null, 2)}\n`);
fs.writeFileSync(args.indexJs, `window.SearchBookIndex = ${JSON.stringify(searchIndex)};\n`);
fs.writeFileSync(args.stats, `${JSON.stringify(stats, null, 2)}\n`);

assertCompendiumPageTarget(manifest.pages.length);
if (generatedFiles.length !== manifest.pages.length) {
  throw new Error(`Generated ${generatedFiles.length} files for ${manifest.pages.length} manifest pages`);
}
if (missingSources.length > 0) {
  throw new Error(`Missing ${missingSources.length} source files; see ${args.stats}`);
}

console.log(JSON.stringify(stats, null, 2));
