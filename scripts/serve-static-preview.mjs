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
  node src/search-book/scripts/serve-static-preview.mjs [--host 127.0.0.1] [--port 8788]

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

function resolveStaticFile(root, requestUrl) {
  const url = new URL(requestUrl || "/", "http://search-book.local");
  const rawPathname = url.pathname === "/" ? "/index.html" : url.pathname;
  let pathname = "";
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    return null;
  }
  const filePath = path.resolve(root, `.${pathname}`);
  const relative = path.relative(root, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return filePath;
}

function createStaticPreviewServer(root) {
  return http.createServer((request, response) => {
    if (!["GET", "HEAD"].includes(request.method || "")) {
      sendText(response, 405, "Method not allowed");
      return;
    }

    const filePath = resolveStaticFile(root, request.url);
    if (!filePath) {
      sendText(response, 400, "Bad request");
      return;
    }

    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch {
      sendText(response, 404, "Not found");
      return;
    }

    if (!stats.isFile()) {
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
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Search Book index.html not found at ${indexPath}`);
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
