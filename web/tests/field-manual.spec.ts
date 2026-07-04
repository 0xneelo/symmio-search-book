import { expect, test } from '@playwright/test'

/**
 * M8 parity smokes (SYN-355): nav across all views, search→answer→vote
 * (persist + one-shot + dismiss-guard), page open → page-vote.
 * The service on :8792 is a real serve-answer-engine with a throwaway DB.
 */

const SERVICE = 'http://127.0.0.1:8792'
const ASK_PLACEHOLDER = 'Ask anything — points, invites, revenue, payouts…'

async function serviceTotals() {
  const res = await fetch(`${SERVICE}/api/search-book/insights`)
  const payload = await res.json()
  return payload.totals || {}
}

test.describe('navigation', () => {
  test('all six variants render and cycle', async ({ page }) => {
    const expectH1: Record<string, string> = {
      classic: 'Vibe×SYMM.',
      browse: 'Browse docs.',
      glossary: 'Glossary.',
      faq: 'FAQ routes.',
      journey: 'Journeys.',
      insights: 'Insights.',
    }
    for (const [variant, h1] of Object.entries(expectH1)) {
      await page.goto(`/?variant=${variant}`)
      await expect(page.locator('h1').first()).toHaveText(h1, { timeout: 20_000 })
    }
    // ArrowRight cycles classic → browse (same order as the old variants list).
    await page.goto('/?variant=classic')
    await expect(page.locator('h1').first()).toHaveText('Vibe×SYMM.')
    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/variant=browse/)
    await page.keyboard.press('ArrowLeft')
    await expect(page).toHaveURL(/variant=classic/)
  })

  test('sidebar INDEX navigates and marks active', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Glossary/ }).click()
    await expect(page).toHaveURL(/variant=glossary/)
    await expect(page.locator('.navrow[data-active="true"] .navname')).toHaveText('Glossary')
  })

  test('SSG page route serves static content and hydrates', async ({ page, request }) => {
    const pageId = 'authored-active-risk-management-vs-passive-physics'
    const raw = await request.get(`/page/${pageId}/`)
    const html = await raw.text()
    expect(html).toContain('class="reader-body"')
    expect(html).toContain('Active Risk Management')
    await page.goto(`/page/${pageId}/`)
    await expect(page.getByRole('button', { name: 'USEFUL' })).toBeVisible({ timeout: 20_000 })
  })

  test('?page= deep link renders the reader', async ({ page }) => {
    await page.goto('/?page=authored-active-risk-management-vs-passive-physics')
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
  })
})

test.describe('search → answer → vote (service round-trip)', () => {
  test('answer persists, vote reacts, one-shot lock holds', async ({ page }) => {
    const before = await serviceTotals()
    const ratingPosts: number[] = []
    page.on('response', (r) => {
      if (r.url().includes('/api/search-book/rating')) ratingPosts.push(r.status())
    })

    await page.goto(`/?service=${SERVICE}`)
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('How is my revenue calculated?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })

    // Optimistic reaction + confirmation + one-shot.
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    await expect(page.getByRole('button', { name: 'USEFUL' })).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    await page.getByRole('button', { name: 'USEFUL' }).click({ force: true })
    await page.waitForTimeout(500)
    expect(ratingPosts).toEqual([200])

    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
    expect(after.questions).toBeGreaterThan(before.questions || 0)
  })

  test('dismiss-guard blocks unrated dismissal; modal vote persists and auto-dismisses', async ({ page }) => {
    const before = await serviceTotals()
    await page.goto(`/?service=${SERVICE}`)
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('When do referral points credit?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })

    await page.getByRole('button', { name: 'DISMISS ×' }).click()
    await expect(page.getByText('HOLD ON —')).toBeVisible()

    // Backdrop click cancels (answer stays).
    await page.mouse.click(40, 500)
    await expect(page.getByText('HOLD ON —')).not.toBeVisible()
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible()

    // Re-open, rate NEEDS WORK from the modal → auto-dismiss after 850ms.
    await page.getByRole('button', { name: 'DISMISS ×' }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'NEEDS WORK' }).click()
    await expect(page.getByRole('dialog').getByText('✓ logged — thank you')).toBeVisible()
    await expect(page.getByText('HOLD ON —')).not.toBeVisible({ timeout: 3_000 })
    await expect(page.getByText('Routes your question to the nearest indexed figure.')).toBeVisible()

    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
  })

  test('local fallback ask records events without service 404s', async ({ page }) => {
    const ratingPosts: string[] = []
    page.on('request', (r) => {
      if (r.url().includes('/api/search-book/rating')) ratingPosts.push(r.url())
    })
    await page.goto('/') // no ?service= → localStorage mode
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('When do referral points credit?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/routed answer/).first()).toBeVisible({ timeout: 20_000 })
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const stored = await page.evaluate(() => ({
      questions: JSON.parse(localStorage.getItem('searchBookPrototype.questions') || '[]').length,
      ratings: JSON.parse(localStorage.getItem('searchBookPrototype.ratings') || '[]').length,
    }))
    expect(stored.questions).toBeGreaterThan(0)
    expect(stored.ratings).toBe(1)
    expect(ratingPosts).toEqual([]) // never POSTs local q-… ids (the SYN-352 fix)
  })
})

test.describe('page-vote', () => {
  test('reader page vote persists via /page-feedback', async ({ page }) => {
    const before = await serviceTotals()
    await page.goto(`/?service=${SERVICE}&page=authored-active-risk-management-vs-passive-physics`)
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
  })

  test('needs-work page vote records a gap (local mode)', async ({ page }) => {
    await page.goto('/?page=authored-active-risk-management-vs-passive-physics')
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
    await page.getByRole('button', { name: 'NEEDS WORK' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const gaps = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('searchBookPrototype.gaps') || '[]'),
    )
    expect(gaps[0]?.reason).toBe('page-feedback-needs-work')
  })
})
