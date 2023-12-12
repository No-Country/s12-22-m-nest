import { getOrder } from '@/services/orders/getOrder.service'
import { type FunctionComponent } from 'react'
import Tracking from './_tracking/Tracking'
import Finished from './_finished/Finished'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import SocketProvider from '@/context/providers/socket.provider'
import { routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'
import { type Metadata } from 'next'

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
  if (session?.user?.id !== order?.clientId) {
    redirect(routes.customer.HOME)
  }

  return (
    <SocketProvider session={session} mode='customer'>
      <main className='relative flex min-h-screen flex-col items-start'>
        {order?.status === 'In Progress' ? <Tracking order={order} /> : <Finished order={order} />}
      </main>
    </SocketProvider>
  )
}

export default OrderTracking
