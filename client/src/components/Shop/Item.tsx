'use client'
import { type Shop } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'
import Image from 'next/image'
import Link from 'next/link'
import { type FunctionComponent } from 'react'

interface Props {
  shop: Shop
}

const ShopItem: FunctionComponent<Props> = ({ shop }) => (
  <Link href={routes.customer.SHOP(shop.id)}>
    <div className='flex cursor-pointer flex-col gap-3'>
      <div className='relative aspect-square w-full'>
        <Image
          src={shop.thumbnail || '/image/placeholder.png'}
          alt={shop.name}
          fill
          className='aspect-square rounded-full object-cover'
        />
      </div>
      <div className='flex flex-col items-center gap-1'>
        <h3 className='text-center text-base font-semibold'>{shop.name}</h3>
      </div>
    </div>
  </Link>
)

export default ShopItem
