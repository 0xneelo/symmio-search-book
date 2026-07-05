import { expect, test } from '@playwright/test'

/**
 * Symmiopedia v3 hard-rules gate (SYN-371, DESIGN.MD Part B §8 via Part A):
 * on EVERY public surface — portal, article, search results, reference desk —
 * zero chroma outside the link colors and the #a7d7f9 chrome line, system
 * fonts only (no webfont loads), no radius above 2px, no shadows on chrome,
 * no Wikipedia branding.
 */

const PUBLIC_ROUTES: Array<[string, string, string]> = [
  ['portal', '/', 'text=SYMMIOPEDIA'],
  ['article', '/?page=authored-ecosystem-synergy-map', '.wk-content h1'],
  ['search-results', '/?search=revenue+split+epochs', '.wk-result-title'],
  ['reference-desk', '/?ask=How%20do%20I%20get%20more%20invites%3F', '.wk-answer'],
]

// Sanctioned chroma (DESIGN.MD §2): links, red links, the chrome line, plus
// the answer-panel palette from the operator amendment 2026-07-04. Mirrors
// the inline set inside the page.evaluate below (which cannot close over
// this const) — keep the two in sync.
const ALLOWED_CHROMA = new Set([
  '6,69,173',
  '51,102,187',
  '186,0,0',
  '167,215,249',
  '206,223,242',
  '163,176,191',
  '51,102,204',
  '42,75,141',
  '179,36,36',
  '20,134,109',
])

for (const [name, route, readySelector] of PUBLIC_ROUTES) {
  test.describe(`hard rules — ${name}`, () => {
    test('no webfont loads; zero chroma; ≤2px radii; no chrome shadows; no Wikipedia branding', async ({ page }) => {
      const fontRequests: string[] = []
      page.on('request', (request) => {
        if (request.resourceType() === 'font' || /\.(woff2?|ttf|otf|eot)(\?|$)/.test(request.url())) {
          fontRequests.push(request.url())
        }
      })

      await page.goto(route)
      await expect(page.locator(readySelector).first()).toBeVisible({ timeout: 20_000 })
      await page.waitForTimeout(500)

      // System fonts only — the page must not fetch a single font file.
      expect(fontRequests).toEqual([])

      // No Wikipedia branding anywhere in the document.
      const html = await page.content()
      expect(html.toLowerCase()).not.toContain('wikipedia')

      const violations = await page.evaluate(() => {
        const problems: string[] = []
        const parseRgb = (value: string): [number, number, number, number] | null => {
          const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(value)
          if (!match) return null
          return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])]
        }
        const allowed = new Set([
          '6,69,173', // links
          '51,102,187', // external links
          '186,0,0', // red links
          '167,215,249', // chrome line
          // Answer-panel palette — operator amendment 2026-07-04
          // (docs/goals/symmiopedia-v3/comp/answer-page.html):
          '206,223,242', // #cedff2 title bar / progress band
          '163,176,191', // #a3b0bf panel + band borders
          '51,102,204', // #3366cc Useful button
          '42,75,141', // #2a4b8d Useful pressed
          '179,36,36', // #b32424 Needs-work pressed
          '20,134,109', // #14866d rating-logged check
        ])
        const isSanctioned = (value: string): boolean => {
          const rgb = parseRgb(value)
          if (!rgb) return true // transparent / none / keyword
          const [r, g, b, a] = rgb
          if (a === 0) return true
          // Neutral: near-gray within a small warmth tolerance (the legacy
          // Vector palette is slightly cool: #eaecf0, #a2a9b1, #54595d …).
          const spread = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b))
          if (spread <= 20) return true
          return allowed.has(`${r},${g},${b}`)
        }
        const root = document.querySelector('.wiki')
        if (!root) return ['no .wiki root found']
        const elements = [root, ...root.querySelectorAll('*')] as Element[]
        for (const el of elements) {
          if (el.closest('svg')) continue // globe artwork is spec'd separately (§5)
          const style = getComputedStyle(el)
          for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor'] as const) {
            if (!isSanctioned(style[prop])) {
              problems.push(`${el.tagName}.${el.className}: ${prop}=${style[prop]}`)
            }
          }
          // ≤2px radius ceiling.
          for (const radius of style.borderRadius.split(' ')) {
            const px = parseFloat(radius)
            if (!Number.isNaN(px) && px > 2) {
              problems.push(`${el.tagName}.${el.className}: radius=${style.borderRadius}`)
            }
          }
          // No shadows on chrome (SVG figure filters are not CSS shadows).
          if (style.boxShadow && style.boxShadow !== 'none') {
            problems.push(`${el.tagName}.${el.className}: boxShadow=${style.boxShadow}`)
          }
          if (problems.length > 25) break
        }
        return problems
      })
      expect(violations).toEqual([])
    })
  })
}
