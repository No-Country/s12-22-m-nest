'use client'
import { type FunctionComponent } from 'react'
import { type Shop, type Product } from '@/interfaces'
import { ProductItem, ShopItem } from '.'

interface Props {
  products?: Product[] | null
  shops?: Shop[] | null
}

const DynamicCarrousel: FunctionComponent<Props> = ({ products, shops }) => (
    <div className='flex gap-4 overflow-x-auto scroll-smooth'>
          { products?.map(item => (
            <ProductItem product={item} key={item.id}/>
          ))
          }
          {
            shops?.map(item => (
              <ShopItem shop={item} key={item.id}/>
            ))
          }
    </div>
)

export default DynamicCarrousel
