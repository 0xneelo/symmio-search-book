/**
 * Markdown → HTML for reader page bodies, ported 1:1 from index.html
 * L2697–3015 (escapeHtml, inlineMarkdown, slugifyHeading, stripHtml,
 * markdownToHtml). Output is escaped before markup injection — same XSS
 * posture as the old renderer; consumed via dangerouslySetInnerHTML.
 */

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="source-chip" href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

export function slugifyHeading(value: string): string {
  return (
    String(value || '')
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'section'
  )
}

export function stripHtml(value: string): string {
  return String(value || '').replace(/<[^>]+>/g, '')
}

export function markdownToHtml(markdown: string): string {
  const lines = String(markdown || '')
    .replace(/^# .*\n+/, '')
    .split('\n')
  const blocks: string[] = []
  let paragraph: string[] = []
  let list: string[] = []
  let table: string[] = []
  const headingCounts: Record<string, number> = {}
  const headingId = (label: string) => {
    const base = slugifyHeading(label)
    headingCounts[base] = (headingCounts[base] || 0) + 1
    return headingCounts[base] === 1 ? base : `${base}-${headingCounts[base]}`
  }

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`)
    paragraph = []
  }
  const flushList = () => {
    if (!list.length) return
    blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`)
    list = []
  }
  const flushTable = () => {
    if (!table.length) return
    const rows = table
      .filter((row) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(row))
      .map((row, index) => {
        const cells = row
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim())
        const tag = index === 0 ? 'th' : 'td'
        return `<tr>${cells.map((cell) => `<${tag}>${inlineMarkdown(cell)}</${tag}>`).join('')}</tr>`
      })
      .join('')
    blocks.push(`<table>${rows}</table>`)
    table = []
  }
  const flushAll = () => {
    flushParagraph()
    flushList()
    flushTable()
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      flushAll()
      continue
    }
    if (trimmed.startsWith('|') && trimmed.includes('|')) {
      flushParagraph()
      flushList()
      table.push(trimmed)
      continue
    }
    if (/^- /.test(trimmed)) {
      flushParagraph()
      flushTable()
      list.push(trimmed.replace(/^- /, ''))
      continue
    }
    if (/^###\s+/.test(trimmed)) {
      flushAll()
      const label = trimmed.replace(/^###\s+/, '')
      blocks.push(`<h3 id="${escapeHtml(headingId(label))}">${inlineMarkdown(label)}</h3>`)
      continue
    }
    if (/^##\s+/.test(trimmed)) {
      flushAll()
      const label = trimmed.replace(/^##\s+/, '')
      blocks.push(`<h2 id="${escapeHtml(headingId(label))}">${inlineMarkdown(label)}</h2>`)
      continue
    }
    paragraph.push(trimmed)
  }
  flushAll()
  return blocks.join('')
}

export interface TocItem {
  level: string
  id: string
  label: string
}

/** L3914 — TOC extracted from the rendered h2/h3 ids. */
export function tocFromHtml(body: string): TocItem[] {
  return [...body.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)].map((match) => ({
    level: match[1],
    id: match[2],
    label: stripHtml(match[3]),
  }))
}
