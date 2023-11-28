import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const { data } = await checkAvailability(session?.user?.id ?? '')

  if (!data?.isAvailable && data?.order) {
    redirect(Routes.ORDER(data?.order))
  }

  return (
    <main className='padding-general-x min-h-screen py-[100px] '>
      <h1 className='text-2xl'>
        Bienvenido a <b>LLeGo!</b>
      </h1>
      <p>¿Estas listo para repartir?</p>
    </main>
  )
}

export default Page
