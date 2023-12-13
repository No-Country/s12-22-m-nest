import { type FunctionComponent } from 'react'
import { type OrderInterface } from '@/interfaces'

interface Props {
  order: OrderInterface | null
}

const Canceled: FunctionComponent<Props> = async ({ order }) => (
  <div className='flex h-full w-full  items-center justify-center gap-3'>
    <p>Tu orden ha sido cancelada</p>
  </div>
)

export default Canceled
