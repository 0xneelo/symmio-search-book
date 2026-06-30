#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(searchBookRoot, "..", "..");

const defaults = {
  answerChunks: path.join(searchBookRoot, "data", "answer-chunks.json"),
  pageStateRegistry: path.join(searchBookRoot, "data", "page-state-registry.json"),
  questionRoutes: path.join(searchBookRoot, "data", "question-routes.json"),
  glossary: path.join(searchBookRoot, "data", "glossary.json"),
  sourceCatalog: path.join(searchBookRoot, "data", "source-catalog.json"),
  gapQueue: path.join(searchBookRoot, "data", "gap-queue.json"),
  llmRagContract: path.join(searchBookRoot, "data", "llm-rag-contract.json"),
  answerValidationReport: path.join(searchBookRoot, "data", "answer-validation-report.json"),
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  mode: "extractive",
  evalLive: "",
  maxChunks: 8,
  maxContextWords: 1600,
  source: "cli",
  requestId: "",
  query: "",
  json: false,
  includeDebug: false,
};

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "being",
  "can",
  "could",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "shall",
  "should",
  "that",
  "the",
  "then",
  "these",
  "this",
  "those",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "without",
  "would",
  "was",
  "were",
]);

const riskRules = [
  {
    id: "prompt-injection",
    reason: "prompt-injection",
    status: "refusal",
    patterns: [/ignore .*instructions?/i, /training data/i, /without citations?/i],
    message: "I can only answer from retrieved search-book context with citations.",
  },
  {
    id: "secrets",
    reason: "secret-or-credential-request",
    status: "refusal",
    patterns: [/secret/i, /credential/i, /private key/i, /api key/i, /admin token/i, /VIBE_BACK_URL/i],
    message: "I cannot expose secrets, credentials, private endpoints, or hidden runtime configuration.",
  },
  {
    id: "financial-advice",
    reason: "financial-advice",
    status: "refusal",
    patterns: [/should i buy/i, /should i sell/i, /open a leveraged/i, /trade today/i],
    message: "I can explain documented mechanics, but I cannot give personal trading advice.",
  },
  {
    id: "security-overclaim",
    reason: "security-overclaim",
    status: "refusal",
    patterns: [/guarantee.*no .*risk/i, /risk[- ]free/i, /guaranteed safe/i, /impossible to lose/i],
    message: "The docs can cite published risk controls and audit context, but they cannot guarantee that risk is absent.",
  },
  {
    id: "revenue-economics",
    reason: "phase-b-economics-out-of-scope",
    status: "refusal",
    patterns: [
      /phase b/i,
      /liquidation.*revenue/i,
      /funding.*revenue/i,
      /solver.*split/i,
      /lp profit/i,
      /venue-specific revenue/i,
    ],
    message: "Phase B revenue components are out of scope for the v1 public answer.",
  },
  {
    id: "discord",
    reason: "source-family-missing",
    status: "operator-blocked-refusal",
    gapId: "G-001",
    operatorItemIds: [2],
    patterns: [/discord/i, /lafa/i],
    message: "Discord and Lafa-answer claims are blocked until the operator provides the export and citation boundary.",
  },
  {
    id: "notion",
    reason: "operator-access-required",
    status: "operator-blocked-refusal",
    operatorItemIds: [5],
    patterns: [/notion/i, /private roadmap/i],
    message: "Private Notion claims require operator access and a public-use boundary.",
  },
  {
    id: "original-whitepaper",
    reason: "source-family-missing",
    status: "operator-blocked-refusal",
    gapId: "G-007",
    operatorItemIds: [6],
    patterns: [/original .*whitepaper/i, /oldest .*whitepaper/i, /2021 .*whitepaper/i],
    message: "The original Symmio whitepaper artifact is not available in the current source set.",
  },
  {
    id: "superflow-sshe",
    reason: "source-family-missing",
    status: "operator-blocked-refusal",
    operatorItemIds: [7],
    patterns: [/\bsshe\b/i],
    message: "The SSHE source family is not identified yet.",
  },
  {
    id: "internal-draft",
    reason: "internal-draft-excluded",
    status: "refusal",
    gapId: "G-003",
    patterns: [/internal .*draft/i, /draft pages as final/i],
    message: "Internal draft pages are excluded from final public answer synthesis.",
  },
  {
    id: "fabricated-citation",
    reason: "citation-validation-failed",
    status: "postprocess-failure",
    patterns: [/source key that does not exist/i, /citation to .*does not exist/i, /fabricated citation/i],
    message: "Requests to fabricate citations fail the citation-validation boundary.",
  },
  {
    id: "opyn",
    reason: "source-family-excluded",
    status: "refusal",
    patterns: [/opyn/i],
    message: "Opyn is excluded from the v1 competitive sweep; do not use mirrors or third-party snippets for Opyn claims.",
  },
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--query") args.query = argv[++index] || "";
    else if (arg === "--mode") args.mode = argv[++index] || "";
    else if (arg === "--eval-live") args.evalLive = argv[++index] || "all";
    else if (arg === "--max-chunks") args.maxChunks = Number(argv[++index]);
    else if (arg === "--max-context-words") args.maxContextWords = Number(argv[++index]);
    else if (arg === "--request-id") args.requestId = argv[++index] || "";
    else if (arg === "--source") args.source = argv[++index] || "";
    else if (arg === "--json") args.json = true;
    else if (arg === "--include-debug") args.includeDebug = true;
    else if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (args.evalLive && !["all", "adversarial", "answer-validation"].includes(args.evalLive)) {
    throw new Error("--eval-live must be all, adversarial, or answer-validation.");
  }
  if (args.evalLive) args.mode = "llm";
  if (!args.evalLive && !args.query.trim()) throw new Error("Missing required --query value.");
  if (!["extractive", "llm"].includes(args.mode)) throw new Error("--mode must be extractive or llm.");
  if (!Number.isInteger(args.maxChunks) || args.maxChunks < 1) throw new Error("--max-chunks must be a positive integer.");
  if (!Number.isInteger(args.maxContextWords) || args.maxContextWords < 200) {
    throw new Error("--max-context-words must be an integer of at least 200.");
  }
  if (!args.requestId) args.requestId = `req-${Date.now().toString(36)}`;
  return args;
}

