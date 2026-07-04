import { expect, test } from '@playwright/test'

/**
 * M8 parity smokes (SYN-355): nav across all views, search→answer→vote
 * (persist + one-shot + dismiss-guard), page open → page-vote.
 * The service on :8792 is a real serve-answer-engine with a throwaway DB.
 */

const SERVICE = 'http://127.0.0.1:8792'
const ASK_PLACEHOLDER = 'Ask anything — points, invites, revenue, payouts…'
// Fixture value from playwright.config.ts — not a secret.
const ADMIN_TOKEN = 'pw-admin-gate-fixture'

async function serviceTotals() {
  const res = await fetch(`${SERVICE}/api/search-book/insights`, {
    headers: { 'x-search-book-admin-token': ADMIN_TOKEN },
  })
  const payload = await res.json()
  return payload.totals || {}
}

async function loginAdmin(page: import('@playwright/test').Page) {
  await expect(page.getByText('ADMIN ACCESS')).toBeVisible({ timeout: 20_000 })
  await page.getByPlaceholder('Operator token —').fill(ADMIN_TOKEN)
  await page.getByRole('button', { name: 'Unlock' }).click()
}

test.describe('navigation (public surface = §00 + reader, SYN-362)', () => {
  test('public nav shows only Cover & Ask; removed-view URLs redirect to cover', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1').first()).toHaveText('Vibe×SYMM.', { timeout: 20_000 })
    await expect(page.locator('.navrow')).toHaveCount(1)
    await expect(page.locator('.navrow .navname')).toHaveText('Cover & Ask')

    // The five removed views redirect to the cover and clean the URL.
    for (const variant of ['browse', 'glossary', 'faq', 'journey', 'insights']) {
      await page.goto(`/?variant=${variant}`)
      await expect(page.locator('h1').first()).toHaveText('Vibe×SYMM.', { timeout: 20_000 })
      expect(page.url()).not.toContain(`variant=${variant}`)
    }

    // Arrow cycling is a no-op with a single public section.
    await page.goto('/')
    await expect(page.locator('h1').first()).toHaveText('Vibe×SYMM.')
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(300)
    await expect(page.locator('h1').first()).toHaveText('Vibe×SYMM.')
    expect(page.url()).not.toContain('variant=browse')
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

test.describe('admin gate (SYN-362)', () => {
  test('unauthenticated: login panel instead of ops views; /insights feed returns 401', async ({ page }) => {
    await page.goto(`/?service=${SERVICE}&admin=1&variant=browse`)
    await expect(page.getByText('ADMIN ACCESS')).toBeVisible({ timeout: 20_000 })
    await expect(page.locator('h1.fm-h1-section')).toHaveCount(0)
    await expect(page.getByText('COMPENDIUM VOLUMES')).toHaveCount(0)

    // The sensitive feed is not fetchable without the token.
    const status = await page.evaluate(async (service) => {
      const res = await fetch(`${service}/api/search-book/insights`)
      return res.status
    }, SERVICE)
    expect(status).toBe(401)
  })

  test('wrong token is rejected server-side; correct token unlocks and persists', async ({ page }) => {
    await page.goto(`/?service=${SERVICE}&admin=1&variant=glossary`)
    await expect(page.getByText('ADMIN ACCESS')).toBeVisible({ timeout: 20_000 })
    await page.getByPlaceholder('Operator token —').fill('wrong-token')
    await page.getByRole('button', { name: 'Unlock' }).click()
    await expect(page.getByText('Token rejected by the answer-engine.')).toBeVisible()

    await page.getByPlaceholder('Operator token —').fill(ADMIN_TOKEN)
    await page.getByRole('button', { name: 'Unlock' }).click()
    await expect(page.locator('h1').first()).toHaveText('Glossary.', { timeout: 20_000 })

    // Session persists (localStorage) — reload lands straight on the view.
    await page.reload()
    await expect(page.locator('h1').first()).toHaveText('Glossary.', { timeout: 20_000 })

    // Admin nav shows all six sections and navigates within the admin area.
    await expect(page.locator('.navrow')).toHaveCount(6)
    await page.getByRole('button', { name: /Insights/ }).click()
    await expect(page).toHaveURL(/admin=1/)
    await expect(page.locator('h1').first()).toHaveText('Insights.', { timeout: 20_000 })
  })

  test('public vote flow tolerates the gated /insights (no visible failure)', async ({ page }) => {
    const before = await serviceTotals()
    await page.goto(`/?service=${SERVICE}`)
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('How is my revenue calculated?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
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

    // Optimistic reaction; SYN-364 thank-you dialog with a 15s mono countdown.
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByRole('dialog', { name: 'Rating logged — thank you' })).toBeVisible()
    await expect(page.getByText(/AUTO-CLOSING IN 1[0-5]s/)).toBeVisible()

    // One-shot: a direct re-click on the locked button must not re-POST; the
    // selected state is inverted to white. (element.click bypasses the overlay)
    await page.getByRole('button', { name: 'USEFUL' }).evaluate((el) => (el as HTMLElement).click())
    await expect(page.getByRole('button', { name: 'USEFUL' })).toHaveCSS('background-color', 'rgb(255, 255, 255)')

    // CANCEL × closes the dialog but keeps the answer readable.
    await page.getByRole('button', { name: 'Cancel and keep reading' }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible()
    await page.waitForTimeout(300)
    expect(ratingPosts).toEqual([200])

    // Regression (instant-close bug): a second vote in the same session must
    // get a fresh countdown, not an instantly-closed dialog.
    await page.getByRole('button', { name: 'DISMISS ×' }).click() // rated → resets to the form
    await expect(page.getByText('Routes your question to the nearest indexed figure.')).toBeVisible()
    await page.getByPlaceholder(ASK_PLACEHOLDER).fill('When do referral points credit?')
    await page.keyboard.press('Enter')
    await expect(page.getByText(/service answer|service refusal/).first()).toBeVisible({ timeout: 20_000 })
    await page.getByRole('button', { name: 'USEFUL' }).click()
    await expect(page.getByRole('dialog', { name: 'Rating logged — thank you' })).toBeVisible()
    await expect(page.getByText(/AUTO-CLOSING IN 1[0-5]s/)).toBeVisible()
    await page.getByRole('button', { name: 'ASK NEXT QUESTION' }).click()
    await expect(page.getByText('Routes your question to the nearest indexed figure.')).toBeVisible()
    expect(ratingPosts).toEqual([200, 200])

    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 2)
    expect(after.questions).toBeGreaterThan(before.questions || 0)
  })

  test('dismiss-guard blocks unrated dismissal; modal vote hands off to thank-you dialog', async ({ page }) => {
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

    // Re-open, rate NEEDS WORK from the modal → thank-you dialog (SYN-364);
    // its 5s auto-close clears the answer back to the ask form.
    await page.getByRole('button', { name: 'DISMISS ×' }).click()
    await page.getByRole('dialog').getByRole('button', { name: 'NEEDS WORK' }).click()
    await expect(page.getByText('HOLD ON —')).not.toBeVisible()
    await expect(page.getByRole('dialog', { name: 'Rating logged — thank you' })).toBeVisible()
    await expect(page.getByText(/AUTO-CLOSING IN 1[0-5]s/)).toBeVisible()
    await expect(page.getByText('Routes your question to the nearest indexed figure.')).toBeVisible({ timeout: 17_000 })
    await expect(page.getByRole('dialog')).toHaveCount(0)

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
    // SYN-364: the thank-you dialog also opens on local-mode votes; ASK NEXT
    // QUESTION clears the answer and returns the ask form.
    await expect(page.getByRole('dialog', { name: 'Rating logged — thank you' })).toBeVisible()
    await page.getByRole('button', { name: 'ASK NEXT QUESTION' }).click()
    await expect(page.getByText('Routes your question to the nearest indexed figure.')).toBeVisible()
    await expect(page.getByRole('dialog')).toHaveCount(0)
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
