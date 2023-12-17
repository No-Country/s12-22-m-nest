import { routes } from '@/utils/constants/routes.const'
import { type SignInResponse, signIn } from 'next-auth/react'
import { toast } from 'sonner'

// TODO: dinamizar el tipo de usuario
export const loginService = async (email: string, password: string): Promise<SignInResponse> => {
  const responseNextAuth = await signIn('credentials', {
    email,
    password,
    redirect: false,
    callbackUrl: routes.customer.ACCOUNT
  })

  if (responseNextAuth?.error && responseNextAuth?.error !== null) {
    console.error(responseNextAuth?.error)
    toast.error('Error al iniciar sesión')
  }

  return responseNextAuth as SignInResponse
}
