import { type Type, type OrderInterface } from '@/interfaces'
import { TableCell, TableRow } from '@nextui-org/react'

export const rows = (order: OrderInterface): Record<Type, JSX.Element> => ({
  customer: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.shop.name}</TableCell>
      <TableCell>${order.price}</TableCell>
      <TableCell>
        {order.status === 'Delivered' ? 'Entregada'
          : <a href={`/order-tracking/${order.id}`} target='_blank' className='hover:text-green-600'>Ir a la orden</a>}
      </TableCell>
    </TableRow>
  ),
  shop: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.client.firstName + ' ' + order.client.lastName}</TableCell>
      <TableCell>${order.shopRevenue}</TableCell>
    </TableRow>
  ),
  dealer: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.shop.name}</TableCell>
      <TableCell>${order.dealerRevenue}</TableCell>
    </TableRow>
  )
})

export const columns = {
  customer: ['Fecha', 'Orden', 'Tienda', 'Precio', 'Seguimiento de la orden'],
  shop: ['Fecha', 'Orden', 'Cliente', 'Ganancia'],
  dealer: ['Fecha', 'Orden', 'Tienda', 'Ganancia']
}
