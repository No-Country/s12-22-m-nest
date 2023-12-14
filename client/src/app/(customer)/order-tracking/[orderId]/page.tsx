/* eslint-disable multiline-ternary */
import { getOrder } from '@/services/orders/getOrder.service'
import { type FunctionComponent } from 'react'
import Tracking from './_components/Tracking'
import Finished from './_components/Finished'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import SocketProvider from '@/context/providers/socket.provider'
import { routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'
import { type Metadata } from 'next'
import { ProfileAction } from '@/components'
import { getUser } from '@/services/users/getUser.service'
import { type OrderInterface, type User } from '@/interfaces'
import { Navbar } from '@nextui-org/react'
import Template from './Template'
import Waiting from './_components/Waiting'
import Canceled from './_components/Canceled'

export const metadata: Metadata = {
  title: 'Seguimiento de orden | LleGo!'
}

interface Props {
  params: {
    orderId: string
  }
}

const OrderTracking: FunctionComponent<Props> = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const { data: order } = await getOrder(params?.orderId ?? 'null')
  const { data: user } = await getUser(session?.user?.id ?? 'null')
  if (session?.user?.id !== order?.clientId) {
    redirect(routes.customer.HOME)
  }

  return (
    <SocketProvider session={session} mode='customer'>
      <Navbar className='fixed right-0 top-0 w-max bg-transparent' isBlurred={false}>
        <div className='padding-general-x fixed right-0 top-0 flex min-h-[100px] items-center gap-3'>
          <ProfileAction status='authenticated' loggedUser={user as User} />
        </div>
      </Navbar>
      <main className='relative flex flex-col items-start justify-start lg:h-screen'>
        <Template order={order as OrderInterface} key={order?.id}>
          {order?.status === 'Pending' ? (
            <Waiting order={order} />
          ) : order?.status === 'In Progress' ? (
            <Tracking order={order} />
          ) : order?.status === 'Canceled' ? (
            <Canceled order={order} />
          ) : (
            <Finished order={order} />
          )}
        </Template>
      </main>
    </SocketProvider>
  )
}

export default OrderTracking
