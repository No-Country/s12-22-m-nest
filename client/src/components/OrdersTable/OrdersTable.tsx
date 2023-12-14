'use client'
import { type Type, type OrderInterface } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { DynamicTable } from '..'
import { columns, rows } from './table.lib'

interface Props {
  orders: OrderInterface[]
  mode: Type
}

const OrdersTable: FunctionComponent<Props> = ({ orders, mode }) => (
  <DynamicTable
    data={orders}
    rowsPerPage={1}
    columns={columns[mode]}
    renderRow={(order: OrderInterface) => rows(order)[mode]}
  />
)

export default OrdersTable
