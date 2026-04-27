import { AUTH_API_URL } from '@/shared/config'
import { accessToken } from '@/shared/lib/token'

export interface HttpInit extends RequestInit {
  /** Override the base URL (defaults to `AUTH_API_URL`). */
  baseUrl?: string
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export async function http<T>(path: string, init: HttpInit = {}): Promise<T> {
  const { baseUrl = AUTH_API_URL, ...rest } = init
  const res = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      ...rest.headers,
    },
  })

  if (!res.ok) {
    let message = res.statusText
    try {
      const body = await res.json()
      message =
        (body && typeof body === 'object' && (body.message || body.error)) || message
    } catch {
      /* no-op */
    }
    throw new HttpError(res.status, message)
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
