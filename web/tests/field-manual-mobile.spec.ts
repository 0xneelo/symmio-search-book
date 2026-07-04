import { expect, test } from '@playwright/test'

/**
 * M8.1 mobile smokes (SYN-360) — 375px viewport with touch. Covers the six
 * acceptance requirements: drawer nav, 1-col reflow / no horizontal scroll,
 * ask→answer→vote incl. dismiss-guard, reader page-vote, §10 hard rules.
 */

const SERVICE = 'http://127.0.0.1:8792'
const ASK_PLACEHOLDER = 'Ask anything — points, invites, revenue, payouts…'
const READER_ID = 'authored-active-risk-management-vs-passive-physics'

test.use({ viewport: { width: 375, height: 812 }, hasTouch: true })

async function serviceTotals() {
  const res = await fetch(`${SERVICE}/api/search-book/insights`)
  const payload = await res.json()
  return payload.totals || {}
}

async function assertNoHorizontalScroll(page: import('@playwright/test').Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement
    const pane = document.querySelector('main > .fm-pane')?.parentElement
    return {
      doc: doc.scrollWidth - doc.clientWidth,
      pane: pane ? pane.scrollWidth - pane.clientWidth : 0,
    }
  })
  expect(overflow.doc).toBeLessThanOrEqual(0)
  expect(overflow.pane).toBeLessThanOrEqual(0)
}

test.describe('mobile layout', () => {
  test('cover reflows single-column with no horizontal scroll', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1.fm-h1-cover')).toBeVisible({ timeout: 20_000 })
    // H1 scales below its 74px desktop size and fits the viewport.
    const h1 = await page.locator('h1.fm-h1-cover').boundingBox()
    expect(h1!.width).toBeLessThanOrEqual(375)
    const fontSize = await page
      .locator('h1.fm-h1-cover')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeLessThan(74)
    await assertNoHorizontalScroll(page)
  })

  test('reader page reflows to one column with no horizontal scroll', async ({ page }) => {
    await page.goto(`/?page=${READER_ID}`)
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
    const cols = await page
      .locator('.fm-reader-grid')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length)
    expect(cols).toBe(1)
    await assertNoHorizontalScroll(page)
  })

  test('DESIGN.MD hard rules hold on mobile: square corners, hard shadows, two typefaces', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('ASK THE MANUAL')).toBeVisible({ timeout: 20_000 })
    const styles = await page.evaluate(() => {
      const pick = (el: Element | null) => {
        if (!el) return null
        const s = getComputedStyle(el)
        return { radius: s.borderRadius, shadow: s.boxShadow, font: s.fontFamily }
      }
      const askPanel = [...document.querySelectorAll('div')].find(
        (d) => getComputedStyle(d).borderColor === 'rgb(46, 107, 255)' && getComputedStyle(d).borderWidth === '2px',
      )
      return {
        askPanel: pick(askPanel || null),
        toggle: pick(document.querySelector('.fm-rail-toggle')),
        body: getComputedStyle(document.body).fontFamily,
      }
    })
    expect(styles.askPanel?.radius).toBe('0px')
    expect(styles.toggle?.radius).toBe('0px')
    // Hard offset shadow: zero blur radius (third length is 0px).
    expect(styles.toggle?.shadow).toMatch(/rgba?\([^)]+\) 0px 4px 0px/)
    expect(styles.body).toContain('Poppins')
  })
})

test.describe('mobile drawer', () => {
  test('toggle opens the 272px drawer; backdrop, Escape and nav close it', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.fm-rail-toggle')).toBeVisible({ timeout: 20_000 })

    // Open via the floating toggle; the panel expands and labels appear.
    await page.locator('.fm-rail-toggle').click()
    await expect(page.locator('.snav.is-open')).toBeVisible()
    // The width transition runs 0.3s — poll until it settles at 272px.
    await expect
      .poll(() => page.locator('.snav').evaluate((el) => Math.round(el.getBoundingClientRect().width)))
      .toBe(272)
    await expect(page.locator('.snav .navname').first()).toBeVisible()

    // Backdrop click closes.
    await page.locator('.fm-backdrop').click({ position: { x: 350, y: 400 } })
    await expect(page.locator('.snav.is-open')).toHaveCount(0)

    // Escape closes.
    await page.locator('.fm-rail-toggle').click()
    await expect(page.locator('.snav.is-open')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.snav.is-open')).toHaveCount(0)

    // Nav click navigates and closes the drawer.
    await page.locator('.fm-rail-toggle').click()
    await page.locator('.snav').getByRole('button', { name: /Glossary/ }).click()
    await expect(page).toHaveURL(/variant=glossary/)
    await expect(page.locator('.snav.is-open')).toHaveCount(0)
  })
})

test.describe('mobile voting', () => {
  test('ask → answer → vote with one-shot lock at 375px (service round-trip)', async ({ page }) => {
    const before = await serviceTotals()
    const ratingPosts: number[] = []
    page.on('response', (r) => {
      if (r.url().includes('/api/search-book/rating')) ratingPosts.push(r.status())
    })
    await page.goto(`/?service=${SERVICE}`)
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('How is my revenue calculated?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })
    await assertNoHorizontalScroll(page)

    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    await page.getByRole('button', { name: 'USEFUL' }).click({ force: true })
    await page.waitForTimeout(400)
    expect(ratingPosts).toEqual([200])
    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
  })

  test('dismiss-guard modal is usable at 375px', async ({ page }) => {
    await page.goto(`/?service=${SERVICE}`)
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('When do referral points credit?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })

    await page.getByRole('button', { name: 'DISMISS ×' }).click()
    await expect(page.getByText('HOLD ON —')).toBeVisible()
    const dialog = await page.getByRole('dialog').boundingBox()
    expect(dialog!.width).toBeLessThanOrEqual(375)

    await page.getByRole('dialog').getByRole('button', { name: 'NEEDS WORK' }).click()
    await expect(page.getByRole('dialog').getByText('✓ logged — thank you')).toBeVisible()
    await expect(page.getByText('HOLD ON —')).not.toBeVisible({ timeout: 3_000 })
  })

  test('reader page-vote works at 375px', async ({ page }) => {
    const before = await serviceTotals()
    await page.goto(`/?service=${SERVICE}&page=${READER_ID}`)
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
  })
})
