'use client'
import { type FunctionComponent } from 'react'
import { type Shop, type Product } from '@/interfaces'
import { ProductItem, ShopItem } from '.'

interface Props {
  products?: Product[] | null
  shops?: Shop[] | null
}

const DynamicFlex: FunctionComponent<Props> = ({ products, shops }) => (
    <div className='flex gap-4 overflow-x-auto pb-5 scrollbar-general'>
          { products?.map(item => (
            <ProductItem product={item} classname='min-w-[100px] sm:min-w-[200px]' key={item.id}/>
          ))
          }
          {
            shops?.map(item => (
              <ShopItem shop={item} classname='min-w-[100px] sm:min-w-[200px]' key={item.id}/>
            ))
          }
    </div>
)

export default DynamicFlex