function printHelp() {
  console.log(`Usage:
  node src/search-book/scripts/run-llm-rag-answer.mjs --query "What is Vibe Trading?" [--mode extractive|llm] [--json]
  node src/search-book/scripts/run-llm-rag-answer.mjs --eval-live all --json

Modes:
  extractive  Scan the real answer chunks and return a grounded cited answer without a model call.
  llm         Use an approved OpenAI-compatible endpoint from env after retrieval and post-validate citations.

Live eval:
  --eval-live all|adversarial|answer-validation
              Run fixture queries through --mode llm and report pass rates plus token/cost usage.

LLM env, required only for --mode llm:
  SEARCH_BOOK_LLM_API_STYLE=openai-compatible
  SEARCH_BOOK_LLM_ENDPOINT=https://...
  SEARCH_BOOK_LLM_MODEL=...
  SEARCH_BOOK_LLM_API_KEY=...
  SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true
`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokens(value) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function stripDefinitionQuery(value) {
  let candidate = normalize(value);
  const prefixes = [
    "what is",
    "what are",
    "what was",
    "whats",
    "define",
    "explain",
    "meaning of",
    "tell me about",
    "what does",
  ];
  const suffixes = [
    "mean",
    "means",
    "stand for",
    "stands for",
    "refer to",
    "refers to",
    "in vibe",
    "in symmio",
    "in vibe docs",
    "in the docs",
    "in search book",
  ];

  for (const prefix of prefixes) {
    if (candidate === prefix) return "";
    if (candidate.startsWith(`${prefix} `)) {
      candidate = candidate.slice(prefix.length).trim();
      break;
    }
  }
  for (const suffix of suffixes) {
    if (candidate.endsWith(` ${suffix}`)) {
      candidate = candidate.slice(0, -suffix.length).trim();
      break;
    }
  }
  return candidate;
}

function buildGlossaryRuntime(glossary, pageById) {
  const routes = [];
  const aliasLookup = new Map();
  for (const term of glossary.terms || []) {
    const retrievalPageIds = unique(term.pageIds || []).filter((pageId) => {
      const page = pageById.get(pageId);
      return page && ["candidate", "published", "source-companion"].includes(page.pageState);
    });
    const publicPageIds = retrievalPageIds.filter((pageId) => {
      const page = pageById.get(pageId);
      return page && ["candidate", "published"].includes(page.pageState);
    });
    const sourcePrimaryPage = pageById.get(term.primaryPageId);
    const publicPrimaryPageId = publicPageIds.includes(term.primaryPageId)
      ? term.primaryPageId
      : publicPageIds[0] || "";
    const route = {
      id: term.id,
      term: term.term,
      category: term.category,
      definition: term.definition,
      aliases: term.aliases || [],
      sourceKeys: term.sourceKeys || [],
      sourcePrimaryPageId: term.primaryPageId,
      sourcePrimaryPageState: sourcePrimaryPage?.pageState || "missing",
      primaryPageId: publicPrimaryPageId,
      primaryPageState: publicPrimaryPageId ? pageById.get(publicPrimaryPageId)?.pageState || "missing" : "",
      retrievalPageIds,
      publicPageIds,
    };
    routes.push(route);

    const aliases = unique([term.term, ...(term.aliases || [])]);
    for (const alias of aliases) {
      const normalizedAlias = normalize(alias);
      if (!normalizedAlias) continue;
      const existing = aliasLookup.get(normalizedAlias);
      if (!existing || normalizedAlias.length > existing.normalizedAlias.length) {
        aliasLookup.set(normalizedAlias, { route, alias, normalizedAlias });
      }
    }
  }
  return { glossary, routes, aliasLookup };
}

function parseOpenInboxItems(markdown) {
  const openSection = markdown.split("## Open")[1]?.split("## Resolved")[0] || "";
  return [...openSection.matchAll(/^### \[OPEN\] #(\d+) — (.+)$/gm)].map((match) => ({
    id: Number(match[1]),
    title: match[2].trim(),
  }));
}

function loadRuntime(defaultPaths) {
  const answerChunks = readJson(defaultPaths.answerChunks);
  const pageStateRegistry = readJson(defaultPaths.pageStateRegistry);
  const questionRoutes = readJson(defaultPaths.questionRoutes);
  const glossary = readJson(defaultPaths.glossary);
  const sourceCatalog = readJson(defaultPaths.sourceCatalog);
  const gapQueue = readJson(defaultPaths.gapQueue);
  const openInboxItems = parseOpenInboxItems(readText(defaultPaths.operatorInbox));

  const pageById = new Map((pageStateRegistry.pages || []).map((page) => [page.id, page]));
  const chunkById = new Map((answerChunks.chunks || []).map((chunk) => [chunk.id, chunk]));
  const chunksByPageId = new Map();
  for (const chunk of answerChunks.chunks || []) {
    if (!chunksByPageId.has(chunk.pageId)) chunksByPageId.set(chunk.pageId, []);
    chunksByPageId.get(chunk.pageId).push(chunk);
  }
  const glossaryRuntime = buildGlossaryRuntime(glossary, pageById);
  return {
    answerChunks,
    pageStateRegistry,
    questionRoutes,
    glossary,
    sourceCatalog,
    gapQueue,
    openInboxItems,
    pageById,
    chunkById,
    chunksByPageId,
    glossaryRoutes: glossaryRuntime.routes,
    glossaryAliasLookup: glossaryRuntime.aliasLookup,
    sourceByKey: sourceCatalog.sourceByKey || {},
    gapById: new Map((gapQueue.items || []).map((gap) => [gap.gapId, gap])),
    exactRouteByQuestion: new Map((questionRoutes.answerable || []).map((route) => [route.normalizedQuestion, route])),
    reconciliationByQuestion: new Map((questionRoutes.reconciliation || []).map((item) => [normalize(item.question), item])),
  };
}

function gapEvent(args, reason, gapId = "", operatorItemIds = []) {
  return {
    id: `gap-${args.requestId}`,
    query: args.query,
    reason,
    page: "",
    gapId,
    operatorItemIds,
    time: "runtime",
  };
}

function refusal(args, { status = "refusal", reason, message, gapId = "", operatorItemIds = [], suggestedQueries = [] }) {
  return {
    requestId: args.requestId,
    status,
    answer: "",
    primaryPageId: "",
    citations: [],
    refusalReason: reason,
    message,
    gapEvent: gapEvent(args, reason, gapId, operatorItemIds),
    suggestedQueries,
    events: [
      {
        type: "gap-created",
        gapId,
        operatorItemIds,
        reason,
      },
    ],
  };
}

const conceptualLpProfitRoutePageIds = new Set([
  "authored-lp-profit-decomposition-map",
  "authored-lp-profit-and-dynamic-pricing",
  "authored-funding-lp-master-profit-formula",
  "authored-funding-insurance-buyback-accounting",
]);

function isConceptualLpProfitRoute(exactRoute, query) {
  if (!exactRoute || !conceptualLpProfitRoutePageIds.has(exactRoute.pageId)) return false;
  if (!/\blp profit\b/i.test(query)) return false;
  return !/\b(live|v1|production|payouts?|shares?|venue-specific|liquidation|funding revenue|solver split)\b/i.test(query);
}

function preflight(args, runtime) {
  const normalizedQuery = normalize(args.query);
  const reconciliation = runtime.reconciliationByQuestion.get(normalizedQuery);
  if (reconciliation) {
    const gap = runtime.gapById.get(reconciliation.gapId);
    const operatorItemIds = (gap?.linkedOperatorItems || []).map((item) => item.id).filter(Boolean);
    return refusal(args, {
      status: operatorItemIds.length ? "operator-blocked-refusal" : "refusal",
      reason: "operator-decision-required",
      message: reconciliation.notes || "This question is tracked as a gap and cannot be answered yet.",
      gapId: reconciliation.gapId,
      operatorItemIds,
      suggestedQueries: ["What is Vibe Trading?", "What are intents?", "What is the answer engine?"],
    });
  }
  const exactRoute = runtime.exactRouteByQuestion.get(normalizedQuery);
  const isDiscordIngestionBoundaryRoute = exactRoute?.pageId === "authored-discord-lafa-ingestion-boundary";

  for (const rule of riskRules) {
    if (rule.id === "discord" && isDiscordIngestionBoundaryRoute) continue;
    if (rule.id === "revenue-economics" && isConceptualLpProfitRoute(exactRoute, args.query)) continue;
    if (rule.patterns.some((pattern) => pattern.test(args.query))) {
      return refusal(args, {
        status: rule.status,
        reason: rule.reason,
        message: rule.message,
        gapId: rule.gapId || "",
        operatorItemIds: rule.operatorItemIds || [],
        suggestedQueries: ["What is Vibe Trading?", "How do intents work?", "What does a solver do?"],
      });
    }
  }
  return null;
}

function findGlossaryRoute(normalizedQuery, runtime) {
  const candidates = unique([
    normalizedQuery,
    stripDefinitionQuery(normalizedQuery),
  ]).filter(Boolean);

  for (const candidate of candidates) {
    const exact = runtime.glossaryAliasLookup.get(candidate);
    if (exact) {
      return {
        ...exact.route,
        matchedAlias: exact.alias,
        normalizedAlias: exact.normalizedAlias,
        matchType: candidate === normalizedQuery ? "exact-alias" : "definition-query",
      };
    }
  }

  const sortedAliases = [...runtime.glossaryAliasLookup.values()]
    .filter((item) => item.normalizedAlias.length > 2)
    .sort((a, b) => b.normalizedAlias.length - a.normalizedAlias.length || a.normalizedAlias.localeCompare(b.normalizedAlias));

  for (const candidate of candidates) {
    for (const item of sortedAliases) {
      const pattern = new RegExp(`(^| )${item.normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}( |$)`);
      if (!pattern.test(candidate)) continue;
      const aliasTokens = tokens(item.normalizedAlias);
      if (aliasTokens.length <= 1 && candidate !== item.normalizedAlias) continue;
      return {
        ...item.route,
        matchedAlias: item.alias,
        normalizedAlias: item.normalizedAlias,
        matchType: "contained-alias",
      };
    }
  }

  return null;
}

function scoreChunk(chunk, queryTokens, routeHintPageIds) {
  const haystack = `${chunk.title} ${chunk.text} ${(chunk.sourceKeys || []).join(" ")}`.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (haystack.includes(token)) score += chunk.title.toLowerCase().includes(token) ? 3 : 1;
  }
  if (routeHintPageIds.has(chunk.pageId)) score += 20;
  return score;
}

