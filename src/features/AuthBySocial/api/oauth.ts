import { http } from '@/shared/api'
import { OAUTH_API_URL } from '@/shared/config'

export type OAuthProvider = 'google' | 'github'

export interface OAuthTokenResponse {
  access_token: string
  token_type?: string
  expires_in?: number
  refresh_token?: string
  scope?: string
}

export interface OAuthUserInfo {
  id?: string | number
  email?: string
  name?: string
  login?: string
  picture?: string
  avatar_url?: string
}

export const loginWithOAuth = (provider: OAuthProvider): Promise<OAuthTokenResponse> =>
  http<OAuthTokenResponse>(`/oauth/token/${provider}`, {
    method: 'POST',
    baseUrl: OAUTH_API_URL,
  })

export const fetchUserInfo = (provider: OAuthProvider): Promise<OAuthUserInfo> =>
  http<OAuthUserInfo>(`/userinfo/${provider}`, { baseUrl: OAUTH_API_URL })
