import { type FunctionComponent } from 'react'
import { type Product } from '@/interfaces'
import { ProductItem } from '..'

interface Props {
  products: Product[]
  className?: string
}

const ProductGrid: FunctionComponent<Props> = ({ products, className }) => (
  <>
    {products.length <= 0 ? (
      <div className='flex w-full items-center justify-start'>
        <p className='text-center text-lg font-normal'>No hay nada por aquí</p>
      </div>
    ) : (
      <div
        className={`m grid w-full grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] ${className} `}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    )}
  </>
)

export default ProductGrid
