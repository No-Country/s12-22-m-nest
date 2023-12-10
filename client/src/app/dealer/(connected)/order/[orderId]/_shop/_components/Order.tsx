import { type OrderInterface } from '@/interfaces'
import { type FunctionComponent } from 'react'
import Image from 'next/image'
import { ProductsTable } from '@/components'

interface Props {
  order: OrderInterface
}

const Order: FunctionComponent<Props> = ({ order }) => (
  <div className='flex flex-col gap-4'>
    <div className='flex items-center gap-2'>
      <Image
        alt='shop logo'
        height={48}
        className='h-12 w-12 rounded-full object-cover'
        src={order?.shop?.thumbnail || '/image/placeholder.png'}
        width={48}
      />
      <div>
        <p className='font-semibold'>{order?.shop?.name}</p>
        <p className='text-sm'>Pedido: {order?.id.slice(0, 5)}</p>
      </div>
    </div>
    <ProductsTable products={order.products} />
  </div>
)

export default Order
