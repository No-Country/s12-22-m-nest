import { type OrderInterface } from '@/interfaces'
import { type FunctionComponent } from 'react'
import status from '../status.lib'

interface Props {
  order: OrderInterface
}

const OrderInfo: FunctionComponent<Props> = ({ order }) => (
  <div className='flex flex-col gap-2'>
    <p className='text-sm'>#{order?.id}</p>
    <p className='text-lg font-semibold'>{status[order?.step - 2].title}</p>
    <p>{status[order?.step - 2]?.message}</p>
  </div>
)

export default OrderInfo
