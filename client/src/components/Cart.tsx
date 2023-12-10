'use client'
import { useState, type FunctionComponent, useEffect } from 'react'
import { Button, ProductCartGrid } from '.'
import { createPortal } from 'react-dom'
import { useCartStore } from '@/context/zustand/cart.store'
import { type Product } from '@/interfaces'
import { getAllItems } from '@/services/cart/getAll.service'

const Cart: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    void handleUpdateCart()
  }, [items])

  const handleUpdateCart = async (): Promise<void> => {
    const products = await getAllItems(items)
    setProducts(products)
  }

  const handleOpen = async (): Promise<void> => {
    await handleUpdateCart()
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }

  return (
    <>
      <Button title='Carrito' variant='flat' onClick={handleOpen} />
      {isOpen &&
        createPortal(
          <div className='fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-end bg-[#00000062] '>
            <div className='flex h-full w-[350px] flex-col items-start bg-white px-5   pb-10'>
              <Button title='Cerrar' variant='light' onClick={handleClose} />
              <div className='h-auto w-full flex-grow  '>
                <ProductCartGrid products={products} />
              </div>
              <Button title='Pagar' variant='solid' color='primary' fullWidth />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Cart
