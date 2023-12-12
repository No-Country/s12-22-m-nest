'use client'
import { Button, Input } from '@/components'
import { type CreateProductProps } from '@/interfaces'
import { productValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { routes } from '@/utils/constants/routes.const'
import { createProduct } from '@/services/products/createProduct.service'

const ProductForm: FunctionComponent = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<CreateProductProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<CreateProductProps> = async (data) => {
    try {
      const formData: CreateProductProps = {
        ...data,
        price: parseInt(data.price.toString()),
        shopId: session?.user?.shopId ?? '',
        ...(data.thumbnail && { thumbnail: (data.thumbnail as FileList)[0] })
      }
      const { error } = await createProduct(formData, session?.user?.sessionId ?? '')
      if (error) return toast.error('Ocurrió un error')
      router.push(routes.shop.SHOP(session?.user?.shopId ?? ''))
      router.refresh()
      toast.success('Producto creado')
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return (
    <form className='flex flex-col items-end gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full gap-4 lg:grid-cols-2'>
        <Input
          type='text'
          label='Titulo'
          placeholder='Ingrese un titulo'
          name='name'
          hookForm={{
            register,
            validations: productValidations.name
          }}
          errorMessage={errors?.name?.message}
        />
        <Input
          type='number'
          label='Precio'
          placeholder='Ingrese un precio'
          name='price'
          hookForm={{
            register,
            validations: productValidations.price
          }}
          errorMessage={errors?.price?.message}
        />
        <Input
          type='text'
          label='Descripcion'
          placeholder='Ingrese una descripcion'
          name='description'
          hookForm={{
            register,
            validations: productValidations.description
          }}
          errorMessage={errors?.description?.message}
        />
        <Input
          type='file'
          label='Foto de portada'
          placeholder='Foto de portada'
          name='thumbnail'
          hookForm={{
            register,
            validations: {
              required: false,
              validate: (value: FileList) => {
                if (value?.length > 0) {
                  if (value[0].size > 5000000) {
                    return 'La imagen no debe pesar mas de 5MB'
                  }
                }
              }
            }
          }}
          errorMessage={errors?.thumbnail?.message}
        />
      </div>
      <Button type='submit' isLoading={isSubmitting} title='Guardar' />
    </form>
  )
}

export default ProductForm
