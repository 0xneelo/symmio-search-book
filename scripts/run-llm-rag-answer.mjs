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
  operatorInbox: path.join(repoRoot, "_specs", "app-docs", "OPERATOR-INBOX.md"),
  mode: "extractive",
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
    id: "referral-depth",
    reason: "operator-decision-required",
    status: "operator-blocked-refusal",
    gapId: "G-003",
    operatorItemIds: [3],
    patterns: [/5 .*15 .*level/i, /15 .*5 .*level/i, /referral depth/i, /historical backfill/i],
    message: "Referral-depth wording is operator-blocked until the 5-versus-15-level contradiction is resolved.",
  },
  {
    id: "revenue-economics",
    reason: "operator-decision-required",
    status: "operator-blocked-refusal",
    gapId: "G-004",
    operatorItemIds: [1],
    patterns: [/exact fee/i, /fee rate/i, /referrer share/i, /production payout/i, /which revenue sources are live/i],
    message: "Final revenue disclosure is operator-blocked until current and planned revenue inputs are approved.",
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
    id: "add-token-info",
    reason: "source-family-missing",
    status: "operator-blocked-refusal",
    gapId: "G-012",
    operatorItemIds: [9],
    patterns: [/add token info/i, /project-managed token metadata/i],
    message: "The Add Token Info source is parked until official source text is available.",
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
    patterns: [/superflow/i, /\bsshe\b/i],
    message: "The canonical SuperFlow/SSHE source family is not identified yet.",
  },
  {
    id: "opyn",
    reason: "source-family-missing",
    status: "operator-blocked-refusal",
    gapId: "G-002",
    operatorItemIds: [8],
    patterns: [/opyn/i],
    message: "Official Opyn docs are unavailable in the current competitive source set.",
  },
];

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--query") args.query = argv[++index] || "";
    else if (arg === "--mode") args.mode = argv[++index] || "";
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
  if (!args.query.trim()) throw new Error("Missing required --query value.");
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

Modes:
  extractive  Scan the real answer chunks and return a grounded cited answer without a model call.
  llm         Use an approved OpenAI-compatible endpoint from env after retrieval and post-validate citations.

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

  for (const rule of riskRules) {
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
  const answer = answerChunks.map((chunk, index) => {
    const citation = citations[index];
    return `${excerpt(chunk.text)} [${citation.sourceKey}; ${chunk.id}]`;
  }).join("\n\n");

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

function assertLlmConfig(config) {
  const missing = [];
  if (config.apiStyle !== "openai-compatible") missing.push("SEARCH_BOOK_LLM_API_STYLE=openai-compatible");
  if (!config.endpoint) missing.push("SEARCH_BOOK_LLM_ENDPOINT");
  if (!config.model) missing.push("SEARCH_BOOK_LLM_MODEL");
  if (!config.apiKey) missing.push("SEARCH_BOOK_LLM_API_KEY");
  if (config.allowExternalContext !== "true") missing.push("SEARCH_BOOK_LLM_ALLOW_EXTERNAL_CONTEXT=true");
  if (missing.length) {
    throw new Error(
      `LLM mode requires approved runtime configuration from OPERATOR-INBOX #11. Missing: ${missing.join(", ")}`,
    );
  }
}

function contextForPrompt(context) {
  return context.chunks.map((chunk) => ({
    chunkId: chunk.id,
    pageId: chunk.pageId,
    pageTitle: chunk.title,
    pageState: chunk.pageState,
    sourceKeys: chunk.sourceKeys,
    sourceUrls: chunk.sourceUrls,
    text: chunk.text,
  }));
}

function extractJsonObject(value) {
  const text = String(value || "").trim();
  if (text.startsWith("{")) return JSON.parse(text);
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return JSON.parse(fenced[1]);
  throw new Error("LLM response did not contain a JSON object.");
}

async function llmAnswer(args, runtime, context) {
  const config = llmConfigFromEnv();
  assertLlmConfig(config);
  if (!context.chunks.length) {
    return refusal(args, {
      reason: "no-grounded-context",
      message: "No grounded search-book context matched that question.",
    });
  }

  const body = {
    model: config.model,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: [
          "You answer only from the supplied Vibe x Symmio search-book context.",
          "Return JSON matching SearchBookAnswerResponse: requestId,status,answer,primaryPageId,citations,events.",
          "Every substantive paragraph must be supported by citations using supplied chunk ids and source keys.",
          "Do not use latent knowledge. Refuse if the supplied context is insufficient.",
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify({
          requestId: args.requestId,
          query: args.query,
          exactRoute: context.exactRoute,
          glossaryRoute: context.glossaryRoute,
          candidatePages: context.candidatePages,
          chunks: contextForPrompt(context),
        }),
      },
    ],
  };

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`LLM endpoint returned ${response.status}: ${detail.slice(0, 500)}`);
  }
  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content || payload.output_text || "";
  const answer = extractJsonObject(content);
  return validateResponseOrThrow(answer, context, runtime);
}

