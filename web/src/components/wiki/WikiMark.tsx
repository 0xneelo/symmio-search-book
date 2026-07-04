/**
 * Symmiopedia site mark — operator design amendment, 2026-07-04 (post
 * SYN-372 sign-off): the puzzle-globe mark is replaced by the operator's
 * puzzle-piece-S mark, used verbatim as the operator-supplied vector
 * (exact file, single traced evenodd path; canonical copy:
 * docs/goals/symmiopedia-v3/comp/operator-mark-puzzle-s.svg).
 *
 * Brand architecture per the amendment: three separate asset files —
 * portal-logo / navbar-logo / page-logo — identical for now, but each UI slot
 * pulls only its own file so the slots can diverge later (e.g. the portal may
 * revert to a globe). The full six-piece globe def (PuzzleGlobe) stays in the
 * tree for that reversion.
 */
import portalLogoUrl from './portal-logo.svg'
import navbarLogoUrl from './navbar-logo.svg'
import pageLogoUrl from './page-logo.svg'

const SLOT_URLS = {
  portal: portalLogoUrl,
  navbar: navbarLogoUrl,
  page: pageLogoUrl,
} as const

export type WikiMarkSlot = keyof typeof SLOT_URLS

export function WikiMark({
  slot,
  size,
  alt = 'Symmiopedia mark',
}: {
  slot: WikiMarkSlot
  /** Rendered width in px — 228 (portal), 118 (navbar/logo cell), 234 (infobox). */
  size: number
  alt?: string
}) {
  return <img src={SLOT_URLS[slot]} width={size} height={size} alt={alt} data-wiki-mark={slot} />
}
