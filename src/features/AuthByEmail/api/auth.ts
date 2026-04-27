import { http, HttpError } from '@/shared/api'

export interface AuthUser {
  id?: string | number
  email: string
  name?: string
}

export interface AuthResponse {
  /** JWT access token. */
  accessToken: string
  refreshToken?: string
  user?: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
}

interface MockUser {
  id: string
  email: string
  password: string
  name?: string
  accessToken: string
}

/** Default JWT used for newly registered users in the mock. */
const DEFAULT_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwibmFtZSI6IkRlbW8gVXNlciIsImV4cCI6OTk5OTk5OTk5OX0.6YwQXnP4N5LNuK5qUxI2aKqEH8LcF9ocTfK3_k6fT4Q'

const findUsersByEmail = (email: string): Promise<MockUser[]> =>
  http<MockUser[]>(`/users?email=${encodeURIComponent(email)}`)

export const loginByEmail = async ({
  email,
  password,
}: LoginPayload): Promise<AuthResponse> => {
  const users = await findUsersByEmail(email)
  const user = users.find((u) => u.password === password)
  if (!user) {
    throw new HttpError(401, 'Invalid credentials. Please try again.')
  }
  return {
    accessToken: user.accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  }
}

export const registerByEmail = async ({
  email,
  password,
}: RegisterPayload): Promise<AuthResponse> => {
  const existing = await findUsersByEmail(email)
  if (existing.length > 0) {
    throw new HttpError(409, 'Email already in use.')
  }
  const created = await http<MockUser>('/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name: email.split('@')[0],
      accessToken: DEFAULT_JWT,
    }),
  })
  return {
    accessToken: created.accessToken || DEFAULT_JWT,
    user: { id: created.id, email: created.email, name: created.name },
  }
}
