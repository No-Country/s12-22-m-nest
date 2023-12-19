'use client'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useCartStore } from '@/context/zustand/cart.store'
import { type ShippingFormProps, type Product, type OrderFormProps } from '@/interfaces'
import { getAllItems } from '@/services/cart/getAll.service'
import { Button, GeoAutocomplete, ProductsTable } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { createOrder } from '@/services/orders/create.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'

interface Props {
  userId: string
}

const Content: FunctionComponent<Props> = ({ userId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)
  const cleanCart = useCartStore((state) => state.cleanCart)
  const router = useRouter()
  const [address, setAddress] = useState<string>('')
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<ShippingFormProps>({
    mode: 'onChange'
  })

  useEffect(() => {
    void handleUpdateCart()
  }, [items])

  const handleUpdateCart = async (): Promise<void> => {
    const products = await getAllItems(items)
    setProducts(products)
  }

  const onSubmit: SubmitHandler<ShippingFormProps> = async (data) => {
    try {
      const order: OrderFormProps = {
        ...data,
        client: userId,
        products: products.map((product) => product.id),
        shop: products[0].shop.id
      }
      const { data: res, error } = await createOrder(order)
      if (error || !res) throw new Error()
      toast.success('Compra realizada con exito')
      router.push(res)
      cleanCart()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {items?.length <= 0 && (
        <section className='flex min-h-[400px] w-full flex-col items-center justify-center 2xl:container'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <div>
              <h1 className='text-center text-2xl font-semibold'>No hay productos en tu carrito</h1>
              <p className='text-center'>¿Que esperas para agregar productos a tu carrito?</p>
            </div>
            <Button
              title='Ir a comprar'
              onClick={() => {
                router.push(routes.customer.ALL_PRODUCTS)
              }}
            />
          </div>
        </section>
      )}
      {items?.length > 0 && (
        <>
          <section className='flex w-full flex-col justify-between gap-5 pt-8 2xl:container'>
            <h1 className='text-2xl font-semibold'>Ya casi es tuyo</h1>
            <ProductsTable products={products} />
          </section>
          <section className='flex w-full flex-col justify-between gap-4 2xl:container'>
            <h1 className='text-2xl font-semibold'>Datos de envio</h1>
            <form className='flex flex-col  gap-3' onSubmit={handleSubmit(onSubmit)}>
              <GeoAutocomplete
                address={address}
                setAddress={setAddress}
                name='shipAddress'
                hookForm={{
                  register,
                  validations: { required: { value: true, message: 'Este campo es requerido' } }
                }}
                errors={errors}
              />
              <div className='flex w-full justify-start'>
                <Button type='submit' title='Finalizar compra' isLoading={isSubmitting} />
              </div>
            </form>
          </section>
        </>
      )}
    </>
  )
}

export default Content
