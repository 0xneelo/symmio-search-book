#!/usr/bin/env node

const defaultQuestion = "What is Vibe Trading?";
const defaultPageId = "authored-vibe-product-overview";
const validModes = new Set(["extractive", "llm"]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function usage() {
  return `Usage:
  node scripts/smoke-deployment.mjs --site-url <url> [--service-url <url>] [--mode extractive|llm] [--write]

Environment fallbacks:
  SEARCH_BOOK_DEPLOYMENT_SITE_URL
  SEARCH_BOOK_ANSWER_ENGINE_URL

By default this smoke is read-only. Pass --write to create one answer event and rating
against the configured answer-engine service.`;
}

function parseArgs(argv) {
  const args = {
    siteUrl: process.env.SEARCH_BOOK_DEPLOYMENT_SITE_URL || "",
    serviceUrl: process.env.SEARCH_BOOK_ANSWER_ENGINE_URL || "",
    mode: "extractive",
    write: false,
    query: defaultQuestion,
    expectedPageId: defaultPageId,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--write") {
      args.write = true;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`${arg} requires a value.\n${usage()}`);
    if (arg === "--site-url") args.siteUrl = next;
    else if (arg === "--service-url") args.serviceUrl = next;
    else if (arg === "--mode") args.mode = next;
    else if (arg === "--query") args.query = next;
    else if (arg === "--expected-page-id") args.expectedPageId = next;
    else throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    index += 1;
  }
  args.siteUrl = normalizeBaseUrl(args.siteUrl, "site URL");
  if (args.serviceUrl) args.serviceUrl = normalizeBaseUrl(args.serviceUrl, "service URL");
  if (!validModes.has(args.mode)) throw new Error("--mode must be extractive or llm.");
  if (args.write && !args.serviceUrl) throw new Error("--write requires --service-url or SEARCH_BOOK_ANSWER_ENGINE_URL.");
  return args;
}

function normalizeBaseUrl(value, label) {
  const raw = String(value || "").trim();
  if (!raw) {
    if (label === "site URL") throw new Error(`Missing --site-url or SEARCH_BOOK_DEPLOYMENT_SITE_URL.\n${usage()}`);
    return "";
  }
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid ${label}: ${raw}`);
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error(`${label} must use http or https.`);
  url.hash = "";
  url.search = "";
  return url.toString().replace(/\/$/, "");
}

function withSearchParams(basePath, params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  }
  const serialized = query.toString();
  return serialized ? `${basePath}?${serialized}` : basePath;
}

async function requestText(baseUrl, pathname, options = {}) {
  const url = `${baseUrl}${pathname}`;
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(`${url} request failed: ${error.message}`);
  }
  return {
    statusCode: response.status,
    headers: response.headers,
    contentType: response.headers.get("content-type") || "",
    body: await response.text(),
  };
}

async function requestJson(baseUrl, pathname, options = {}) {
  const url = `${baseUrl}${pathname}`;
  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body ? { "content-type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    throw new Error(`${url} request failed: ${error.message}`);
  }
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${pathname} returned non-JSON body: ${text.slice(0, 200)}`);
  }
  return {
    statusCode: response.status,
    headers: response.headers,
    payload,
  };
}

function headerAllowsOrigin(headerValue, expectedOrigin) {
  return headerValue === "*" || headerValue === expectedOrigin;
}

async function smokeStaticSite({ siteUrl, serviceUrl, mode, expectedPageId }) {
  const homePath = serviceUrl ? withSearchParams("/", { service: serviceUrl, serviceMode: mode }) : "/";
  const home = await requestText(siteUrl, homePath);
  assert(home.statusCode === 200, `site home returned ${home.statusCode}.`);
  assert(home.contentType.includes("text/html"), "site home did not return HTML.");
  assert(home.body.includes("Vibe Docs Search Book Prototype"), "site home did not identify the Search Book prototype.");
  assert(home.body.includes("Ask the docs"), "site home did not render the Ask the docs action.");
  assert(home.body.includes("Search insights"), "site home did not render Search insights navigation.");
  assert(home.body.includes("./data/search-index.js"), "site home did not reference the search index asset.");
  if (serviceUrl) assert(home.body.includes("searchBookPrototype.serviceUrl"), "site home did not include service bridge state.");

  const exactPage = await requestText(siteUrl, withSearchParams("/index.html", {
    page: expectedPageId,
    service: serviceUrl,
    serviceMode: serviceUrl ? mode : "",
  }));
  assert(exactPage.statusCode === 200, `exact page URL returned ${exactPage.statusCode}.`);
  assert(exactPage.body.includes("Vibe Docs Search Book Prototype"), "exact page URL did not serve the Search Book app.");

  const searchIndex = await requestText(siteUrl, "/data/search-index.js");
  assert(searchIndex.statusCode === 200, `search index asset returned ${searchIndex.statusCode}.`);
  assert(searchIndex.body.includes("window.SearchBookIndex"), "search index asset did not expose SearchBookIndex.");

  const questionRoutes = await requestText(siteUrl, "/data/question-routes.js");
  assert(questionRoutes.statusCode === 200, `question routes asset returned ${questionRoutes.statusCode}.`);
  assert(questionRoutes.body.includes("window.SearchBookQuestionRoutes"), "question routes asset did not expose SearchBookQuestionRoutes.");

  const readerData = await requestText(siteUrl, "/data/authored-pages.js");
  assert(readerData.statusCode === 200, `authored pages asset returned ${readerData.statusCode}.`);
  assert(readerData.body.includes("window.SearchBookAuthored"), "authored pages asset did not expose SearchBookAuthored.");

  return {
    home: "ok",
    exactPageUrl: "ok",
    searchIndex: "ok",
    questionRoutes: "ok",
    authoredPages: "ok",
  };
}

