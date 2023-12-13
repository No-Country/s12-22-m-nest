'use client'
import { type Product } from '@/interfaces'
import { Pagination } from '@nextui-org/react'
import { useState, type FunctionComponent, useMemo } from 'react'
import { ProductItem } from '..'

interface Props {
  products: Product[]
  rowsPerPage?: number
}

const ProductPagination: FunctionComponent<Props> = ({ products, rowsPerPage = 8 }) => {
  const [page, setPage] = useState(1)

  const pages = Math.ceil(products.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return products.slice(start, end)
  }, [page, rowsPerPage, products])

  return (
    <div>
        <div className='w-full flex-wrap gap-5 flex justify-between bg-red-200'>
            {
                items.map(item => (
                    <ProductItem key={item.id} product={item} />
                ))
            }
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
