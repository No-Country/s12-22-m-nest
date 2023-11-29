// This import is necessary for type extension, otherwise an "not callable" error is displayed at '/app/api/auth/[...nextauth]/route.ts'
import 'next-auth'

interface SessionUser {
  id: string
  email: string
}

// This types are declared to implement type safe Providers (Credentials, Google, Github, etc.) in next auth
declare module 'next-auth' {
  interface User extends SessionUser {}
  interface Session {
    user: User
    token: {
      accessToken?: string
      idToken?: string
      sessionId: string
      provider: string
    }
  }
}
