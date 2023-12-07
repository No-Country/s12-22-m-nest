import { type OrderRequest } from '@/interfaces'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import ProductsTable from './ProductsTable'

interface Props {
  order: OrderRequest
}

const Order: FunctionComponent<Props> = ({ order }) => (
  <div className='p-[20px]'>
      <p>ID pedido: {order?.id}</p>
      <p>{order?.shop}</p>
      <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" subtitle={`${order?.products.length} productos`}>
              <ProductsTable products={order.products}/>
          </AccordionItem>
      </Accordion>
  </div>
)

export default Order
