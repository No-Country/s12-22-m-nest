import { type Product } from '@/interfaces'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'

interface Props {
  products: Product[]
}

const ProductsTable: FunctionComponent<Props> = ({ products }) => (
  <Table hideHeader className='mx-auto w-[80%]'>
    <TableHeader>
      <TableColumn>Cantidad</TableColumn>
      <TableColumn>Producto</TableColumn>
      <TableColumn>Precio final</TableColumn>
    </TableHeader>
    <TableBody>
      {products.map((product, index) => (
        <TableRow key={index}>
          {/* // Todo: manejar cantidades */}
          <TableCell className='font-semibold'>1</TableCell>
          <TableCell>
            <p>{product.name}</p>
            <span className='text-xs font-light'>(${product.price})</span>
          </TableCell>
          {/* // Todo: manejar cantidades */}
          <TableCell className='text-base font-semibold'>${product.price}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default ProductsTable
