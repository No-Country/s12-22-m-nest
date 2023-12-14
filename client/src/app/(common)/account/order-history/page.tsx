import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { OrdersTable } from '@/components'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import type { Metadata } from 'next'
import { getUserOrders } from '@/services/users/getOrders.service'

export const metadata: Metadata = {
  title: 'Historial del ordenes | LleGO!'
}

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const { data } = await getUserOrders(session?.user?.id ?? '')
  return (
    <main className='padding-general-x flex flex-col gap-10 pb-10 pt-[100px] lg:gap-5 '>
      <section className='flex flex-col gap-4'>
        <div>
          <h1 className='text-2xl'>Estas son las ordenes que has realizado</h1>
          <p>Si tienes alguna duda, puedes contactarnos</p>
        </div>
        <OrdersTable orders={Array.isArray(data) ? data : []} mode={session?.user?.type ?? 'customer'} />
      </section>
    </main>
  )
}

export default Page
