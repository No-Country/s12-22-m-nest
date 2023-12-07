import { ProductsTable } from '@/components'
import { type OrderRequest } from '@/interfaces'
import { type FunctionComponent } from 'react'

interface Props {
  order: OrderRequest
}

const Client: FunctionComponent<Props> = ({ order }) => (
  <div className='flex flex-col gap-4'>
    <div>
      <p className='font-semibold'>{order?.clientName}</p>
      <p className='text-sm'>Domicilio: {order?.shipAddress}</p>
      <p className='text-sm'>Tienda: {order?.shop}</p>
      <p className='text-sm'>Pedido: {order?.id.slice(0, 5)}</p>
    </div>
    <ProductsTable products={order.products} />
  </div>
)

export default Client
