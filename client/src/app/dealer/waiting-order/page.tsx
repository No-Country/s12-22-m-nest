import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'
import Content from './_components/Content'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const { data } = await checkAvailability(session?.user?.id ?? 'null')

  if (!data?.isAvailable && data?.orderId) {
    redirect(Routes.ORDER(data?.orderId))
  }

  return (
    <main className='padding-general-x min-h-screen py-[100px] '>
      <h1 className='text-2xl'>
        Esperando una <b>orden</b>
      </h1>
      <p>Aguarda a que un cliente realice un pedido.</p>
      <Content session={session} />
    </main>
  )
}

export default Page
