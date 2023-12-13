import { type Type, type OrderInterface } from '@/interfaces'
import { TableCell, TableRow } from '@nextui-org/react'

export const rows = (order: OrderInterface): Record<Type, JSX.Element> => ({
  customer: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.shop.name}</TableCell>
      <TableCell>${order.price}</TableCell>
    </TableRow>
  ),
  shop: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.client.firstName + ' ' + order.client.lastName}</TableCell>
      <TableCell>${order.price}</TableCell>
    </TableRow>
  ),
  dealer: (
    <TableRow key={order.id}>
      <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{order.id.slice(0, 5)}</TableCell>
      <TableCell>{order.shop.name}</TableCell>
      <TableCell>${order.price}</TableCell>
    </TableRow>
  )
})

export const columns = {
  customer: ['Fecha', 'Orden', 'Tienda', 'Precio'],
  shop: ['Fecha', 'Orden', 'Cliente', 'Precio'],
  dealer: ['Fecha', 'Orden', 'Tienda', 'Precio']
}
