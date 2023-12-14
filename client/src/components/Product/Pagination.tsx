'use client'
import { type Product } from '@/interfaces'
import { Pagination } from '@nextui-org/react'
import { useState, type FunctionComponent, useMemo } from 'react'
import { ProductItem } from '..'

interface Props {
  products: Product[]
  rowsPerPage?: number
}

const ProductPagination: FunctionComponent<Props> = ({ products, rowsPerPage = 12 }) => {
  const [page, setPage] = useState(1)

  const pages = Math.ceil(products.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return products.slice(start, end)
  }, [page, rowsPerPage, products])

  return (
    <div>
        <div className='w-full flex-wrap gap-8 flex justify-center md:justify-start'>
            {
                items.map(item => (
                    <ProductItem key={item.id} product={item} />
                ))
            }
        </div>
        <div
          className={'m bg-red-500 grid w-full grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]'}>
          {items?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
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

export default ProductPagination
