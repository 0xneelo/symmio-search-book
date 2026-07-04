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

test.describe('navigation (public surface = portal + reader, SYN-362/SYN-368)', () => {
  test('public / renders the Symmiopedia portal; removed-view URLs redirect to it', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('SYMMIOPEDIA')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByPlaceholder('Search Symmiopedia — or ask a question')).toBeVisible()
    // The portal carries no v2 shell chrome.
    await expect(page.locator('.navrow')).toHaveCount(0)

    // The five removed views redirect to the public landing and clean the URL.
    for (const variant of ['browse', 'glossary', 'faq', 'journey', 'insights']) {
      await page.goto(`/?variant=${variant}`)
      await expect(page.getByText('SYMMIOPEDIA')).toBeVisible({ timeout: 20_000 })
      expect(page.url()).not.toContain(`variant=${variant}`)
    }

    // Arrow cycling is a no-op with a single public section.
    await page.goto('/')
    await expect(page.getByText('SYMMIOPEDIA')).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(300)
    await expect(page.getByText('SYMMIOPEDIA')).toBeVisible()
    expect(page.url()).not.toContain('variant=browse')
  })

  test('portal anatomy and behaviors (SYN-368)', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('SYMMIOPEDIA')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText('The Open Ecosystem Encyclopedia')).toBeVisible()
    // One globe def, one 228px portal instance with the curved-label textPaths.
    await expect(page.locator('svg use')).toHaveCount(1)
    expect(await page.locator('#pglobe textPath').count()).toBe(6)
    const globe = await page.locator('svg[role="img"]').boundingBox()
    expect(Math.round(globe!.width)).toBe(228)
    // Search bar geometry (DESIGN.MD §4): 46px tall, min(480px, 92vw).
    const input = await page.getByPlaceholder('Search Symmiopedia — or ask a question').boundingBox()
    expect(Math.round(input!.height)).toBe(46)

    // Featured-article hint opens the article.
    await page.getByRole('link', { name: /Ecosystem Synergy Map/ }).click()
    await expect(page.locator('h1').first()).toContainText('Ecosystem Synergy Map', { timeout: 20_000 })
    expect(page.url()).toContain('page=authored-ecosystem-synergy-map')
  })

  test('portal search routes a seeded question to its article and records the event', async ({ page }) => {
    await page.goto('/')
    // The featured-article hint renders once the corpus is loaded — search
    // resolution needs the data, so wait for it before typing.
    await expect(page.getByRole('link', { name: /Ecosystem Synergy Map/ })).toBeVisible({ timeout: 20_000 })
    const search = page.getByPlaceholder('Search Symmiopedia — or ask a question')
    await search.fill('When do referral points credit?')
    await page.keyboard.press('Enter')
    await expect(page.locator('h1').first()).not.toHaveText('', { timeout: 20_000 })
    expect(page.url()).toContain('page=')
    const questions = await page.evaluate(
      () => JSON.parse(localStorage.getItem('searchBookPrototype.questions') || '[]').length,
    )
    expect(questions).toBeGreaterThan(0)
  })

  test('SSG page route serves static content and hydrates', async ({ page, request }) => {
    const pageId = 'authored-active-risk-management-vs-passive-physics'
    const raw = await request.get(`/page/${pageId}/`)
    const html = await raw.text()
    expect(html).toContain('class="wk-body"')
    expect(html).toContain('Active Risk Management')
    // Wiki anatomy markers in the static HTML (SYN-369).
    expect(html).toContain('From Symmiopedia, the open ecosystem encyclopedia')
    expect(html).toContain('id="references"')
    await page.goto(`/page/${pageId}/`)
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible({ timeout: 20_000 })
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

  // NOTE (SYN-368 interim): the v2 cover left the public surface — the ask
  // flow lives on the admin-area cover (?admin=1, ungated for `classic`) until
  // the Ask special page (SYN-370) re-points these to the public surface.
  test('public vote flow tolerates the gated /insights (no visible failure)', async ({ page }) => {
    const before = await serviceTotals()
    await page.goto(`/?service=${SERVICE}&admin=1`)
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

    await page.goto(`/?service=${SERVICE}&admin=1`)
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
    await page.goto(`/?service=${SERVICE}&admin=1`)
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
    await page.goto('/?admin=1') // no ?service= → localStorage mode; cover via admin area (SYN-368 interim)
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
    // SYN-369: wiki-register page vote ("Was this page useful? Yes · No").
    await page.getByTestId('wk-pagerate').getByRole('button', { name: 'Yes' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const after = await serviceTotals()
    expect(after.ratings).toBe((before.ratings || 0) + 1)
  })

  test('needs-work page vote records a gap (local mode)', async ({ page }) => {
    await page.goto('/?page=authored-active-risk-management-vs-passive-physics')
    await expect(page.locator('h1').first()).toContainText('Active Risk Management', { timeout: 20_000 })
    await page.getByTestId('wk-pagerate').getByRole('button', { name: 'No' }).click()
    await expect(page.getByText('✓ logged — thank you')).toBeVisible()
    const gaps = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('searchBookPrototype.gaps') || '[]'),
    )
    expect(gaps[0]?.reason).toBe('page-feedback-needs-work')
  })
})
