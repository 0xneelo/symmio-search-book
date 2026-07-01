#!/usr/bin/env node

import childProcess from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    inputs: unique([...envList("SEARCH_BOOK_DISCORD_EXPORT_PATHS"), ...envList("SEARCH_BOOK_DISCORD_EXPORT_PATH")]),
    lafaAuthorIds: envList("SEARCH_BOOK_DISCORD_LAFA_AUTHOR_IDS"),
    maxMessages: Number(process.env.SEARCH_BOOK_DISCORD_MAX_MESSAGES || 5000),
    questionLimit: 80,
    lafaLimit: 80,
    outDir: path.join(os.tmpdir(), `search-book-discord-review-${stamp()}`),
    keepSourceCorpus: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") args.inputs.push(argv[++index]);
    else if (arg === "--lafa-author-id") args.lafaAuthorIds.push(argv[++index]);
    else if (arg === "--max-messages") args.maxMessages = Number(argv[++index]);
    else if (arg === "--question-limit") args.questionLimit = Number(argv[++index]);
    else if (arg === "--lafa-limit") args.lafaLimit = Number(argv[++index]);
    else if (arg === "--out-dir") args.outDir = argv[++index];
    else if (arg === "--keep-source-corpus") args.keepSourceCorpus = true;
    else if (arg === "--help") {
      console.log(`Usage: node scripts/build-discord-review-queue.mjs --input export.json --lafa-author-id <id> [--out-dir /tmp/review]`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  args.inputs = unique(args.inputs.map(String));
  args.lafaAuthorIds = unique(args.lafaAuthorIds.map(String));
  assertPositiveInteger(args.maxMessages, "--max-messages");
  assertPositiveInteger(args.questionLimit, "--question-limit");
  assertPositiveInteger(args.lafaLimit, "--lafa-limit");
  if (!args.inputs.length) {
    throw new Error("Missing --input or SEARCH_BOOK_DISCORD_EXPORT_PATH(S). Review packets must be built from a local export.");
  }
  return args;
}

function envList(name) {
  return String(process.env[name] || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function assertOutputOutsideRepo(outDir) {
  const resolved = path.resolve(outDir);
  const relative = path.relative(searchBookRoot, resolved);
  if (!relative.startsWith("..") && !path.isAbsolute(relative)) {
    throw new Error(`Refusing to write raw Discord review excerpts inside the repository: ${resolved}`);
  }
  return resolved;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function compact(value, maxLength = 320) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

function markdownCell(value, maxLength = 220) {
  return compact(value, maxLength).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function relativeAgeValue(value) {
  return value ? String(value) : "";
}

function questionPriority(cluster) {
  return (cluster.count || 0) * 10 + (cluster.seededTopicMatches?.length || 0) * 5 + (cluster.question?.endsWith("?") ? 2 : 0);
}

function lafaPriority(candidate) {
  return (candidate.relatedQuestion ? 20 : 0) + (candidate.requiresReview ? 0 : 10) + Math.min(10, Math.ceil((candidate.answer || "").length / 80));
}

function buildSourceCorpus(args, tempDir) {
  const outJson = path.join(tempDir, "discord-review-source.json");
  const outJs = path.join(tempDir, "discord-review-source.js");
  const buildArgs = [
    path.join(searchBookRoot, "scripts", "build-discord-corpus.mjs"),
    "--publication-mode",
    "paraphrase",
    "--max-messages",
    String(args.maxMessages),
    "--out-json",
    outJson,
    "--out-js",
    outJs,
  ];
  for (const input of args.inputs) buildArgs.push("--input", input);
  for (const authorId of args.lafaAuthorIds) buildArgs.push("--lafa-author-id", authorId);

  const result = childProcess.spawnSync(process.execPath, buildArgs, {
    cwd: searchBookRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(`Discord corpus review-source build failed: ${compact(result.stderr || result.stdout || "unknown error", 800)}`);
  }
  return { outJson, outJs, corpus: readJson(outJson) };
}

function buildReviewPacket(corpus, args) {
  const questionReviewItems = (corpus.questionClusters || [])
    .filter((cluster) => cluster.question || cluster.normalizedQuestion)
    .map((cluster) => ({
      id: cluster.id,
      reviewType: "repeated-question",
      priority: questionPriority(cluster),
      question: compact(cluster.question || cluster.normalizedQuestion, 500),
      normalizedQuestion: compact(cluster.normalizedQuestion, 500),
      count: cluster.count || 0,
      firstSeen: relativeAgeValue(cluster.firstSeen),
      lastSeen: relativeAgeValue(cluster.lastSeen),
      channelIds: cluster.channelIds || [],
      messageIds: cluster.messageIds || [],
      seededTopicMatches: cluster.seededTopicMatches || [],
      reviewDecision: "needs-editorial-review",
      publicUseBoundary: "Use as demand signal. Paraphrase into authored docs only after source/editor approval; do not quote raw Discord text.",
    }))
    .sort((a, b) => b.priority - a.priority || b.count - a.count || a.id.localeCompare(b.id))
    .slice(0, args.questionLimit);

  const lafaReviewItems = (corpus.lafaAnswerCandidates || [])
    .filter((candidate) => candidate.answer || candidate.relatedQuestion)
    .map((candidate) => ({
      id: candidate.id,
      reviewType: "lafa-answer-candidate",
      priority: lafaPriority(candidate),
      timestamp: relativeAgeValue(candidate.timestamp),
      channelId: candidate.channelId || "",
      messageId: candidate.messageId,
      authorStatus: candidate.authorStatus,
      relatedQuestionMessageId: candidate.relatedQuestionMessageId || "",
      relatedQuestion: compact(candidate.relatedQuestion, 500),
      answerExcerpt: compact(candidate.answer, 900),
      requiresReview: candidate.requiresReview !== false,
      reviewDecision: "needs-editorial-review",
      publicUseBoundary: "Do not publish as an exact Lafa answer until reviewed. Prefer a source-backed paraphrase mapped to an authored page.",
    }))
    .sort((a, b) => b.priority - a.priority || a.timestamp.localeCompare(b.timestamp) || a.id.localeCompare(b.id))
    .slice(0, args.lafaLimit);

  return {
    generatedAt: new Date().toISOString(),
    status: "review-queue-ready",
    containsRawDiscordExcerpts: true,
    doNotCommit: true,
    privacyBoundary:
      "This packet is internal reviewer material. It contains Discord-derived question and answer excerpts. Keep it outside git, do not publish raw quotes, and promote only reviewed paraphrases with source boundaries.",
    inputFiles: args.inputs.map((input) => path.basename(input)),
    sourceCorpus: {
      status: corpus.status,
      publicationMode: corpus.publicationMode,
      storesMessageText: corpus.storesMessageText,
      corpusReady: corpus.corpusReady,
      totals: corpus.totals,
    },
    totals: {
      questionReviewItems: questionReviewItems.length,
      lafaReviewItems: lafaReviewItems.length,
      pairedLafaItems: lafaReviewItems.filter((item) => item.relatedQuestion).length,
    },
    reviewerChecklist: [
      "Map repeated questions to an existing page id or mark as a new FAQ/page candidate.",
      "For each Lafa candidate, decide whether it is authoritative enough to paraphrase, needs a primary-source match, or should remain internal.",
      "Never copy raw Discord text into public docs; write sourced paraphrases and keep exact Discord excerpts internal.",
      "Leave Phase B economics, financial advice, secrets, and unsupported future claims in refusal/gap lanes.",
    ],
    questionReviewItems,
    lafaReviewItems,
  };
}

function renderMarkdown(packet) {
  const lines = [
    "# Discord/Lafa Editorial Review Packet",
    "",
    `Generated: ${packet.generatedAt}`,
    "",
    "> Internal reviewer material. This packet contains Discord-derived excerpts. Do not commit it, do not paste raw excerpts into public docs, and promote only reviewed paraphrases with approved source boundaries.",
    "",
    "## Summary",
    "",
    `- Source status: \`${packet.sourceCorpus.status}\``,
    `- Publication mode: \`${packet.sourceCorpus.publicationMode}\``,
    `- Imported messages: ${packet.sourceCorpus.totals.importedMessages}`,
    `- Question clusters in source corpus: ${packet.sourceCorpus.totals.questionClusters}`,
    `- Lafa candidates in source corpus: ${packet.sourceCorpus.totals.lafaAnswerCandidates}`,
    `- Review questions in this packet: ${packet.totals.questionReviewItems}`,
    `- Lafa candidates in this packet: ${packet.totals.lafaReviewItems}`,
    "",
    "## Reviewer Checklist",
    "",
    ...packet.reviewerChecklist.map((item) => `- ${item}`),
    "",
    "## Repeated Questions",
    "",
    "| ID | Count | Question | Topics | First Seen | Last Seen |",
    "| --- | ---: | --- | --- | --- | --- |",
    ...packet.questionReviewItems.map(
      (item) =>
        `| \`${item.id}\` | ${item.count} | ${markdownCell(item.question, 260)} | ${markdownCell(item.seededTopicMatches.join(", "), 180)} | ${markdownCell(item.firstSeen, 80)} | ${markdownCell(item.lastSeen, 80)} |`,
    ),
    "",
    "## Lafa Answer Candidates",
    "",
    "| ID | Related Question | Answer Excerpt | Review Boundary |",
    "| --- | --- | --- | --- |",
    ...packet.lafaReviewItems.map(
      (item) =>
        `| \`${item.id}\` | ${markdownCell(item.relatedQuestion || item.relatedQuestionMessageId || "No related question found", 220)} | ${markdownCell(item.answerExcerpt, 360)} | ${markdownCell(item.publicUseBoundary, 180)} |`,
    ),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDir = assertOutputOutsideRepo(args.outDir);
  fs.mkdirSync(outDir, { recursive: true });
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "search-book-discord-review-source-"));
  let source = null;
  try {
    source = buildSourceCorpus(args, tempDir);
    const packet = buildReviewPacket(source.corpus, args);
    const jsonPath = path.join(outDir, "discord-review-queue.json");
    const markdownPath = path.join(outDir, "discord-review-queue.md");
    writeJson(jsonPath, packet);
    fs.writeFileSync(markdownPath, renderMarkdown(packet));
    if (args.keepSourceCorpus) {
      fs.copyFileSync(source.outJson, path.join(outDir, "discord-review-source.json"));
    }
    console.log(
      JSON.stringify(
        {
          status: packet.status,
          outDir,
          jsonPath,
          markdownPath,
          containsRawDiscordExcerpts: packet.containsRawDiscordExcerpts,
          doNotCommit: packet.doNotCommit,
          valuesPrinted: false,
          totals: packet.totals,
          sourceTotals: packet.sourceCorpus.totals,
        },
        null,
        2,
      ),
    );
  } finally {
    if (!args.keepSourceCorpus) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
