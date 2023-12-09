import { Routes } from '@/utils/constants/routes.const'
import { type SignInResponse, signIn } from 'next-auth/react'
import { toast } from 'sonner'

export const loginService = async (email: string, password: string): Promise<SignInResponse> => {
  const responseNextAuth = await signIn('credentials', {
    email,
    password,
    redirect: false,
    callbackUrl: Routes.DEALER_HOME
  })

  if (responseNextAuth?.error && responseNextAuth?.error !== null) {
    console.error(responseNextAuth?.error)
    toast.error('Error al iniciar sesión')
  }

  return responseNextAuth as SignInResponse
}