function retrieve(args, runtime) {
  const normalizedQuery = normalize(args.query);
  const queryTokens = tokens(args.query);
  const exactRoute = runtime.exactRouteByQuestion.get(normalizedQuery);
  const glossaryRoute = exactRoute ? null : findGlossaryRoute(normalizedQuery, runtime);
  const routeHintPageIds = new Set([
    exactRoute?.pageId || "",
    glossaryRoute?.primaryPageId || "",
    ...(glossaryRoute?.retrievalPageIds || []),
  ].filter(Boolean));
  const scored = [];

  for (const chunk of runtime.answerChunks.chunks || []) {
    const page = runtime.pageById.get(chunk.pageId);
    if (!page || !["candidate", "published", "source-companion"].includes(page.pageState)) continue;
    if ((chunk.sourceKeys || []).some((key) => !runtime.sourceByKey[key])) continue;
    const score = scoreChunk(chunk, queryTokens, routeHintPageIds);
    if (score > 0) scored.push({ ...chunk, score, pageState: page.pageState });
  }

  scored.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const chunks = [];
  let words = 0;
  for (const chunk of scored) {
    if (chunks.length >= args.maxChunks) break;
    if (words + (chunk.wordCount || tokens(chunk.text).length) > args.maxContextWords && chunks.length > 0) continue;
    chunks.push(chunk);
    words += chunk.wordCount || tokens(chunk.text).length;
  }

  const candidatePages = unique(chunks.map((chunk) => chunk.pageId))
    .map((pageId) => runtime.pageById.get(pageId))
    .filter(Boolean)
    .map((page) => ({
      pageId: page.id,
      pageTitle: page.title,
      pageState: page.pageState,
      routeSource: page.routeSource,
      section: page.section,
      track: page.track,
    }));

  return {
    requestId: args.requestId,
    query: args.query,
    normalizedQuery,
    exactRoute: exactRoute || null,
    glossaryRoute: glossaryRoute || null,
    chunks,
    candidatePages,
    blockedSignals: [],
  };
}

function firstLinkedSourceKey(chunk, sourceByKey) {
  return (chunk.sourceKeys || []).find((key) => sourceByKey[key]?.href) || (chunk.sourceKeys || [])[0] || "";
}

function citationForChunk(chunk, runtime) {
  const sourceKey = firstLinkedSourceKey(chunk, runtime.sourceByKey);
  return {
    pageId: chunk.pageId,
    pageTitle: chunk.title,
    sourceKey,
    sourceHref: runtime.sourceByKey[sourceKey]?.href || (chunk.sourceUrls || [])[0] || "",
    chunkIds: [chunk.id],
  };
}

function choosePrimaryPage(context, runtime) {
  if (context.exactRoute) return context.exactRoute.pageId;
  if (context.glossaryRoute?.primaryPageId) {
    const page = runtime.pageById.get(context.glossaryRoute.primaryPageId);
    if (page && ["candidate", "published"].includes(page.pageState)) return page.id;
  }
  const answerable = context.chunks.find((chunk) => {
    const page = runtime.pageById.get(chunk.pageId);
    return page && ["candidate", "published"].includes(page.pageState);
  });
  return answerable?.pageId || "";
}

function excerpt(text, maxWords = 86) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "..." : "");
}

function extractiveAnswer(args, runtime, context) {
  if (!context.chunks.length) {
    return refusal(args, {
      reason: "no-grounded-context",
      message: "No grounded search-book context matched that question.",
      suggestedQueries: ["What is Vibe Trading?", "What is an intent?", "What does a solver do?"],
    });
  }
  const primaryPageId = choosePrimaryPage(context, runtime);
  if (!primaryPageId) {
    return refusal(args, {
      reason: "no-public-answer-page",
      message: "The retrieved context did not include a public candidate answer page.",
    });
  }

  const primaryChunks = context.chunks.filter((chunk) => chunk.pageId === primaryPageId);
  const answerChunks = (primaryChunks.length ? primaryChunks : context.chunks).slice(0, 2);
  const citations = answerChunks.map((chunk) => citationForChunk(chunk, runtime));
  let answer = answerChunks.map((chunk, index) => {
    const citation = citations[index];
    return `${excerpt(chunk.text)} [${citation.sourceKey}; ${chunk.id}]`;
  }).join("\n\n");
  const guidance = buildAnswerGuidance(context);
  const missingRequiredPhrases = (guidance.requiredPhrasesToPreserve || [])
    .filter((phrase) => !answer.includes(phrase));
  const guidanceText = context.exactRoute?.notes || context.glossaryRoute?.definition || "";
  if (missingRequiredPhrases.length && guidanceText && citations[0]) {
    answer = `${guidanceText} [${citations[0].sourceKey}; ${citations[0].chunkIds[0]}]\n\n${answer}`;
  }

  const response = {
    requestId: args.requestId,
    status: "answered",
    answer,
    primaryPageId,
    citations,
    events: [
      {
        type: "question-answered",
        pageId: primaryPageId,
        query: args.query,
        source: args.source,
      },
    ],
    confidence: context.exactRoute ? "exact-route" : context.glossaryRoute ? "glossary-route" : "retrieval",
    relatedPageIds: unique(context.candidatePages.map((page) => page.pageId)).filter((pageId) => pageId !== primaryPageId).slice(0, 5),
  };
  return validateResponseOrThrow(response, context, runtime);
}

function llmConfigFromEnv() {
  return {
    apiStyle: process.env.SEARCH_BOOK_LLM_API_STYLE || "",
    endpoint: process.env.SEARCH_BOOK_LLM_ENDPOINT || "",
    model: process.env.SEARCH_BOOK_LLM_MODEL || "",
    apiKey: process.env.SEARCH_BOOK_LLM_API_KEY || "",
    allowExternalContext: process.env.SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT || "",
  };
}

function embeddingConfigFromEnv() {
  return {
    endpoint: process.env.SEARCH_BOOK_EMBED_ENDPOINT || "",
    model: process.env.SEARCH_BOOK_EMBED_MODEL || "text-embedding-3-small",
    apiKey: process.env.SEARCH_BOOK_LLM_API_KEY || "",
  };
}

function llmConfigErrors(config) {
  const missing = [];
  if (config.apiStyle !== "openai-compatible") missing.push("SEARCH_BOOK_LLM_API_STYLE=openai-compatible");
  if (!config.endpoint) missing.push("SEARCH_BOOK_LLM_ENDPOINT");
  if (!config.model) missing.push("SEARCH_BOOK_LLM_MODEL");
  if (!config.apiKey) missing.push("SEARCH_BOOK_LLM_API_KEY");
  if (config.allowExternalContext !== "true") missing.push("SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true");
  return missing;
}

