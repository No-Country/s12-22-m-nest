import { ProductsTable } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { type FunctionComponent } from 'react'

interface Props {
  order: OrderInterface
}

const Client: FunctionComponent<Props> = ({ order }) => (
  <div className='flex flex-col gap-4'>
    <div>
      <p className='font-semibold'>{order?.client?.firstName + ' ' + order?.client?.lastName}</p>
      <p className='text-sm'>Domicilio: {order?.shipAddress}</p>
      <p className='text-sm'>Tienda: {order?.shop.name}</p>
      <p className='text-sm'>Pedido: {order?.id.slice(0, 5)}</p>
    </div>
    <ProductsTable products={order.products} />
  </div>
)

export default Client
