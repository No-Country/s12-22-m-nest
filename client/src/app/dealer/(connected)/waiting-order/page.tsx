import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import Content from './_components/Content'
import { Button } from '@/components'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { redirect } from 'next/navigation'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return
  const { data } = await checkAvailability(session?.user?.id)

  if (!data?.isAvailable && data?.orderId) {
    redirect(Routes.ORDER(data?.orderId))
  }

  return (
    <main className='padding-general-x flex min-h-screen flex-col items-start gap-2 py-[100px]'>
      <h1 className='text-2xl'>
        Esperando una <b>orden</b>
      </h1>
      <p>Aguarda a que un cliente realice un pedido.</p>
      <Button title='Dejar de repartir' href={Routes.DEALER_HOME} />
      <Content session={session} />
    </main>
  )
}

export default Page
