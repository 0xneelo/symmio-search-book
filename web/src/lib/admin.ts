/**
 * Admin gate client (SYN-362). The shared operator token is verified
 * SERVER-side via POST /api/search-book/admin/verify — it never ships in the
 * bundle and is never logged. This is a single-shared-token gate for user
 * testing, not multi-user auth. The stored session token rides along on
 * /insights requests (x-search-book-admin-token).
 */
import { serviceEnabled, serviceRequest } from './service'

const ADMIN_TOKEN_KEY = 'searchBookPrototype.adminToken'

export function getAdminToken(): string {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || ''
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export interface AdminVerifyResult {
  ok: boolean
  gateEnabled: boolean
}

/**
 * Verify a candidate token against the answer-engine. Without a configured
 * service there is nothing sensitive to reach — the area opens (local dev,
 * localStorage-only data).
 */
export async function verifyAdmin(token: string): Promise<AdminVerifyResult> {
  if (!serviceEnabled()) return { ok: true, gateEnabled: false }
  try {
    const payload = await serviceRequest('/api/search-book/admin/verify', {
      method: 'POST',
      body: JSON.stringify(token ? { token } : {}),
    })
    return { ok: payload.status === 'ok' || payload.status === 'open', gateEnabled: !!payload.gateEnabled }
  } catch {
    return { ok: false, gateEnabled: true }
  }
}
