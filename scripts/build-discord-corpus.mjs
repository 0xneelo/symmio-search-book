#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  questions: path.join(searchBookRoot, "QUESTIONS.md"),
  operatorInbox: path.join(searchBookRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  outJson: path.join(searchBookRoot, "data", "discord-corpus.json"),
  outJs: path.join(searchBookRoot, "data", "discord-corpus.js"),
};

const publicationModes = new Set(["unknown", "cite", "paraphrase", "internal-only"]);
const questionStart = /^(who|what|when|where|why|how|can|could|should|would|do|does|did|is|are|will)\b/i;

function parseArgs(argv) {
  const args = {
    ...defaults,
    inputs: [],
    channelIds: [],
    lafaAuthorIds: envList("SEARCH_BOOK_DISCORD_LAFA_AUTHOR_IDS"),
    fromApi: false,
    maxMessages: Number(process.env.SEARCH_BOOK_DISCORD_MAX_MESSAGES || 5000),
    publicationMode: process.env.SEARCH_BOOK_DISCORD_PUBLICATION_MODE || "unknown",
    storeContent: process.env.SEARCH_BOOK_DISCORD_STORE_CONTENT === "true",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") args.inputs.push(argv[++index]);
    else if (arg === "--channel-id") args.channelIds.push(argv[++index]);
    else if (arg === "--lafa-author-id") args.lafaAuthorIds.push(argv[++index]);
    else if (arg === "--from-api") args.fromApi = true;
    else if (arg === "--max-messages") args.maxMessages = Number(argv[++index]);
    else if (arg === "--publication-mode") args.publicationMode = argv[++index];
    else if (arg === "--store-content") args.storeContent = true;
    else if (arg === "--questions") args.questions = argv[++index];
    else if (arg === "--operator-inbox") args.operatorInbox = argv[++index];
    else if (arg === "--out-json") args.outJson = argv[++index];
    else if (arg === "--out-js") args.outJs = argv[++index];
    else if (arg === "--help") {
      console.log(`Usage: node src/search-book/scripts/build-discord-corpus.mjs [--input export.json] [--from-api --channel-id <id>] [--publication-mode unknown|cite|paraphrase|internal-only]`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  args.lafaAuthorIds = unique(args.lafaAuthorIds.map(String));
  args.channelIds = unique([...args.channelIds, ...envList("SEARCH_BOOK_DISCORD_CHANNEL_IDS")]);
  if (!publicationModes.has(args.publicationMode)) {
    throw new Error(`Invalid publication mode: ${args.publicationMode}`);
  }
  if (!Number.isFinite(args.maxMessages) || args.maxMessages < 1) {
    throw new Error(`Invalid --max-messages value: ${args.maxMessages}`);
  }
  return args;
}

function envList(name) {
  return String(process.env[name] || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<@!?\d+>/g, " ")
    .replace(/<#\d+>/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function compact(value, maxLength = 220) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

function sha(value) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function parseSeededTopics(markdown) {
  const marker = "## Seeded FAQ Topics For Discord Mining";
  const start = markdown.indexOf(marker);
  if (start === -1) return [];
  const lines = markdown.slice(start + marker.length).split("\n");
  const topics = [];
  for (const line of lines) {
    if (line.startsWith("## ")) break;
    const match = line.match(/^\s*-\s+"?(.+?)"?\s*$/);
    if (match) topics.push(match[1].trim());
  }
  return unique(topics);
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function parseJsonOrJsonl(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  if (filePath.endsWith(".jsonl")) {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  }
  return JSON.parse(raw);
}

function messagesFromPayload(payload, sourcePath) {
  const source = path.basename(sourcePath || "api");
  if (Array.isArray(payload)) {
    return payload.flatMap((item) => {
      if (Array.isArray(item?.messages)) return messagesFromChannel(item, source);
      return [{ raw: item, context: { source } }];
    });
  }
  if (Array.isArray(payload?.messages)) return messagesFromChannel(payload, source);
  if (Array.isArray(payload?.channels)) {
    return payload.channels.flatMap((channel) => messagesFromChannel(channel, source));
  }
  if (Array.isArray(payload?.guild?.channels)) {
    return payload.guild.channels.flatMap((channel) => messagesFromChannel(channel, source));
  }
  return [];
}

function messagesFromChannel(channel, source) {
  const context = {
    source,
    guildName: channel.guild?.name || channel.guildName || channel.server || "",
    channelId: channel.channel?.id || channel.channelId || channel.channel_id || channel.id || "",
    channelName: channel.channel?.name || channel.channelName || channel.name || "",
  };
  return (channel.messages || []).map((raw) => ({ raw, context }));
}

function coerceAuthor(raw) {
  const author = raw.author || raw.user || {};
  const authorName =
    author.globalName ||
    author.global_name ||
    author.displayName ||
    author.display_name ||
    author.username ||
    author.name ||
    raw.authorName ||
    raw.author ||
    "";
  return {
    id: String(author.id || raw.authorId || raw.author_id || ""),
    name: String(authorName || ""),
    bot: Boolean(author.bot || raw.authorBot || raw.author_bot),
  };
}

function coerceMessage(item, index, args) {
  const { raw, context } = item;
  const author = coerceAuthor(raw);
  const content = String(raw.content ?? raw.text ?? raw.message ?? raw.cleanContent ?? raw.Content ?? "").trim();
  const channelId = String(raw.channelId || raw.channel_id || raw.channel?.id || context.channelId || "");
  const timestamp = String(raw.timestamp || raw.createdAt || raw.created_at || raw.date || raw.Timestamp || "");
  const id =
    String(raw.id || raw.messageId || raw.message_id || "") ||
    `derived-${sha([context.source, channelId, timestamp, author.id, author.name, content, index].join("|"))}`;
  const reference =
    raw.reference?.messageId ||
    raw.reference?.message_id ||
    raw.messageReference?.messageId ||
    raw.message_reference?.message_id ||
    raw.replyToId ||
    raw.reply_to_id ||
    "";
  const authorMatch = authorStatus(author, args.lafaAuthorIds);
  return {
    id,
    channelId,
    channelName: String(raw.channelName || raw.channel?.name || context.channelName || ""),
    guildName: String(raw.guildName || raw.guild?.name || context.guildName || ""),
    authorId: author.id,
    authorName: author.name,
    authorIsBot: author.bot,
    authorStatus: authorMatch,
    timestamp,
    content,
    normalizedContent: normalize(content),
    referenceMessageId: String(reference || ""),
    attachmentCount: Array.isArray(raw.attachments) ? raw.attachments.length : 0,
    source: context.source,
  };
}

function authorStatus(author, lafaAuthorIds) {
  if (author.id && lafaAuthorIds.includes(author.id)) return "configured-lafa-author";
  if (/\blafa(chief)?\b/i.test(author.name || "")) return "name-match-review-required";
  return "";
}

function isQuestion(message) {
  if (!message.normalizedContent) return false;
  return /\?\s*$/.test(message.content) || questionStart.test(message.content);
}

function topicMatches(text, topics) {
  const tokens = new Set(normalize(text).split(" ").filter((token) => token.length > 2));
  return topics
    .map((topic) => {
      const topicTokens = normalize(topic).split(" ").filter((token) => token.length > 2);
      const overlap = topicTokens.filter((token) => tokens.has(token)).length;
      return { topic, overlap, total: topicTokens.length };
    })
    .filter((item) => item.overlap >= Math.min(2, item.total))
    .sort((a, b) => b.overlap - a.overlap || a.topic.localeCompare(b.topic))
    .map((item) => item.topic);
}

function buildQuestionClusters(messages, seededTopics, canStoreContent) {
  const clusters = new Map();
  for (const message of messages.filter(isQuestion)) {
    const key = message.normalizedContent || `message-${message.id}`;
    const existing =
      clusters.get(key) || {
        id: `discord-question-${sha(key)}`,
        normalizedQuestion: key,
        question: canStoreContent ? compact(message.content) : "",
        count: 0,
        messageIds: [],
        channelIds: new Set(),
        firstSeen: message.timestamp || "",
        lastSeen: message.timestamp || "",
        seededTopicMatches: new Set(),
      };
    existing.count += 1;
    existing.messageIds.push(message.id);
    if (message.channelId) existing.channelIds.add(message.channelId);
    if (message.timestamp && (!existing.firstSeen || message.timestamp < existing.firstSeen)) existing.firstSeen = message.timestamp;
    if (message.timestamp && (!existing.lastSeen || message.timestamp > existing.lastSeen)) existing.lastSeen = message.timestamp;
    for (const topic of topicMatches(message.content, seededTopics)) existing.seededTopicMatches.add(topic);
    clusters.set(key, existing);
  }
  return [...clusters.values()]
    .map((cluster) => ({
      ...cluster,
      channelIds: [...cluster.channelIds].sort(),
      seededTopicMatches: [...cluster.seededTopicMatches].sort(),
    }))
    .sort((a, b) => b.count - a.count || a.normalizedQuestion.localeCompare(b.normalizedQuestion));
}

function findPreviousQuestion(messages, index) {
  const message = messages[index];
  if (!message) return null;
  if (message.referenceMessageId) {
    const referenced = messages.find((candidate) => candidate.id === message.referenceMessageId);
    if (referenced && isQuestion(referenced)) return referenced;
  }
  for (let cursor = index - 1; cursor >= Math.max(0, index - 10); cursor -= 1) {
    const candidate = messages[cursor];
    if (candidate.channelId === message.channelId && isQuestion(candidate)) return candidate;
  }
  return null;
}

function buildLafaAnswerCandidates(messages, canStoreContent) {
  return messages
    .map((message, index) => ({ message, index }))
    .filter(({ message }) => message.authorStatus)
    .map(({ message, index }) => {
      const question = findPreviousQuestion(messages, index);
      return {
        id: `discord-lafa-answer-${sha(message.id)}`,
        messageId: message.id,
        authorStatus: message.authorStatus,
        authorId: message.authorStatus === "configured-lafa-author" ? message.authorId : "",
        channelId: message.channelId,
        timestamp: message.timestamp,
        answer: canStoreContent ? compact(message.content, 500) : "",
        relatedQuestionMessageId: question?.id || "",
        relatedQuestion: question && canStoreContent ? compact(question.content) : "",
        requiresReview: message.authorStatus !== "configured-lafa-author" || !question,
      };
    })
    .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)) || a.messageId.localeCompare(b.messageId));
}

function redactMessages(messages, canStoreContent) {
  return messages.map((message) => ({
    id: message.id,
    channelId: message.channelId,
    channelName: message.channelName,
    guildName: message.guildName,
    authorStatus: message.authorStatus,
    timestamp: message.timestamp,
    referenceMessageId: message.referenceMessageId,
    attachmentCount: message.attachmentCount,
    content: canStoreContent ? message.content : "",
    normalizedContent: canStoreContent ? message.normalizedContent : "",
  }));
}

async function fetchDiscordMessages(args) {
  const token = process.env.SEARCH_BOOK_DISCORD_BOT_TOKEN || process.env.DISCORD_BOT_TOKEN || "";
  if (!token) throw new Error("Missing SEARCH_BOOK_DISCORD_BOT_TOKEN or DISCORD_BOT_TOKEN for --from-api");
  if (!args.channelIds.length) throw new Error("Missing --channel-id or SEARCH_BOOK_DISCORD_CHANNEL_IDS for --from-api");

  const all = [];
  for (const channelId of args.channelIds) {
    let before = "";
    while (all.length < args.maxMessages) {
      const limit = Math.min(100, args.maxMessages - all.length);
      const params = new URLSearchParams({ limit: String(limit) });
      if (before) params.set("before", before);
      const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages?${params}`, {
        headers: { Authorization: `Bot ${token}` },
      });
      if (!response.ok) throw new Error(`Discord API request failed for channel ${channelId}: HTTP ${response.status}`);
      const batch = await response.json();
      if (!Array.isArray(batch) || !batch.length) break;
      all.push({
        channelId,
        messages: batch.map((message) => ({ ...message, channelId })),
      });
      before = batch[batch.length - 1]?.id || "";
      if (batch.length < limit) break;
    }
  }
  return all;
}

function importContract() {
  return {
    acceptedInputs: [
      "JSON array of Discord API message objects.",
      "JSON object with a messages array and optional guild/channel metadata.",
      "JSON object with channels[], each containing messages[].",
      "JSONL file with one Discord API-like message object per line.",
      "Live Discord API fetch via --from-api when SEARCH_BOOK_DISCORD_BOT_TOKEN and channel ids are supplied.",
    ],
    recognizedMessageFields: [
      "id/messageId",
      "channelId/channel_id",
      "channelName/channel.name",
      "guildName/guild.name",
      "author.id",
      "author.username/globalName/displayName",
      "content/text/message",
      "timestamp/createdAt/date",
      "reference.messageId/message_reference.message_id/replyToId",
      "attachments[]",
    ],
    publicationModes: [...publicationModes],
    defaultPrivacy: "Message text is omitted unless publication mode is cite/paraphrase or --store-content is set.",
  };
}

function buildReport({ args, seededTopics, messages, canStoreContent, openInboxItems }) {
  const questionClusters = buildQuestionClusters(messages, seededTopics, canStoreContent);
  const lafaAnswerCandidates = buildLafaAnswerCandidates(messages, canStoreContent);
  const openInboxIds = new Set(openInboxItems.map((item) => item.id));
  const blockedBy = messages.length
    ? []
    : [
        ...(openInboxIds.has(17) ? ["OPERATOR-INBOX #17"] : []),
        ...(openInboxIds.has(2) ? ["OPERATOR-INBOX #2"] : []),
      ];
  const missingInputs = messages.length
    ? [
        ...(args.publicationMode === "unknown" ? ["discord-public-use-boundary"] : []),
        ...(args.lafaAuthorIds.length ? [] : ["lafa-author-id-map"]),
      ]
    : openInboxIds.has(17)
      ? ["readable-discord-export-file"]
      : ["discord-export-or-api-access"];
  return {
    generatedAt: "deterministic-build",
    status: messages.length
      ? "imported-needs-review"
      : openInboxIds.has(17)
        ? "parked-discord-export-file-unreadable"
        : "parked-missing-discord-export",
    importContractReady: true,
    apiScraperReady: true,
    corpusReady: messages.length > 0 && !missingInputs.length,
    sourceCompletionReady: false,
    blockedBy,
    sourceKey: "discord-ingestion-contract",
    publicationMode: args.publicationMode,
    storesMessageText: canStoreContent,
    totals: {
      seededTopics: seededTopics.length,
      importedMessages: messages.length,
      questionClusters: questionClusters.length,
      lafaAnswerCandidates: lafaAnswerCandidates.length,
      configuredLafaAuthorIds: args.lafaAuthorIds.length,
    },
    missingInputs,
    seededTopics,
    importContract: importContract(),
    apiScraper: {
      mode: "discord-rest-v10",
      tokenEnvVars: ["SEARCH_BOOK_DISCORD_BOT_TOKEN", "DISCORD_BOT_TOKEN"],
      channelIdArgs: ["--channel-id", "SEARCH_BOOK_DISCORD_CHANNEL_IDS"],
      maxMessagesDefault: 5000,
      tokenPrinted: false,
    },
    questionClusters,
    lafaAnswerCandidates,
    messages: redactMessages(messages, canStoreContent),
  };
}

function writeOutputs(report, args) {
  ensureDir(path.dirname(args.outJson));
  fs.writeFileSync(args.outJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(args.outJs, `window.SearchBookDiscordCorpus = ${JSON.stringify(report)};\n`);
  console.log(
    JSON.stringify(
      {
        status: report.status,
        importContractReady: report.importContractReady,
        apiScraperReady: report.apiScraperReady,
        corpusReady: report.corpusReady,
        messages: report.totals.importedMessages,
        questionClusters: report.totals.questionClusters,
        lafaAnswerCandidates: report.totals.lafaAnswerCandidates,
      },
      null,
      2,
    ),
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const seededTopics = parseSeededTopics(readText(args.questions));
  const openInboxItems = parseOpenInboxItems(readText(args.operatorInbox));
  const payloads = args.inputs.flatMap((input) => messagesFromPayload(parseJsonOrJsonl(input), input));
  const apiPayloads = args.fromApi ? messagesFromPayload(await fetchDiscordMessages(args), "discord-api") : [];
  const messages = [...payloads, ...apiPayloads]
    .map((item, index) => coerceMessage(item, index, args))
    .filter((message) => message.content || message.id)
    .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)) || a.id.localeCompare(b.id))
    .slice(0, args.maxMessages);
  const canStoreContent = args.storeContent || args.publicationMode === "cite" || args.publicationMode === "paraphrase";
  writeOutputs(buildReport({ args, seededTopics, messages, canStoreContent, openInboxItems }), args);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
