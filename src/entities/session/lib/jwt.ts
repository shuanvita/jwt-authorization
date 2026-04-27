/**
 * Decodes a JWT payload. Does not verify the signature — for read-only client use.
 */
export function decodeJwt<T = Record<string, unknown>>(
  token: string | null | undefined,
): T | null {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const payload = parts[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    )
    return JSON.parse(json) as T
  } catch {
    return null
  }
}
