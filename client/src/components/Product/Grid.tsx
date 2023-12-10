import { type FunctionComponent } from 'react'
import { type Product } from '@/interfaces'
import { ProductItem } from '..'

interface Props {
  products: Product[]
}

const ProductGrid: FunctionComponent<Props> = ({ products }) => (
  <div className='grid w-full grid-cols-5 gap-4'>
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </div>
)

export default ProductGrid
