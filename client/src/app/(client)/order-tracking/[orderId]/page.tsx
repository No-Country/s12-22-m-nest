import { getOrder } from '@/services/orders/getOrder.service'
import { type FunctionComponent } from 'react'
import Tracking from './_tracking/Tracking'
import Finished from './_finished/Finished'

interface Props {
  params: {
    orderId: string
  }
}

const OrderTracking: FunctionComponent<Props> = async ({ params }) => {
  const { data: order } = await getOrder(params?.orderId ?? 'null')

  return (
    <>
      <section className='relative'>
        {order?.status === 'In Progress' ? <Tracking order={order} /> : <Finished order={order} />}
      </section>{' '}
    </>
  )
}

export default OrderTracking
