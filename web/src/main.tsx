import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// v2 self-hosted fonts (Poppins/Space Mono) load ONLY for the admin surface —
// the Symmiopedia public surface is system-fonts-only with zero webfont loads
// (DESIGN.MD v3 hard rules, SYN-371). Without the @font-face registrations the
// v2 --font-sans/--font-mono stacks fall through to system families.
if (new URLSearchParams(window.location.search).get('admin') === '1') {
  void Promise.all([
    import('@fontsource/poppins/400.css'),
    import('@fontsource/poppins/400-italic.css'),
    import('@fontsource/poppins/500.css'),
    import('@fontsource/poppins/500-italic.css'),
    import('@fontsource/poppins/600.css'),
    import('@fontsource/poppins/700.css'),
    import('@fontsource/space-mono/400.css'),
    import('@fontsource/space-mono/700.css'),
  ])
}

import './index.css'
import './wiki.css'
import App from './App.tsx'
import { ComponentsGallery } from './gallery/ComponentsGallery.tsx'
import { SymmiopediaLab } from './gallery/SymmiopediaLab.tsx'

// Minimal route split: /components reviews the v2 design system (SYN-349),
// /symmiopedia is the v3 foundation scratch route (SYN-367);
// everything else is the app.
const path = window.location.pathname.replace(/\/$/, '')
const isGallery = path.endsWith('/components')
const isWikiLab = path.endsWith('/symmiopedia')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isWikiLab ? <SymmiopediaLab /> : isGallery ? <ComponentsGallery /> : <App />}
  </StrictMode>,
)
