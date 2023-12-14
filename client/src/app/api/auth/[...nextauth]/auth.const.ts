import { type User } from '@/interfaces'
import { mutationRequest, getRequest } from '@/services/api.requests'
import { Endpoints } from '@/utils/constants/endpoints.const'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface LoginResponse {
  user: User
  access_token: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const email = credentials?.email ?? ''
        const password = credentials?.password ?? ''
        const { data, error } = await mutationRequest<LoginResponse>('post', Endpoints.LOGIN, { email, password })

        if (error) {
          throw new Error(error?.message)
        }

        const user = {
          id: data?.user?.id ?? '',
          email: data?.user?.email ?? '',
          sessionId: data?.access_token ?? '',
          shopId: data?.user?.shopId ?? null,
          type: data?.user?.type ?? 'customer'
        }

        return user
      }
    })
  ],

  callbacks: {
    jwt: async (arg) => {
      const { token, user } = arg
      if (user) {
        token.sessionId = user.sessionId
        token.type = user.type
        token.shopId = user.shopId
      }
      return await Promise.resolve(token)
    },
    session: async (arg) => {
      const { token, session } = arg
      const getSession = async (): Promise<void> => {
        try {
          const { data } = await getRequest<User>({
            url: Endpoints.FIND_USER(token.email ?? ''),
            cache: 'no-store'
          })

          session.user = {
            id: data?.id ?? '',
            email: data?.email ?? '',
            sessionId: token.sessionId ?? '',
            shopId: data?.shopId ?? null,
            type: data?.type ?? 'customer'
          }
        } catch (error) {
          console.error('Error al obtener la sesión:', error)
        }
      }

      if (!session.user?.id || session.user?.id === '') {
        await getSession()
      }

      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions
