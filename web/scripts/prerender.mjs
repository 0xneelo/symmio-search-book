/**
 * SSG prerender (SYN-353): after `vite build` (client → dist/) and
 * `vite build --ssr` (server → dist-server/), render every public reader page
 * to dist/page/<id>/index.html. The static HTML carries the full chapter for
 * first paint; the client bundle boots on load and hydrates interactivity
 * (voting, crosslink nav) from the same route.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(__dirname, '..')
const distDir = path.join(webRoot, 'dist')
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

// answer-corpus.js assigns window.SearchBookCorpus; give node a window.
globalThis.window = globalThis

const { listReaderPageIds, renderPage } = await import(
  path.join(webRoot, 'dist-server', 'entry-server.js')
)

const ids = await listReaderPageIds()
let written = 0
for (const id of ids) {
  const rendered = await renderPage(id)
  if (!rendered) continue
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(rendered.title)} — Vibe × SYMM Field Manual</title>`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`)
  const outDir = path.join(distDir, 'page', id)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  written += 1
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

console.log(JSON.stringify({ status: 'prerendered', pages: written, manifestCandidates: ids.length }))
if (!written || written !== ids.length) {
  console.error(`Prerender incomplete: wrote ${written} of ${ids.length} pages.`)
  process.exit(1)
}
