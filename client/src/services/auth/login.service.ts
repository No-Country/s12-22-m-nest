import { Routes } from '@/utils/constants/routes.const'
import { type SignInResponse, signIn } from 'next-auth/react'

export const loginService = async (email: string, password: string): Promise<SignInResponse> => {
  const responseNextAuth = await signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: Routes.DEALER_HOME
  })

  if (responseNextAuth?.error !== null) {
    console.error(responseNextAuth?.error)
  }

  return responseNextAuth as SignInResponse
}
