'use client'
import { type OrderRequest } from '@/interfaces'
import { TableCell, TableRow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { DynamicTable } from '.'

interface Props {
  orders: OrderRequest[]
}

const OrdersTable: FunctionComponent<Props> = ({ orders }) => (
  <DynamicTable
    data={orders}
    rowsPerPage={4}
    columns={['Fecha', 'Orden', 'Distancia', 'Tienda']}
    renderRow={(order) => (
      <TableRow key={order.id}>
        <TableCell className='font-semibold'>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>{order.id.slice(0, 5)}</TableCell>
        <TableCell>{order.distance}km</TableCell>
        <TableCell>{order.shop}</TableCell>
      </TableRow>
    )}
  />
)

export default OrdersTable