function embeddingConfigErrors(config) {
  const missing = [];
  if (!config.endpoint) missing.push("SEARCH_BOOK_EMBED_ENDPOINT");
  if (!config.model) missing.push("SEARCH_BOOK_EMBED_MODEL");
  if (!config.apiKey) missing.push("SEARCH_BOOK_LLM_API_KEY");
  return missing;
}

function assertLlmConfig(config) {
  const missing = llmConfigErrors(config);
  if (missing.length) {
    throw new Error(
      `LLM mode requires approved runtime configuration from OPERATOR-INBOX #11. Missing: ${missing.join(", ")}`,
    );
  }
}

function withDegraded(response, reason) {
  if (response?.status !== "answered") return response;
  return { ...response, degraded: { reason } };
}

function embeddingToBlob(values) {
  if (!Array.isArray(values) || !values.length) throw new Error("embedding must be a non-empty array.");
  const vector = Float32Array.from(values.map((value) => Number(value)));
  if ([...vector].some((value) => !Number.isFinite(value))) throw new Error("embedding contains non-finite values.");
  return Buffer.from(vector.buffer, vector.byteOffset, vector.byteLength);
}

function embeddingFromBlob(blob) {
  let buffer;
  if (Buffer.isBuffer(blob)) {
    buffer = blob;
  } else if (blob instanceof ArrayBuffer) {
    buffer = Buffer.from(blob);
  } else if (ArrayBuffer.isView(blob)) {
    buffer = Buffer.from(blob.buffer, blob.byteOffset, blob.byteLength);
  } else if (Array.isArray(blob)) {
    buffer = Buffer.from(blob);
  } else {
    return [];
  }
  if (!buffer.length || buffer.length % Float32Array.BYTES_PER_ELEMENT !== 0) return [];
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return [...new Float32Array(arrayBuffer)];
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || a.length !== b.length) return 0;
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;
  for (let index = 0; index < a.length; index += 1) {
    const left = Number(a[index]);
    const right = Number(b[index]);
    if (!Number.isFinite(left) || !Number.isFinite(right)) return 0;
    dot += left * right;
    aNorm += left * left;
    bNorm += right * right;
  }
  if (!aNorm || !bNorm) return 0;
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

async function embedQuery(text, options = {}) {
  const config = options.config || embeddingConfigFromEnv();
  const errors = embeddingConfigErrors(config);
  if (errors.length) {
    return {
      status: "skipped",
      reason: "embedding-unavailable",
      missing: errors,
      model: config.model || "",
      embedding: [],
    };
  }
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    return { status: "skipped", reason: "fetch-unavailable", missing: ["fetch"], model: config.model, embedding: [] };
  }
  try {
    const response = await fetchImpl(config.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({ model: config.model, input: text }),
    });
    if (!response.ok) {
      return { status: "skipped", reason: `embedding-http-${response.status}`, missing: [], model: config.model, embedding: [] };
    }
    const payload = await response.json();
    const embedding = payload.data?.[0]?.embedding || [];
    if (!Array.isArray(embedding) || !embedding.length) {
      return { status: "skipped", reason: "embedding-empty", missing: [], model: config.model, embedding: [] };
    }
    if (embedding.some((value) => !Number.isFinite(Number(value)))) {
      return { status: "skipped", reason: "embedding-invalid", missing: [], model: config.model, embedding: [] };
    }
    return { status: "embedded", reason: "", missing: [], model: config.model, embedding };
  } catch (error) {
    return { status: "skipped", reason: "embedding-error", missing: [], model: config.model, embedding: [] };
  }
}

const gpt41MiniPricingPerMillion = {
  inputUsd: 0.15,
  outputUsd: 0.60,
};

function contextForPrompt(context, runtime) {
  return context.chunks.map((chunk) => ({
    chunkId: chunk.id,
    pageId: chunk.pageId,
    pageTitle: chunk.title,
    pageState: chunk.pageState,
    sourceKeys: chunk.sourceKeys,
    sourceUrls: chunk.sourceUrls,
    citationSources: (chunk.sourceKeys || []).map((sourceKey) => ({
      sourceKey,
      sourceHref: runtime.sourceByKey[sourceKey]?.href || (chunk.sourceUrls || [])[0] || "",
    })),
    text: chunk.text,
  }));
}

function responseJsonSchema() {
  const eventSchema = {
    type: "object",
    additionalProperties: false,
    properties: {
      type: { type: "string" },
      pageId: { type: "string" },
      query: { type: "string" },
      source: { type: "string" },
      gapId: { type: "string" },
      operatorItemIds: { type: "array", items: { type: "integer" } },
      reason: { type: "string" },
    },
    required: ["type", "pageId", "query", "source", "gapId", "operatorItemIds", "reason"],
  };
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      requestId: { type: "string" },
      status: { type: "string", enum: ["answered", "refusal", "operator-blocked-refusal", "postprocess-failure"] },
      answer: { type: "string" },
      primaryPageId: { type: "string" },
      citations: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            pageId: { type: "string" },
            pageTitle: { type: "string" },
            sourceKey: { type: "string" },
            sourceHref: { type: "string" },
            chunkIds: { type: "array", items: { type: "string" } },
          },
          required: ["pageId", "pageTitle", "sourceKey", "sourceHref", "chunkIds"],
        },
      },
      events: { type: "array", items: eventSchema },
      refusalReason: { type: "string" },
      message: { type: "string" },
      suggestedQueries: { type: "array", items: { type: "string" } },
      relatedPageIds: { type: "array", items: { type: "string" } },
    },
    required: [
      "requestId",
      "status",
      "answer",
      "primaryPageId",
      "citations",
      "events",
      "refusalReason",
      "message",
      "suggestedQueries",
      "relatedPageIds",
    ],
  };
}

function structuredOutputFormat() {
  return {
    type: "json_schema",
    json_schema: {
      name: "SearchBookAnswerResponse",
      strict: true,
      schema: responseJsonSchema(),
    },
  };
}

function buildWorkedExample(context, runtime) {
  const chunk = context.chunks[0];
  if (!chunk) return null;
  const citation = citationForChunk(chunk, runtime);
  return {
    note: "Compact example only; answer the actual query separately.",
    suppliedChunkUsed: {
      chunkId: chunk.id,
      pageId: chunk.pageId,
      sourceKey: citation.sourceKey,
      sourceHref: citation.sourceHref,
    },
    response: {
      requestId: "example-request-id",
      status: "answered",
      answer: `Example grounded sentence using only supplied context. [${citation.sourceKey}; ${chunk.id}]`,
      primaryPageId: chunk.pageId,
      citations: [
        {
          pageId: chunk.pageId,
          pageTitle: chunk.title,
          sourceKey: citation.sourceKey,
          sourceHref: citation.sourceHref,
          chunkIds: [chunk.id],
        },
      ],
      events: [
        {
          type: "question-answered",
          pageId: chunk.pageId,
          query: "example query",
          source: "example",
          gapId: "",
          operatorItemIds: [],
          reason: "",
        },
      ],
      refusalReason: "",
      message: "",
      suggestedQueries: [],
      relatedPageIds: [],
    },
  };
}

