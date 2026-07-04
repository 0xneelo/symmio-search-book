import os from 'node:os'
import path from 'node:path'
import { defineConfig } from '@playwright/test'

const smokeDb = path.join(os.tmpdir(), `search-book-web-smoke-${process.pid}-${Date.now()}.sqlite`)

/**
 * M8 smokes (SYN-355). Requires a prior `npm run build` (dist/ + prerendered
 * pages). Spawns the built app on :5173 and a real answer-engine service on
 * :8792 with a throwaway sqlite DB.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    viewport: { width: 1500, height: 1000 },
  },
  webServer: [
    {
      command: 'npx vite preview --host 127.0.0.1 --port 5173 --strictPort',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: false,
      timeout: 30_000,
    },
    {
      command: 'node ../scripts/serve-answer-engine.mjs',
      env: {
        SEARCH_BOOK_ANSWER_ENGINE_DB: smokeDb,
        SEARCH_BOOK_ANSWER_ENGINE_PORT: '8792',
        SEARCH_BOOK_ANSWER_ENGINE_DEFAULT_MODE: 'extractive',
      },
      url: 'http://127.0.0.1:8792/health',
      reuseExistingServer: false,
      timeout: 30_000,
    },
  ],
})
