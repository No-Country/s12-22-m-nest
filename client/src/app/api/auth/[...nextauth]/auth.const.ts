// TODO: Add types
import { mutationRequest, getRequest } from '@/app/services/api.requests'
import { Endpoints } from '@/utils/constants/endpoints.const'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
        const { data, error } = await mutationRequest<any>('post', Endpoints.LOGIN, { email, password })

        if (error) {
          throw new Error(error?.message)
        }

        const user = {
          id: data?.user?.id,
          email: data?.user?.email
        }

        return user
      }
    })
  ],
  callbacks: {
    session: async (arg) => {
      const { token, session } = arg
      const { data } = await getRequest<any>({ url: Endpoints.FIND_USER(token.email ?? '') })

      session.user = {
        id: data?.id,
        email: data?.email
      }

      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions
