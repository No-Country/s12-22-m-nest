import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// {
//   email: 'prueba@correo.com',
//   password: '1234',
//   redirect: 'false',
//   csrfToken: '8ea19bda7bb56aa1354c8a16704aa9b11b1ea9496fcd16e837f1eae007f684e4',
//   callbackUrl: 'http://localhost:3000/login',
//   json: 'true'
// }

const authOptions: NextAuthOptions = {
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
        console.log(credentials)
        const email = credentials?.email ?? ''
        const password = credentials?.password ?? ''
        // TODO: cuando se agregue el servicio de login de la api esto se modifica
        if (email !== 'prueba@correo.com' || password !== '1234') {
          throw new Error('Invalid credentials')
        }

        const user = {
          id: '1',
          email,
          password
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default authOptions
