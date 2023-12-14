'use client'
import { Button, Input } from '@/components'
import { type ShopFormProps, type User } from '@/interfaces'
import { shopValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { updateShop } from '@/services/shops/updateShop.service'

interface Props {
  user: User
}

const ShopForm: FunctionComponent<Props> = ({ user }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<ShopFormProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ShopFormProps> = async (data) => {
    try {
      const formData = {
        ...data,
        ...(data.thumbnail && { thumbnail: (data.thumbnail as FileList)[0] })
      }
      await updateShop(user?.shopId ?? '', formData, session?.user?.sessionId ?? '')
      router.refresh()
      await mutate(Endpoints.FIND_USER(session?.user?.id ?? ''))
      toast.success('Se actualizó correctamente')
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
          label='Nombre de la tienda'
          placeholder='Ingrese el nombre de la tienda'
          name='name'
          hookForm={{
            register,
            validations: shopValidations.name
          }}
          defaultValue={user?.shop?.name}
          errorMessage={errors?.name?.message}
        />
        <Input
          type='text'
          label='Descripción'
          placeholder='Ingrese la descripción de la tienda'
          name='description'
          hookForm={{
            register,
            validations: shopValidations.description
          }}
          defaultValue={user?.shop?.description}
          errorMessage={errors?.description?.message}
        />
        <Input
          type='text'
          label='Dirección'
          placeholder='Ingrese la dirección de la tienda'
          name='address'
          hookForm={{
            register,
            validations: shopValidations.address
          }}
          defaultValue={user?.shop?.address}
          errorMessage={errors?.address?.message}
        />
        <Input
          type='text'
          label='Teléfono'
          placeholder='Ingrese el teléfono de la tienda'
          name='phone'
          hookForm={{
            register,
            validations: shopValidations.phone
          }}
          defaultValue={user?.shop?.phone}
          errorMessage={errors?.phone?.message}
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

export default ShopForm