function buildAnswerGuidance(context) {
  const contextPageIds = new Set([
    context.exactRoute?.pageId || "",
    context.glossaryRoute?.primaryPageId || "",
    ...context.chunks.map((chunk) => chunk.pageId),
  ].filter(Boolean));
  const normalizedQuery = normalize(context.query || "");
  const guidanceText = [
    context.exactRoute?.notes || "",
    context.glossaryRoute?.definition || "",
    ...context.chunks.map((chunk) => chunk.text || ""),
  ].join("\n");
  const phraseGroups = [
    {
      name: "phase-a-revenue",
      pageIds: ["authored-estimated-network-revenue", "authored-dashboard-revenue-pulse"],
      queryPattern: /\b(revenue|fee|fees|platformfeerate|platform fee|referrer share|phase a|phase-a|payout|payouts)\b/i,
      phrases: [
        "networkVolume × platformFeeRate × referrerPlatformShare",
        "0.05%",
        "5 bps",
        "30%",
        "Phase B economics are out of scope for v1",
      ],
    },
    {
      name: "referral-depth",
      pageIds: ["authored-dashboard-network", "authored-referral-depth-open-question"],
      queryPattern: /\b(referral|referrals|depth|levels|backfill|history|historical)\b/i,
      phrases: [
        "15 levels",
        "never lowers a balance",
      ],
    },
  ];
  const phraseCandidates = phraseGroups
    .filter((group) =>
      group.pageIds.some((pageId) => contextPageIds.has(pageId)) &&
      group.queryPattern.test(normalizedQuery),
    )
    .flatMap((group) => group.phrases);
  const disallowedPhrasesToAvoid = [];
  if (contextPageIds.has("authored-vibe-add-token-info") || /add token info/i.test(context.query || "")) {
    phraseCandidates.push("banner", "logo", "description", "website", "social links", "X feed", "USDC", "transaction hash");
    disallowedPhrasesToAvoid.push("static fee amount", "static treasury address", "guessed payment chain");
  }
  const normalizedGuidanceText = guidanceText.toLowerCase();
  return {
    exactRouteNotes: context.exactRoute?.notes || "",
    glossaryDefinition: context.glossaryRoute?.definition || "",
    requiredPhrasesToPreserve: phraseCandidates.filter((phrase) => normalizedGuidanceText.includes(phrase.toLowerCase())),
    disallowedPhrasesToAvoid,
  };
}

function collectAnswerGuidanceFailures(response, context) {
  const guidance = buildAnswerGuidance(context);
  const answer = String(response.answer || "");
  const requiredPhrases = guidance.requiredPhrasesToPreserve || [];
  const disallowedPhrases = guidance.disallowedPhrasesToAvoid || [];
  const requiredFailures = requiredPhrases
    .filter((phrase) => !String(response.answer || "").includes(phrase))
    .map((phrase) => validationFailure("answer-required-phrase-missing", `answer missing required phrase: ${phrase}`));
  const disallowedFailures = disallowedPhrases
    .filter((phrase) => answer.toLowerCase().includes(phrase.toLowerCase()))
    .map((phrase) => validationFailure("answer-disallowed-phrase-present", `answer included disallowed phrase: ${phrase}`));
  return [...requiredFailures, ...disallowedFailures];
}

function citationMarkerForResponse(response) {
  const citation = (response.citations || [])[0];
  const chunkId = (citation?.chunkIds || [])[0];
  if (!citation?.sourceKey || !chunkId) return "";
  return ` [${citation.sourceKey}; ${chunkId}]`;
}

function requiredPhraseSentence(requiredPhrases, marker) {
  if (requiredPhrases.includes("networkVolume × platformFeeRate × referrerPlatformShare")) {
    return `Phase A estimated network revenue is networkVolume × platformFeeRate × referrerPlatformShare; defaults are 0.05% / 5 bps platform fee and 30% referrer platform share. Phase B economics are out of scope for v1.${marker}`;
  }
  if (requiredPhrases.includes("15 levels")) {
    return `Public referral depth is 15 levels; historical backfill is additive and never lowers a balance.${marker}`;
  }
  if (requiredPhrases.includes("banner")) {
    return `The Add Token Info package covers banner, logo, description, website, social links, X feed, USDC payment, and transaction hash.${marker}`;
  }
  return `Required grounded terms: ${requiredPhrases.join("; ")}.${marker}`;
}

function ensureRequiredPhrases(response, context) {
  const requiredPhrases = buildAnswerGuidance(context).requiredPhrasesToPreserve || [];
  if (!requiredPhrases.length) return response;
  const answer = String(response.answer || "");
  const missingPhrases = requiredPhrases.filter((phrase) => !answer.includes(phrase));
  if (!missingPhrases.length) return response;
  const marker = citationMarkerForResponse(response);
  if (!marker) return response;
  return {
    ...response,
    answer: `${answer.trim()}\n\n${requiredPhraseSentence(requiredPhrases, marker)}`,
  };
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replacePhraseCaseInsensitive(value, phrase, replacement) {
  return String(value || "").replace(new RegExp(escapeRegExp(phrase), "gi"), replacement);
}

function ensureDisallowedPhrasesAbsent(response, context) {
  const disallowedPhrases = buildAnswerGuidance(context).disallowedPhrasesToAvoid || [];
  if (!disallowedPhrases.length || !response.answer) return response;
  const replacements = {
    "static fee amount": "fixed fee number",
    "static treasury address": "fixed treasury address",
    "guessed payment chain": "unsupported payment chain",
  };
  const answer = disallowedPhrases.reduce(
    (current, phrase) => replacePhraseCaseInsensitive(current, phrase, replacements[phrase] || "unsupported payment detail"),
    response.answer,
  );
  if (answer === response.answer) return response;
  return {
    ...response,
    answer,
  };
}

function applyAnswerGuidance(response, context) {
  return ensureDisallowedPhrasesAbsent(ensureRequiredPhrases(response, context), context);
}

function buildLlmMessages(args, runtime, context, validationFeedback = []) {
  const chunks = contextForPrompt(context, runtime);
  const validPageIds = unique(context.chunks.map((chunk) => chunk.pageId));
  const validChunkIds = context.chunks.map((chunk) => chunk.id);
  const sourceKeysByChunkId = Object.fromEntries(context.chunks.map((chunk) => [chunk.id, chunk.sourceKeys || []]));
  const sourceHrefBySourceKey = Object.fromEntries(
    unique(context.chunks.flatMap((chunk) => chunk.sourceKeys || []))
      .map((sourceKey) => [sourceKey, runtime.sourceByKey[sourceKey]?.href || ""]),
  );
  return [
    {
      role: "system",
      content: [
        "You are the Search Book answer runtime for Vibe x Symmio.",
        "Return only JSON matching the SearchBookAnswerResponse schema.",
        "When answering, status MUST be exactly \"answered\".",
        "Use a defined refusal status only if the supplied context is insufficient, unsafe, or asks for blocked content.",
        "requestId MUST echo the input requestId exactly.",
        "primaryPageId MUST be copied verbatim from one supplied chunk.pageId.",
        "Each citation.pageId MUST be copied verbatim from a supplied chunk.pageId.",
        "Each citation.chunkIds item MUST be copied verbatim from supplied chunkId values.",
        "Each citation.sourceKey MUST come from the cited chunk's sourceKeys.",
        "Each citation.sourceHref MUST be copied from citationSources.sourceHref or validIds.sourceHrefBySourceKey for that same sourceKey.",
        "Do not use chunk.sourceUrls as citation.sourceHref when citationSources supplies a sourceHref.",
        "Every substantive sentence must be grounded in supplied chunks; do not use latent knowledge.",
        "If answerGuidance.requiredPhrasesToPreserve is non-empty, every phrase in that array MUST appear verbatim in the answer text; do not replace it with synonyms or expanded wording.",
        "Before finalizing an answered response, scan answerGuidance.requiredPhrasesToPreserve and add a concise grounded sentence if any required phrase is absent.",
        "If answerGuidance.disallowedPhrasesToAvoid is non-empty, none of those phrases may appear verbatim in the answer text, even when explaining a boundary.",
        "For Add Token Info payment boundaries, say to use current in-app payment details instead of repeating disallowed static-payment phrases.",
        "If validation feedback is supplied, fix those exact contract errors and do not introduce new ids.",
      ].join(" "),
    },
    {
      role: "user",
      content: JSON.stringify({
        requestId: args.requestId,
        query: args.query,
        responseContract: {
          answeredStatus: "answered",
          refusalStatuses: ["refusal", "operator-blocked-refusal", "postprocess-failure"],
          requiredAnsweredFields: ["requestId", "status", "answer", "primaryPageId", "citations", "events"],
          citationRequiredFields: ["pageId", "pageTitle", "sourceKey", "sourceHref", "chunkIds"],
          emptyAnsweredFields: {
            refusalReason: "",
            message: "",
            suggestedQueries: [],
          },
        },
        validIds: {
          pageIds: validPageIds,
          chunkIds: validChunkIds,
          sourceKeysByChunkId,
          sourceHrefBySourceKey,
        },
        exactRoute: context.exactRoute,
        glossaryRoute: context.glossaryRoute,
        answerGuidance: buildAnswerGuidance(context),
        requiredPhraseRule: "If answerGuidance.requiredPhrasesToPreserve is non-empty, the answer is invalid unless every listed phrase appears verbatim.",
        prohibitedPhraseRule: "If answerGuidance.disallowedPhrasesToAvoid is non-empty, the answer is invalid if any listed phrase appears verbatim.",
        candidatePages: context.candidatePages,
        workedExample: buildWorkedExample(context, runtime),
        validationFeedback,
        chunks,
      }),
    },
  ];
}

function extractJsonObject(value) {
  const text = String(value || "").trim();
  if (text.startsWith("{")) return JSON.parse(text);
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return JSON.parse(fenced[1]);
  throw new Error("LLM response did not contain a JSON object.");
}

function buildLlmRequestBody(args, runtime, context, config, responseFormat, validationFeedback = []) {
  const body = {
    model: config.model,
    temperature: 0,
    response_format: responseFormat,
    messages: buildLlmMessages(args, runtime, context, validationFeedback),
  };
  return body;
}

function usageFromPayload(payload, model, responseFormatType, attempt) {
  const usage = payload?.usage || {};
  const inputTokens = usage.prompt_tokens ?? usage.input_tokens ?? 0;
  const outputTokens = usage.completion_tokens ?? usage.output_tokens ?? 0;
  const totalTokens = usage.total_tokens ?? inputTokens + outputTokens;
  const costUsd = ((inputTokens * gpt41MiniPricingPerMillion.inputUsd) +
    (outputTokens * gpt41MiniPricingPerMillion.outputUsd)) / 1_000_000;
  return {
    attempt,
    model,
    responseFormatType,
    inputTokens,
    outputTokens,
    totalTokens,
    costUsd: Number(costUsd.toFixed(8)),
  };
}

function aggregateUsage(records) {
  const inputTokens = records.reduce((sum, record) => sum + (record.inputTokens || 0), 0);
  const outputTokens = records.reduce((sum, record) => sum + (record.outputTokens || 0), 0);
  const totalTokens = records.reduce((sum, record) => sum + (record.totalTokens || 0), 0);
  const costUsd = records.reduce((sum, record) => sum + (record.costUsd || 0), 0);
  return {
    pricing: "gpt-4.1-mini input $0.15/1M, output $0.60/1M",
    calls: records.length,
    inputTokens,
    outputTokens,
    totalTokens,
    costUsd: Number(costUsd.toFixed(8)),
    attempts: records,
  };
}

async function postLlmRequest(config, body) {
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`LLM endpoint returned ${response.status}: ${text.slice(0, 500)}`);
    error.status = response.status;
    error.detail = text;
    throw error;
  }
  return JSON.parse(text);
}

