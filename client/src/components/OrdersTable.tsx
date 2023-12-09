'use client'
import { type OrderRequest } from '@/interfaces'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useMemo, type FunctionComponent, useState } from 'react'

interface Props {
  orders: OrderRequest[]
}

const OrdersTable: FunctionComponent<Props> = ({ orders }) => {
  const [page, setPage] = useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(orders.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return orders.slice(start, end)
  }, [page, orders])

  return (
    <div className='flex flex-col gap-4'>
      <Table className='w-full'>
        <TableHeader>
          <TableColumn>Fecha</TableColumn>
          <TableColumn>Orden</TableColumn>
          <TableColumn>Distancia</TableColumn>
          <TableColumn>Tienda</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((product, index) => (
            <TableRow key={index}>
              <TableCell className='font-semibold'>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{product.id.slice(0, 5)}</TableCell>
              <TableCell>{product.distance}km</TableCell>
              <TableCell>{product.shop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pages > 1 && (
        <div className='flex w-full justify-center'>
          <Pagination
            variant='light'
            isCompact
            showControls
            showShadow
            size='sm'
            color='primary'
            page={page}
            total={pages}
            onChange={(page) => {
              setPage(page)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default OrdersTable
