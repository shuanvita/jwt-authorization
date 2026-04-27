/** Base URL for your own JWT auth mock (email/password login + registration). */
export const AUTH_API_URL =
  (import.meta.env.VITE_AUTH_API_URL as string | undefined) ??
  'https://69efb534112e1b968e24eabe.mockapi.io'

/** Public Beeceptor OAuth mock for social sign-in (Google / GitHub). */
export const OAUTH_API_URL =
  (import.meta.env.VITE_OAUTH_API_URL as string | undefined) ??
  'https://oauth-mock.mock.beeceptor.com'
