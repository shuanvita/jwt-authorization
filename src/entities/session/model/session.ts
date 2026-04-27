import { computed } from 'vue'
import { accessToken } from '@/shared/lib/token'
import { decodeJwt } from '../lib/jwt'

export interface SessionUser {
  sub?: string
  email?: string
  name?: string
  exp?: number
  iat?: number
}

export const currentUser = computed<SessionUser | null>(() =>
  decodeJwt<SessionUser>(accessToken.value),
)

export const isAuthenticated = computed(() => {
  const user = currentUser.value
  if (!user) return false
  if (user.exp && user.exp * 1000 < Date.now()) return false
  return true
})

export const logout = () => {
  accessToken.value = null
}
