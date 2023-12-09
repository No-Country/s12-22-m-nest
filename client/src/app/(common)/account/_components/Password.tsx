'use client'
import { Button, Input } from '@/components'
import { type PasswordFormProps, type User } from '@/interfaces'
import { passwordValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { updatePassword } from '@/services/users/updatePassword.service'

interface Props {
  user: User
}

const PasswordForm: FunctionComponent<Props> = ({ user }) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<PasswordFormProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<PasswordFormProps> = async (data) => {
    try {
      const { error } = await updatePassword(user?.id, data, session?.user?.sessionId ?? '')
      if (error) throw new Error()
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
          type='password'
          label='Contraseña actual'
          placeholder='Ingrese su contraseña actual'
          name='oldPassword'
          hookForm={{
            register,
            validations: passwordValidations
          }}
          errorMessage={errors?.oldPassword?.message}
        />
        <Input
          type='password'
          label='Nueva contraseña'
          placeholder='Ingrese su nueva contraseña'
          name='newPassword'
          hookForm={{
            register,
            validations: passwordValidations
          }}
          errorMessage={errors?.newPassword?.message}
        />
        <Input
          type='password'
          label='Repetir nueva contraseña'
          placeholder='Repita su nueva contraseña'
          name='repeatPassword'
          hookForm={{
            register,
            validations: passwordValidations
          }}
          errorMessage={errors?.repeatPassword?.message}
        />
      </div>
      <Button type='submit' isLoading={isSubmitting} title='Guardar' />
    </form>
  )
}

export default PasswordForm
