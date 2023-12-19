// This import is necessary for type extension, otherwise an "not callable" error is displayed at '/app/api/auth/[...nextauth]/route.ts'
import { type Type } from '@/interfaces'
import 'next-auth'

interface SessionUser {
  id: string
  email: string
  sessionId: string
  type: Type
  shopId: string | null
}

// This types are declared to implement type safe Providers (Credentials, Google, Github, etc.) in next auth
declare module 'next-auth' {
  interface User extends SessionUser {}

  interface Account {
    provider: string
    type: string
    providerAccountId: string
    access_token: string
    expires_at: number
    scope: string
    token_type: string
    id_token: string
  }

  interface Session {
    user: {
      User: string
      id: string
      userName: string
      data: {
        firstName: string
        Data: string
        lastName: string
      }
    }
    token: {
      accessToken?: string
      idToken?: string
      sessionId: string
      shopId: string | null
      type: Type
      provider: string
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Partial<SessionUser> {
    sessionId: string
    shopId: string | null
    type: Type
  }
}
