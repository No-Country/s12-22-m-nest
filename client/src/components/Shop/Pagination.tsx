'use client'
import { type Shop } from '@/interfaces'
import { Pagination } from '@nextui-org/react'
import { useState, type FunctionComponent, useMemo } from 'react'
import { ShopItem } from '..'

interface Props {
  shops: Shop[]
  rowsPerPage?: number
}

const ShopPagination: FunctionComponent<Props> = ({ shops, rowsPerPage = 8 }) => {
  const [page, setPage] = useState(1)

  const pages = Math.ceil(shops.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return shops.slice(start, end)
  }, [page, rowsPerPage, shops])

  return (
    <div>
        <div className='w-full flex-wrap gap-8 flex justify-center md:justify-start'>
            {
                items.map(item => (
                    <ShopItem key={item.id} shop={item} />
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

export default ShopPagination
