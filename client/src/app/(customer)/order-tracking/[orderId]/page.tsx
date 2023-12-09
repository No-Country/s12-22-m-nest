import { getOrder } from '@/services/orders/getOrder.service'
import { type FunctionComponent } from 'react'
import Tracking from './_tracking/Tracking'
import Finished from './_finished/Finished'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import SocketProvider from '@/context/providers/socket.provider'

interface Props {
  params: {
    orderId: string
  }
}

const OrderTracking: FunctionComponent<Props> = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const { data: order } = await getOrder(params?.orderId ?? 'null')

  return (
    <SocketProvider session={session} mode='client'>
      <main className='relative flex min-h-screen flex-col items-start'>
        {order?.status === 'In Progress' ? <Tracking order={order} /> : <Finished order={order} />}
      </main>
    </SocketProvider>
  )
}

export default OrderTracking