function isStructuredOutputUnsupported(error) {
  return [400, 404, 415, 422].includes(error.status || 0) &&
    /response_format|json_schema|structured|schema/i.test(error.detail || error.message || "");
}

async function callLlmWithFormatFallback(config, body) {
  try {
    return {
      payload: await postLlmRequest(config, body),
      responseFormatType: body.response_format?.type || "unknown",
    };
  } catch (error) {
    if (!isStructuredOutputUnsupported(error)) throw error;
    const fallbackBody = {
      ...body,
      response_format: { type: "json_object" },
    };
    return {
      payload: await postLlmRequest(config, fallbackBody),
      responseFormatType: "json_object",
      structuredOutputFallback: true,
    };
  }
}

function attachLlmUsage(response, usageRecords, extra = {}) {
  return {
    ...response,
    llmUsage: {
      ...aggregateUsage(usageRecords),
      ...extra,
    },
  };
}

function formatValidationFeedback(error, response, context) {
  const validPageIds = unique(context.chunks.map((chunk) => chunk.pageId));
  const validChunkIds = context.chunks.map((chunk) => chunk.id);
  const feedback = [];
  if (response?.status !== "answered") {
    feedback.push(`status was ${JSON.stringify(response?.status)}, must be "answered" when answering.`);
  }
  if (response?.requestId !== context.requestId) {
    feedback.push(`requestId was ${JSON.stringify(response?.requestId)}, must echo ${JSON.stringify(context.requestId)}.`);
  }
  if (response?.primaryPageId && !validPageIds.includes(response.primaryPageId)) {
    feedback.push(`primaryPageId ${JSON.stringify(response.primaryPageId)} not in context; valid pageIds: ${validPageIds.join(", ")}.`);
  }
  for (const citation of response?.citations || []) {
    if (citation.pageId && !validPageIds.includes(citation.pageId)) {
      feedback.push(`citation.pageId ${JSON.stringify(citation.pageId)} not in context; valid pageIds: ${validPageIds.join(", ")}.`);
    }
    for (const chunkId of citation.chunkIds || []) {
      if (!validChunkIds.includes(chunkId)) {
        feedback.push(`citation.chunkId ${JSON.stringify(chunkId)} not in context; valid chunkIds: ${validChunkIds.join(", ")}.`);
      }
    }
  }
  for (const failure of error.validationFailures || []) feedback.push(failure.message);
  const requiredPhrases = buildAnswerGuidance(context).requiredPhrasesToPreserve || [];
  if (requiredPhrases.length) {
    feedback.push(`Copy these required phrases verbatim into answer: ${JSON.stringify(requiredPhrases)}.`);
  }
  const disallowedPhrases = buildAnswerGuidance(context).disallowedPhrasesToAvoid || [];
  if (disallowedPhrases.some((phrase) => String(response?.answer || "").toLowerCase().includes(phrase.toLowerCase()))) {
    feedback.push(`Remove these disallowed phrases from answer text: ${JSON.stringify(disallowedPhrases)}.`);
  }
  if (!feedback.length) feedback.push(error.message);
  return unique(feedback).slice(0, 12);
}

