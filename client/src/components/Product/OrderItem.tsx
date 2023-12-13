'use client'
import { type Product } from '@/interfaces'

import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  product: Product
}

const ProductOrderItem: FunctionComponent<Props> = ({ product }) => (
  <div className='flex items-center gap-2 rounded-lg bg-gray-100 p-2'>
    <Image
      alt='image'
      src={product.thumbnail || '/image/placeholder.png'}
      width={40}
      height={40}
      className='aspect-square rounded-md object-cover'
    />
    <div className='flex w-full items-center justify-between'>
      <p className='text-sm font-semibold'>{product.name}</p>
      <p className='mr-2 text-sm font-semibold'>${product.price}</p>
    </div>
  </div>
)

export default ProductOrderItem