function validateResponseOrThrow(response, context, runtime) {
  const failures = [];
  if (!response || typeof response !== "object") failures.push("response-not-object");
  if (response.status !== "answered") failures.push("status-not-answered");
  if (!response.requestId) failures.push("request-id-missing");
  if (!response.answer) failures.push("answer-missing");
  const primary = runtime.pageById.get(response.primaryPageId);
  if (!primary) failures.push("primary-page-missing");
  if (primary && !["candidate", "published"].includes(primary.pageState)) failures.push("primary-page-state-disallowed");
  if (!(response.citations || []).length) failures.push("citations-missing");
  const allowedChunkIds = new Set(context.chunks.map((chunk) => chunk.id));
  for (const citation of response.citations || []) {
    const citedPage = runtime.pageById.get(citation.pageId);
    if (!citedPage) failures.push("citation-page-missing");
    if (citedPage && !["candidate", "published", "source-companion"].includes(citedPage.pageState)) {
      failures.push("citation-page-state-disallowed");
    }
    if (!runtime.sourceByKey[citation.sourceKey]) failures.push("citation-source-missing");
    if (!runtime.sourceByKey[citation.sourceKey]?.href && !citation.sourceHref) failures.push("citation-source-href-missing");
    for (const chunkId of citation.chunkIds || []) {
      if (!allowedChunkIds.has(chunkId)) failures.push("citation-chunk-outside-context");
      const chunk = runtime.chunkById.get(chunkId);
      if (!chunk) failures.push("citation-chunk-missing");
      if (chunk && chunk.pageId !== citation.pageId) failures.push("citation-chunk-page-mismatch");
      if (chunk && !(chunk.sourceKeys || []).includes(citation.sourceKey)) failures.push("citation-chunk-source-mismatch");
    }
  }
  if (failures.length) throw new Error(`Answer validation failed: ${unique(failures).join(", ")}`);
  return response;
}

function renderHuman(response, context) {
  if (response.status !== "answered") {
    return `${response.status}: ${response.message || response.refusalReason}`;
  }
  const citations = (response.citations || [])
    .map((citation, index) => `${index + 1}. ${citation.pageTitle} (${citation.sourceKey}) ${citation.sourceHref}`)
    .join("\n");
  return `${response.answer}\n\nPrimary page: ${response.primaryPageId}\n\nCitations:\n${citations}\n\nContext chunks: ${context.chunks.map((chunk) => chunk.id).join(", ")}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const runtime = loadRuntime(defaults);
  const preflightResponse = preflight(args, runtime);
  const context = preflightResponse ? null : retrieve(args, runtime);
  const response = preflightResponse || (args.mode === "llm"
    ? await llmAnswer(args, runtime, context)
    : extractiveAnswer(args, runtime, context));

  const payload = args.includeDebug
    ? { response, retrievalContext: context, openOperatorItems: runtime.openInboxItems }
    : response;
  console.log(args.json ? JSON.stringify(payload, null, 2) : renderHuman(response, context || { chunks: [] }));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
