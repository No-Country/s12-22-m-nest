import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import Button from '@/components/Button'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return
  const { data } = await checkAvailability(session?.user?.id)

  if (!data?.isAvailable && data?.orderId) {
    redirect(Routes.ORDER(data?.orderId))
  }

  return (
    <main className='padding-general-x flex min-h-screen flex-col items-start gap-2 py-[100px] '>
      <h1 className='text-2xl'>
        Bienvenido a <b>LLeGo!</b>
      </h1>
      <p>¿Estas listo para repartir?</p>
      <Button title='Comenzar' href={Routes.WAITING_ORDER} />
    </main>
  )
}

export default Page
