'use client'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import ModalProduct from './Modal'
import { useDisclosure } from '@nextui-org/react'
import { Button } from '..'
import { useCartStore } from '@/context/zustand/cart.store'

interface Props {
  product: Product
}

const ProductCartItem: FunctionComponent<Props> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const removeItem = useCartStore((state) => state.removeItem)
  return (
    <>
      <div className='flex cursor-pointer items-start  gap-2' onClick={onOpen}>
        <div className='relative aspect-square min-w-[60px] '>
          <Image
            src={product.thumbnail || '/image/placeholder.png'}
            alt={product.name}
            fill
            className='aspect-square rounded-2xl object-cover'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div>
            <h3 className='text-base font-semibold'>{product.name}</h3>
            <p className='text-sm '>{product.shop.name}</p>
          </div>
          <p className='text-base font-semibold text-primary '>${product.price}</p>
        </div>
        <Button
          title='Quitar'
          size='sm'
          variant='flat'
          onClick={() => {
            removeItem(product.id)
          }}
        />
      </div>
      <ModalProduct product={product} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ProductCartItem
