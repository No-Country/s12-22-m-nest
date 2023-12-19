'use client'
import { type FunctionComponent } from 'react'
import { type Shop, type Product } from '@/interfaces'
import { ProductItem, ShopItem } from '.'

interface Props {
  products?: Product[] | null
  shops?: Shop[] | null
}

const DynamicFlex: FunctionComponent<Props> = ({ products, shops }) => (
  <div className='scrollbar-general flex gap-4 overflow-x-auto pb-5'>
    {products && products.length <= 0 ? (
      <div className='flex w-full items-center justify-start'>
        <h1 className='text-center text-lg font-semibold'>No hay nada por aquí</h1>
      </div>
    ) : (
      <>{products?.map((item) => <ProductItem product={item} classname='min-w-[200px]' key={item.id} />)}</>
    )}
    {shops && shops.length <= 0 ? (
      <div className='flex w-full items-center justify-start'>
        <h1 className='text-center text-lg font-semibold'>No hay nada por aquí</h1>
      </div>
    ) : (
      <>{shops?.map((item) => <ShopItem shop={item} classname='min-w-[200px] ' key={item.id} />)}</>
    )}
  </div>
)

export default DynamicFlex
