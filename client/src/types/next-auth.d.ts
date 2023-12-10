// This import is necessary for type extension, otherwise an "not callable" error is displayed at '/app/api/auth/[...nextauth]/route.ts'
import 'next-auth'

interface SessionUser {
  id: string
  email: string
  sessionId: string
  type: 'customer' | 'dealer'
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
    user: User
    token: {
      accessToken?: string
      idToken?: string
      sessionId: string
      type: 'customer' | 'dealer'
      provider: string
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Partial<SessionUser> {
    sessionId: string
    type: 'customer' | 'dealer'
  }
}
