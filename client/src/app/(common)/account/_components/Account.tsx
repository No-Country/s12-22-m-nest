'use client'
import { Button, Input } from '@/components'
import { type AccountFormProps, type User } from '@/interfaces'
import { emailValidations, firstNameValidations, lastNameValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateUser } from '@/services/users/updateUser.service'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'

interface Props {
  user: User
}

const AccountForm: FunctionComponent<Props> = ({ user }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<AccountFormProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<AccountFormProps> = async (data) => {
    try {
      const formData = {
        ...data,
        ...(data.profileImage && { profileImage: data.profileImage[0] })
      }
      await updateUser(user?.id, formData, session?.user?.sessionId ?? '')
      router.refresh()
      console.log('session?.user?.id', session?.user?.id)
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
          label='Nombre'
          placeholder='Ingrese su nombre'
          name='firstName'
          hookForm={{
            register,
            validations: firstNameValidations
          }}
          defaultValue={user?.firstName}
          errorMessage={errors?.firstName?.message}
        />
        <Input
          type='text'
          label='Apellido'
          placeholder='Ingrese su apellido'
          name='lastName'
          hookForm={{
            register,
            validations: lastNameValidations
          }}
          defaultValue={user?.lastName}
          errorMessage={errors?.lastName?.message}
        />
        <Input
          type='text'
          label='Correo electronico'
          placeholder='Ingrese su email'
          name='email'
          hookForm={{
            register,
            validations: emailValidations
          }}
          defaultValue={user?.email}
          errorMessage={errors?.email?.message}
        />
        <Input
          type='file'
          label='Foto de perfil'
          placeholder='Foto de perfil'
          name='profileImage'
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
          errorMessage={errors?.profileImage?.message}
        />
      </div>
      <Button type='submit' isLoading={isSubmitting} title='Guardar' />
    </form>
  )
}

export default AccountForm
