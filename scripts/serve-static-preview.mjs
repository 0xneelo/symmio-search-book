#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const searchBookRoot = path.resolve(__dirname, "..");

const defaults = {
  host: process.env.SEARCH_BOOK_STATIC_HOST || "127.0.0.1",
  port: Number(process.env.SEARCH_BOOK_STATIC_PORT || 8788),
  root: searchBookRoot,
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function parseArgs(argv) {
  const args = { ...defaults };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--host") args.host = argv[++index] || "";
    else if (arg === "--port") args.port = Number(argv[++index]);
    else if (arg === "--root") args.root = path.resolve(argv[++index] || "");
    else if (arg === "--help") {
      console.log(`Usage:
  node scripts/serve-static-preview.mjs [--host 127.0.0.1] [--port 8788]

Environment:
  SEARCH_BOOK_STATIC_HOST=127.0.0.1
  SEARCH_BOOK_STATIC_PORT=8788
`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.host) throw new Error("--host is required.");
  if (!Number.isInteger(args.port) || args.port < 0 || args.port > 65535) {
    throw new Error("--port must be an integer from 0 to 65535.");
  }
  return args;
}

function sendText(response, statusCode, text, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  response.end(text);
}

function safeJoin(base, pathname) {
  const filePath = path.resolve(base, `.${pathname}`);
  const relative = path.relative(base, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return filePath;
}

function resolveStaticFile(root, requestUrl) {
  const url = new URL(requestUrl || "/", "http://search-book.local");
  const rawPathname = url.pathname === "/" ? "/index.html" : url.pathname;
  let pathname = "";
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    return null;
  }
  return safeJoin(root, pathname);
}

/**
 * Overlay resolution for the Field Manual v2 build (SYN-356): the repo root
 * stays canonical; `web/dist` serves the new app. `/v2/` is the explicit new
 * front door pre-cutover; `/assets/*` and `/page/<id>/` fall through to
 * web/dist (the old site has no such paths). Once the old index.html is
 * retired after sign-off, `/` falls through to the new app automatically.
 */
function candidateStaticFiles(root, requestUrl) {
  const url = new URL(requestUrl || "/", "http://search-book.local");
  let pathname = "";
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
  const webDist = path.join(root, "web", "dist");
  const candidates = [];
  if (pathname === "/" || pathname === "/index.html") {
    candidates.push(safeJoin(root, "/index.html"));
    candidates.push(safeJoin(webDist, "/index.html"));
  } else if (pathname === "/v2" || pathname === "/v2/" || pathname.startsWith("/v2/")) {
    const rest = pathname.replace(/^\/v2\/?/, "/");
    const target = rest === "/" ? "/index.html" : rest;
    candidates.push(safeJoin(webDist, target));
    if (!path.extname(target)) {
      candidates.push(safeJoin(webDist, `${target.replace(/\/$/, "")}/index.html`));
    }
  } else {
    candidates.push(safeJoin(root, pathname));
    candidates.push(safeJoin(webDist, pathname));
    if (!path.extname(pathname)) {
      candidates.push(safeJoin(webDist, `${pathname.replace(/\/$/, "")}/index.html`));
    }
  }
  return candidates.filter(Boolean);
}

function createStaticPreviewServer(root) {
  return http.createServer((request, response) => {
    if (!["GET", "HEAD"].includes(request.method || "")) {
      sendText(response, 405, "Method not allowed");
      return;
    }

    const candidates = candidateStaticFiles(root, request.url);
    if (!candidates) {
      sendText(response, 400, "Bad request");
      return;
    }

    let filePath = null;
    let stats = null;
    for (const candidate of candidates) {
      try {
        const candidateStats = fs.statSync(candidate);
        if (candidateStats.isFile()) {
          filePath = candidate;
          stats = candidateStats;
          break;
        }
      } catch {
        // try the next overlay candidate
      }
    }

    if (!filePath || !stats) {
      sendText(response, 404, "Not found");
      return;
    }

    const contentType = contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, {
      "content-type": contentType,
      "content-length": stats.size,
      "cache-control": "no-store",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root);
  const indexPath = path.join(root, "index.html");
  const webDistIndexPath = path.join(root, "web", "dist", "index.html");
  if (!fs.existsSync(indexPath) && !fs.existsSync(webDistIndexPath)) {
    throw new Error(`No front door found: neither ${indexPath} nor ${webDistIndexPath} exists.`);
  }

  const server = createStaticPreviewServer(root);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(args.port, args.host, resolve);
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : args.port;
  console.log(JSON.stringify({
    status: "listening",
    service: "search-book-static-preview",
    url: `http://${args.host}:${port}/`,
    root,
  }, null, 2));
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

export {
  candidateStaticFiles,
  createStaticPreviewServer,
  defaults,
  parseArgs,
  resolveStaticFile,
};

if (isCli) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
