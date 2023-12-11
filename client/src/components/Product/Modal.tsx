'use client'
import React, { type FunctionComponent } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { Button } from '..'
import Link from 'next/link'
import { routes } from '@/utils/constants/routes.const'
import { useCartStore } from '@/context/zustand/cart.store'
import { useSession } from 'next-auth/react'

interface Props {
  product: Product
  onClose: () => void
  isOpen: boolean
}

const ModalProduct: FunctionComponent<Props> = ({ product, onClose, isOpen }) => {
  const { data: session, status } = useSession()
  const addItem = useCartStore((state) => state.addItem)
  return (
    <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1' />
            <ModalBody>
              <div className='flex flex-row gap-5'>
                <div className='relative aspect-square min-w-[40%]'>
                  <Image
                    src={product.thumbnail || '/image/placeholder.png'}
                    alt={product.name}
                    fill
                    className='aspect-square rounded-2xl object-cover'
                  />
                </div>
                <div className='flex w-auto flex-col gap-4'>
                  <div className='flex w-auto flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <div>
                        <p className='text-2xl font-semibold '>{product.name}</p>
                        <Link href={routes.customer.SHOP(product.shop.id)}>
                          <p className=' text-sm'>{product.shop.name}</p>
                        </Link>
                      </div>
                      <p className='text-xl font-semibold text-primary '>${product.price}</p>
                    </div>
                    <p className='text-base'>{product.description}</p>
                    <div>
                      {(session?.user?.type === 'customer' || status === 'unauthenticated') && (
                        <Button
                          title='Agregar al carrito'
                          variant='solid'
                          color='primary'
                          onClick={() => {
                            addItem(product)
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalProduct
