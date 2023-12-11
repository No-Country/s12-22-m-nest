'use client'
import { type OrderInterface } from '@/interfaces'
import { TableCell, TableRow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { DynamicTable } from '.'

interface Props {
  orders: OrderInterface[]
}

const OrdersTable: FunctionComponent<Props> = ({ orders }) => (
  <DynamicTable
    data={orders}
    rowsPerPage={4}
    columns={['Fecha', 'Orden', 'Distancia', 'Tienda']}
    renderRow={(order: OrderInterface) => (
      <TableRow key={order.id}>
        <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>{order.id.slice(0, 5)}</TableCell>
        <TableCell>{order.distance}km</TableCell>
        <TableCell>{order.shop.name}</TableCell>
      </TableRow>
    )}
  />
)

export default OrdersTable