async function smokeServiceReadOnly({ serviceUrl, siteUrl, mode }) {
  if (!serviceUrl) return null;
  const siteOrigin = new URL(siteUrl).origin;
  const health = await requestJson(serviceUrl, "/health");
  assert(health.statusCode === 200, `service health returned ${health.statusCode}.`);
  assert(health.payload.status === "ok", `service health status was ${health.payload.status}.`);
  assert(health.payload.service === "search-book-answer-engine", "service health did not identify the answer-engine service.");

  const preflight = await requestJson(serviceUrl, "/api/search-book/answer", {
    method: "OPTIONS",
    headers: {
      origin: siteOrigin,
      "access-control-request-method": "POST",
      "access-control-request-headers": "content-type",
    },
  });
  assert(preflight.statusCode === 204, `service CORS preflight returned ${preflight.statusCode}.`);
  assert(headerAllowsOrigin(preflight.headers.get("access-control-allow-origin") || "", siteOrigin), "service CORS preflight did not allow the site origin.");
  assert((preflight.headers.get("access-control-allow-methods") || "").includes("POST"), "service CORS preflight did not allow POST.");
  assert((preflight.headers.get("access-control-allow-headers") || "").toLowerCase().includes("content-type"), "service CORS preflight did not allow content-type.");

  const insights = await requestJson(serviceUrl, "/api/search-book/insights", {
    headers: { origin: siteOrigin },
  });
  assert(insights.statusCode === 200, `service insights returned ${insights.statusCode}.`);
  assert(insights.payload.status === "ok", `service insights status was ${insights.payload.status}.`);

  return {
    health: "ok",
    corsPreflight: "ok",
    insights: "ok",
    defaultMode: health.payload.defaultMode,
    requestedMode: mode,
    totals: insights.payload.totals || {},
  };
}

async function smokeServiceWrite({ serviceUrl, siteUrl, mode, query, expectedPageId }) {
  const siteOrigin = new URL(siteUrl).origin;
  const requestId = `deployment-smoke-${Date.now()}`;
  const answer = await requestJson(serviceUrl, "/api/search-book/answer", {
    method: "POST",
    headers: { origin: siteOrigin },
    body: JSON.stringify({
      requestId,
      query,
      source: "deployment-smoke",
      mode,
    }),
  });
  assert(answer.statusCode === 200, `service answer returned ${answer.statusCode}.`);
  assert(headerAllowsOrigin(answer.headers.get("access-control-allow-origin") || "", siteOrigin), "service answer did not allow the site origin.");
  assert(answer.payload.status === "answered", `service answer status was ${answer.payload.status}.`);
  assert(answer.payload.primaryPageId === expectedPageId, `answer primaryPageId was ${answer.payload.primaryPageId}, expected ${expectedPageId}.`);
  assert(Array.isArray(answer.payload.citations) && answer.payload.citations.length > 0, "answer did not include citations.");
  assert(answer.payload.persisted?.id, "answer did not persist a question event.");

  const rating = await requestJson(serviceUrl, "/api/search-book/rating", {
    method: "POST",
    headers: { origin: siteOrigin },
    body: JSON.stringify({
      eventId: answer.payload.persisted.id,
      rating: "yes",
      note: "deployment smoke rating",
    }),
  });
  assert(rating.statusCode === 200, `service rating returned ${rating.statusCode}.`);
  assert(rating.payload.status === "recorded", `service rating status was ${rating.payload.status}.`);
  assert(rating.payload.persisted?.eventId === answer.payload.persisted.id, "rating did not attach to the answer event.");

  const insights = await requestJson(serviceUrl, "/api/search-book/insights", {
    headers: { origin: siteOrigin },
  });
  assert(insights.statusCode === 200, `post-write insights returned ${insights.statusCode}.`);
  assert((insights.payload.recent?.questions || []).some((item) => item.requestId === requestId), "post-write insights did not expose the smoke question.");

  return {
    answer: answer.payload.status,
    rating: rating.payload.status,
    primaryPageId: answer.payload.primaryPageId,
    citations: answer.payload.citations.length,
    requestId,
    persistedStatus: answer.payload.persisted.status,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const staticChecks = await smokeStaticSite(args);
  const serviceReadOnly = await smokeServiceReadOnly(args);
  const serviceWrite = args.write ? await smokeServiceWrite(args) : null;

  console.log(JSON.stringify({
    status: "passed",
    service: "search-book-deployment-smoke",
    siteUrl: args.siteUrl,
    serviceUrl: args.serviceUrl || null,
    mode: args.mode,
    writeEnabled: args.write,
    checks: {
      static: staticChecks,
      serviceReadOnly,
      serviceWrite,
    },
  }, null, 2));
}

try {
  await main();
} catch (error) {
  console.error(JSON.stringify({
    status: "failed",
    service: "search-book-deployment-smoke",
    message: error.message,
  }, null, 2));
  process.exitCode = 1;
}
