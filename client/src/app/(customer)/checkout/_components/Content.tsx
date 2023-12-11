'use client'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useCartStore } from '@/context/zustand/cart.store'
import { type ShippingFormProps, type Product, type User, type OrderFormProps } from '@/interfaces'
import { getAllItems } from '@/services/cart/getAll.service'
import { Button, Input, ProductsTable } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { addressValidations } from '@/utils/constants/validations.const'
import { createOrder } from '@/services/orders/create.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'

interface Props {
  user: User
}

const Content: FunctionComponent<Props> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)
  const cleanCart = useCartStore((state) => state.cleanCart)
  const router = useRouter()

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
        client: user.id,
        products: products.map((product) => product.id),
        shop: products[0].shop.id
      }
      console.log(order)
      const { data: res } = await createOrder(order)
      toast.success('Compra realizada con exito')
      router.push(routes.customer.ORDER_TRACKING(res?.id ?? ''))
      cleanCart()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className='flex w-full flex-col justify-between gap-5'>
        <h1 className='text-2xl font-semibold'>Ya casi es tuyo</h1>
        <ProductsTable products={products} />
      </section>
      <section className='flex w-full flex-col justify-between gap-5'>
        <h1 className='text-2xl font-semibold'>Datos de envio</h1>
        <form className='flex flex-col items-end gap-4' onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            label='Direccion de envio'
            placeholder='Ingrese su direccion'
            name='shipAddress'
            hookForm={{
              register,
              validations: addressValidations
            }}
            errorMessage={errors?.shipAddress?.message}
          />
          <Button type='submit' title='Finalizar compra' isLoading={isSubmitting} />
        </form>
      </section>
    </>
  )
}

export default Content
