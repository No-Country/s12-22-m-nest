import { type Product } from '@/interfaces'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'

interface Props {
  products: Product[]
}

const ProductsTable: FunctionComponent<Props> = ({ products }) => (
  <Table
    hideHeader
    className='w-full'
    classNames={{
      wrapper: 'shadow-none'
    }}
  >
    <TableHeader>
      <TableColumn>Cantidad</TableColumn>
      <TableColumn>Producto</TableColumn>
      <TableColumn>Precio final</TableColumn>
    </TableHeader>
    <TableBody>
      {products.map((product, index) => (
        <TableRow key={index}>
          <TableCell className='font-semibold'>{product.quantity}x</TableCell>
          <TableCell>
            <p>{product.name}</p>
            <span className='text-xs font-light'>(${product.price})</span>
          </TableCell>
          <TableCell className='text-base font-semibold'>${product.quantity * product.price}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default ProductsTable