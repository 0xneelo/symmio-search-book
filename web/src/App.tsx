function App() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Announcement bar — solid blueprint blue (DESIGN.MD §4) */}
      <div className="flex h-11 shrink-0 items-center justify-center gap-4 bg-blueprint px-4 text-[13px] font-medium text-headline">
        <span>Vibe public launch — the trading network on SYMM is live.</span>
        <button
          type="button"
          className="bg-headline px-3 py-1 text-[11px] font-bold tracking-wider text-blueprint shadow-hard"
        >
          JOIN NOW ↗
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1">
        {/* Sidebar rail (collapsed 64px placeholder; expand-on-hover lands in M4) */}
        <aside className="absolute inset-y-0 left-0 z-40 flex w-16 flex-col items-center bg-surface-sidebar py-5">
          <span className="font-mono text-sm font-bold text-headline">
            V<span className="text-ink">■</span>
          </span>
          <span className="mt-auto font-mono text-xs text-faint">/</span>
        </aside>

        <div className="ml-16 flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex h-[61px] shrink-0 items-center justify-between border-b border-white/12 bg-[rgba(3,5,16,.3)] px-6">
            <span className="text-sm text-nav">Field Manual</span>
            <span className="font-mono text-[11px] tracking-[2px] text-meta">
              §00 COVER
            </span>
          </header>

          {/* Content pane — the only scrollable region */}
          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1240px] px-12 pt-[34px] pb-[110px]">
              <p className="font-mono text-[11px] tracking-[2px] text-meta uppercase">
                REV 2026.07 / OPEN
              </p>
              <h1 className="mt-4 text-[74px] leading-[0.98] font-bold tracking-[-3px] text-headline">
                Vibe × SYMM Field Manual<span className="text-ink">.</span>
              </h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