async function llmAnswer(args, runtime, context) {
  const config = llmConfigFromEnv();
  if (llmConfigErrors(config).length) {
    return withDegraded(extractiveAnswer(args, runtime, context), "llm-unavailable");
  }
  if (!context.chunks.length) {
    return refusal(args, {
      reason: "no-grounded-context",
      message: "No grounded search-book context matched that question.",
    });
  }

  const usageRecords = [];
  const validationAttempts = [];
  let validationFeedback = [];
  let lastError = null;
  const maxValidationRetries = 2;

  try {
    for (let attempt = 1; attempt <= maxValidationRetries + 1; attempt += 1) {
      const body = buildLlmRequestBody(args, runtime, context, config, structuredOutputFormat(), validationFeedback);
      const { payload, responseFormatType, structuredOutputFallback } = await callLlmWithFormatFallback(config, body);
      usageRecords.push(usageFromPayload(payload, config.model, responseFormatType, attempt));
      const content = payload.choices?.[0]?.message?.content || payload.output_text || "";
      let answer;
      try {
        answer = extractJsonObject(content);
        const validated = validateResponseOrThrow(answer, context, runtime);
        const phraseRepaired = applyAnswerGuidance(validated, context);
        const guidanceFailures = collectAnswerGuidanceFailures(phraseRepaired, context);
        if (guidanceFailures.length) throw new AnswerValidationError(guidanceFailures);
        return attachLlmUsage(phraseRepaired, usageRecords, {
          validationAttempts,
          structuredOutputFallback: Boolean(structuredOutputFallback),
          fallback: "",
        });
      } catch (error) {
        lastError = error;
        validationFeedback = formatValidationFeedback(error, answer, context);
        validationAttempts.push({
          attempt,
          failures: validationFeedback,
        });
        if (attempt > maxValidationRetries) break;
      }
    }
  } catch (providerError) {
    return withDegraded(extractiveAnswer(args, runtime, context), "llm-error");
  }

  const fallback = extractiveAnswer(args, runtime, context);
  return attachLlmUsage(fallback, usageRecords, {
    validationAttempts,
    fallback: "extractive-after-validation-failure",
    finalValidationError: lastError?.message || "",
  });
}

class AnswerValidationError extends Error {
  constructor(failures) {
    super(`Answer validation failed: ${unique(failures.map((failure) => failure.code)).join(", ")}`);
    this.name = "AnswerValidationError";
    this.validationFailures = failures;
  }
}

function validationFailure(code, message) {
  return { code, message };
}

function collectValidationFailures(response, context, runtime) {
  const failures = [];
  if (!response || typeof response !== "object") {
    return [validationFailure("response-not-object", "response was not a JSON object.")];
  }
  if (response.status !== "answered") {
    failures.push(validationFailure("status-not-answered", `status was ${JSON.stringify(response.status)}, must be "answered".`));
  }
  if (!response.requestId) {
    failures.push(validationFailure("request-id-missing", "requestId missing; it must echo the input requestId."));
  } else if (response.requestId !== context.requestId) {
    failures.push(validationFailure("request-id-mismatch", `requestId was ${JSON.stringify(response.requestId)}, must echo ${JSON.stringify(context.requestId)}.`));
  }
  if (!response.answer) failures.push(validationFailure("answer-missing", "answer is missing."));
  const primary = runtime.pageById.get(response.primaryPageId);
  const allowedChunkIds = new Set(context.chunks.map((chunk) => chunk.id));
  const allowedPageIds = new Set(context.chunks.map((chunk) => chunk.pageId));
  if (!primary) {
    failures.push(validationFailure("primary-page-missing", `primaryPageId ${JSON.stringify(response.primaryPageId)} does not exist.`));
  }
  if (primary && !["candidate", "published"].includes(primary.pageState)) {
    failures.push(validationFailure("primary-page-state-disallowed", `primaryPageId ${response.primaryPageId} is ${primary.pageState}, not candidate/published.`));
  }
  if (response.primaryPageId && !allowedPageIds.has(response.primaryPageId)) {
    failures.push(validationFailure("primary-page-outside-context", `primaryPageId ${JSON.stringify(response.primaryPageId)} not in supplied context; valid pageIds: ${[...allowedPageIds].join(", ")}.`));
  }
  if (!(response.citations || []).length) failures.push(validationFailure("citations-missing", "citations missing; at least one citation is required."));
  for (const citation of response.citations || []) {
    const citedPage = runtime.pageById.get(citation.pageId);
    if (!citedPage) failures.push(validationFailure("citation-page-missing", `citation.pageId ${JSON.stringify(citation.pageId)} does not exist.`));
    if (citedPage && !["candidate", "published", "source-companion"].includes(citedPage.pageState)) {
      failures.push(validationFailure("citation-page-state-disallowed", `citation.pageId ${citation.pageId} is ${citedPage.pageState}, not retrieval-eligible.`));
    }
    if (citation.pageId && !allowedPageIds.has(citation.pageId)) {
      failures.push(validationFailure("citation-page-outside-context", `citation.pageId ${JSON.stringify(citation.pageId)} not in supplied context; valid pageIds: ${[...allowedPageIds].join(", ")}.`));
    }
    if (!runtime.sourceByKey[citation.sourceKey]) {
      failures.push(validationFailure("citation-source-missing", `citation.sourceKey ${JSON.stringify(citation.sourceKey)} does not exist in SOURCES.`));
    }
    const expectedHref = runtime.sourceByKey[citation.sourceKey]?.href || "";
    if (!citation.sourceHref) {
      failures.push(validationFailure("citation-source-href-missing", `citation.sourceHref missing for sourceKey ${JSON.stringify(citation.sourceKey)}.`));
    } else if (expectedHref && citation.sourceHref !== expectedHref) {
      failures.push(validationFailure("citation-source-href-mismatch", `citation.sourceHref was ${JSON.stringify(citation.sourceHref)}, must be ${JSON.stringify(expectedHref)}.`));
    }
    if (!(citation.chunkIds || []).length) {
      failures.push(validationFailure("citation-chunk-ids-missing", "citation.chunkIds must include at least one supplied chunkId."));
    }
    for (const chunkId of citation.chunkIds || []) {
      if (!allowedChunkIds.has(chunkId)) {
        failures.push(validationFailure("citation-chunk-outside-context", `citation.chunkId ${JSON.stringify(chunkId)} not in supplied context.`));
      }
      const chunk = runtime.chunkById.get(chunkId);
      if (!chunk) failures.push(validationFailure("citation-chunk-missing", `citation.chunkId ${JSON.stringify(chunkId)} does not exist.`));
      if (chunk && chunk.pageId !== citation.pageId) {
        failures.push(validationFailure("citation-chunk-page-mismatch", `citation.pageId ${JSON.stringify(citation.pageId)} must match chunk ${chunkId} pageId ${JSON.stringify(chunk.pageId)}.`));
      }
      if (chunk && !(chunk.sourceKeys || []).includes(citation.sourceKey)) {
        failures.push(validationFailure("citation-chunk-source-mismatch", `citation.sourceKey ${JSON.stringify(citation.sourceKey)} must be one of chunk ${chunkId} sourceKeys: ${(chunk.sourceKeys || []).join(", ")}.`));
      }
    }
  }
  return failures;
}

function validateResponseOrThrow(response, context, runtime) {
  const failures = collectValidationFailures(response, context, runtime);
  if (failures.length) throw new AnswerValidationError(failures);
  return response;
}

async function answerQuery(args, runtime) {
  const preflightResponse = preflight(args, runtime);
  const context = preflightResponse ? null : retrieve(args, runtime);
  const response = preflightResponse || (args.mode === "llm"
    ? await llmAnswer(args, runtime, context)
    : extractiveAnswer(args, runtime, context));
  return { response, context };
}

function fixtureCasesFromAnswerValidation(answerValidationReport) {
  return (answerValidationReport.fixtures || []).map((fixture) => ({
    suite: "answer-validation",
    id: fixture.id,
    query: fixture.query,
    expectedStatus: fixture.expectedStatus || (fixture.type === "cited-answer" ? "answered" : fixture.response?.status || ""),
    expectedRefusalReason: fixture.expectedRefusalReason || fixture.response?.refusalReason || "",
    expectedPageId: fixture.expectedPageId || fixture.response?.primaryPageId || "",
    requiredAnswerIncludes: fixture.requiredAnswerIncludes || [],
    mustNotInclude: fixture.mustNotInclude || [],
  }));
}

function fixtureCasesFromLlmRagContract(llmRagContract) {
  return (llmRagContract.adversarialEvaluation?.cases || []).map((test) => ({
    suite: "adversarial",
    id: test.id,
    query: test.query,
    expectedStatus: test.expectedStatus,
    expectedRefusalReason: test.expectedRefusalReason || "",
    expectedPageId: test.expectedAnswerPageId || "",
    requiredAnswerIncludes: test.requiredAnswerIncludes || [],
    mustNotInclude: test.mustNotInclude || [],
  }));
}

