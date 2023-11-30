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

  return <>{order?.status === 'In Progress' ? <Tracking /> : <Finished />}</>
}

export default OrderTracking
