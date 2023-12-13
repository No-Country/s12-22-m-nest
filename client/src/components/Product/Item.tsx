'use client'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import ModalProduct from './Modal'
import { useDisclosure } from '@nextui-org/react'

interface Props {
  product: Product
}

const ProductItem: FunctionComponent<Props> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = (): void => {
    onOpen()
  }

  return (
    <div className='min-w-[150px] md:min-w-[200px]'>
      <div className='flex cursor-pointer flex-col gap-3' onClick={handleOpen}>
        <div className='relative aspect-square w-full'>
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
      </div>
      <ModalProduct product={product} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default ProductItem