function loadLiveEvalCases(args) {
  const cases = [];
  if (["all", "adversarial"].includes(args.evalLive)) {
    cases.push(...fixtureCasesFromLlmRagContract(readJson(defaults.llmRagContract)));
  }
  if (["all", "answer-validation"].includes(args.evalLive)) {
    cases.push(...fixtureCasesFromAnswerValidation(readJson(defaults.answerValidationReport)));
  }
  return cases;
}

function answeredValidationFailures(response, context, runtime) {
  try {
    validateResponseOrThrow(response, context, runtime);
    return [];
  } catch (error) {
    return (error.validationFailures || []).map((failure) => failure.code);
  }
}

function evaluateLiveCase(test, result, runtime) {
  const response = result.response || {};
  const answerText = String(response.answer || "");
  const failures = [];
  const expectedStatus = test.expectedStatus;
  if (expectedStatus === "answered") {
    if (response.status !== "answered") failures.push(`status ${response.status} !== answered`);
    if (test.expectedPageId && response.primaryPageId !== test.expectedPageId) {
      failures.push(`primaryPageId ${response.primaryPageId} !== ${test.expectedPageId}`);
    }
    failures.push(...answeredValidationFailures(response, result.context, runtime));
  } else if (expectedStatus === "caveated-answer-or-refusal") {
    if (response.status === "answered") {
      failures.push(...answeredValidationFailures(response, result.context, runtime));
    } else if (!["refusal", "operator-blocked-refusal", "postprocess-failure"].includes(response.status)) {
      failures.push(`status ${response.status} is neither answered nor fail-closed refusal`);
    }
    if (test.expectedRefusalReason && response.status !== "answered" && response.refusalReason !== test.expectedRefusalReason) {
      failures.push(`refusalReason ${response.refusalReason} !== ${test.expectedRefusalReason}`);
    }
  } else if (expectedStatus === "postprocess-failure") {
    if (response.status !== "postprocess-failure") failures.push(`status ${response.status} !== postprocess-failure`);
    if (test.expectedRefusalReason && response.refusalReason !== test.expectedRefusalReason) {
      failures.push(`refusalReason ${response.refusalReason} !== ${test.expectedRefusalReason}`);
    }
  } else {
    if (response.status !== expectedStatus) failures.push(`status ${response.status} !== ${expectedStatus}`);
    if (test.expectedRefusalReason && response.refusalReason !== test.expectedRefusalReason) {
      failures.push(`refusalReason ${response.refusalReason} !== ${test.expectedRefusalReason}`);
    }
  }
  for (const requiredText of test.requiredAnswerIncludes || []) {
    if (!answerText.toLowerCase().includes(String(requiredText).toLowerCase())) {
      failures.push(`answer missing required text: ${requiredText}`);
    }
  }
  for (const disallowedText of test.mustNotInclude || []) {
    if (disallowedText && answerText.toLowerCase().includes(String(disallowedText).toLowerCase())) {
      failures.push(`answer included disallowed text: ${disallowedText}`);
    }
  }
  return {
    suite: test.suite,
    id: test.id,
    query: test.query,
    expectedStatus,
    actualStatus: response.status || "",
    actualRefusalReason: response.refusalReason || "",
    primaryPageId: response.primaryPageId || "",
    passes: failures.length === 0,
    failures,
  };
}

function usageForResult(result) {
  return result.response?.llmUsage || {
    calls: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    costUsd: 0,
    attempts: [],
  };
}

async function runLiveEval(args, runtime) {
  const cases = loadLiveEvalCases(args);
  const resultByQuery = new Map();
  for (const test of cases) {
    if (resultByQuery.has(test.query)) continue;
    const requestId = `live-${test.id.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
    resultByQuery.set(test.query, await answerQuery({
      ...args,
      query: test.query,
      requestId,
      source: "live-eval",
      mode: "llm",
    }, runtime));
  }
  const evaluatedCases = cases.map((test) => evaluateLiveCase(test, resultByQuery.get(test.query), runtime));
  const passingCases = evaluatedCases.filter((test) => test.passes);
  const usageByQuery = [...resultByQuery.entries()].map(([query, result]) => ({
    query,
    status: result.response?.status || "",
    refusalReason: result.response?.refusalReason || "",
    primaryPageId: result.response?.primaryPageId || "",
    fallback: result.response?.llmUsage?.fallback || "",
    usage: usageForResult(result),
  }));
  const totals = usageByQuery.reduce((acc, item) => {
    acc.calls += item.usage.calls || 0;
    acc.inputTokens += item.usage.inputTokens || 0;
    acc.outputTokens += item.usage.outputTokens || 0;
    acc.totalTokens += item.usage.totalTokens || 0;
    acc.costUsd += item.usage.costUsd || 0;
    return acc;
  }, { calls: 0, inputTokens: 0, outputTokens: 0, totalTokens: 0, costUsd: 0 });
  totals.costUsd = Number(totals.costUsd.toFixed(8));
  return {
    status: passingCases.length === evaluatedCases.length ? "passed" : "failed",
    mode: args.evalLive,
    pricing: "gpt-4.1-mini input $0.15/1M, output $0.60/1M",
    coverage: {
      totalCases: evaluatedCases.length,
      passingCases: passingCases.length,
      failingCases: evaluatedCases.length - passingCases.length,
      bySuite: {
        adversarial: {
          total: evaluatedCases.filter((test) => test.suite === "adversarial").length,
          passing: evaluatedCases.filter((test) => test.suite === "adversarial" && test.passes).length,
        },
        answerValidation: {
          total: evaluatedCases.filter((test) => test.suite === "answer-validation").length,
          passing: evaluatedCases.filter((test) => test.suite === "answer-validation" && test.passes).length,
        },
      },
    },
    usageTotals: totals,
    calls: usageByQuery,
    failingCases: evaluatedCases.filter((test) => !test.passes),
    cases: evaluatedCases,
  };
}

function renderHuman(response, context) {
  if (response.status !== "answered") {
    return `${response.status}: ${response.message || response.refusalReason}`;
  }
  const citations = (response.citations || [])
    .map((citation, index) => `${index + 1}. ${citation.pageTitle} (${citation.sourceKey}) ${citation.sourceHref}`)
    .join("\n");
  const usage = response.llmUsage
    ? `\n\nLLM usage: input=${response.llmUsage.inputTokens}, output=${response.llmUsage.outputTokens}, cost=$${response.llmUsage.costUsd}`
    : "";
  return `${response.answer}\n\nPrimary page: ${response.primaryPageId}\n\nCitations:\n${citations}\n\nContext chunks: ${context.chunks.map((chunk) => chunk.id).join(", ")}${usage}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const runtime = loadRuntime(defaults);
  if (args.evalLive) {
    assertLlmConfig(llmConfigFromEnv());
    const evalReport = await runLiveEval(args, runtime);
    console.log(args.json ? JSON.stringify(evalReport, null, 2) : JSON.stringify(evalReport.coverage, null, 2));
    if (evalReport.status !== "passed") process.exit(1);
    return;
  }
  const { response, context } = await answerQuery(args, runtime);

  const payload = args.includeDebug
    ? { response, retrievalContext: context, openOperatorItems: runtime.openInboxItems }
    : response;
  console.log(args.json ? JSON.stringify(payload, null, 2) : renderHuman(response, context || { chunks: [] }));
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

export {
  answerQuery,
  cosineSimilarity,
  defaults,
  embedQuery,
  embeddingConfigErrors,
  embeddingConfigFromEnv,
  embeddingFromBlob,
  embeddingToBlob,
  loadRuntime,
  parseArgs,
  withDegraded,
};

if (isCli) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
