'use client'
import { loginService } from '@/services/auth/login.service'
import { Button, Input } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface LoginFormData {
  email: string
  password: string
}

const Form: FunctionComponent = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { status } = await loginService(data.email, data.password)
      if (status === 401) {
        toast.error('Credenciales incorrectas')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Email'
        placeholder='Ingrese su email'
        size='md'
        labelPlacement='outside'
        {...register('email', { required: { value: true, message: 'Este campo es requerido' } })}
        errorMessage={errors?.email?.message}
      />
      <Input
        type='password'
        label='Contraseña'
        placeholder='Ingrese su contraseña'
        size='md'
        labelPlacement='outside'
        {...register('password', { required: { value: true, message: 'Este campo es requerido' } })}
        errorMessage={errors?.password?.message}
      />
      <Button type='submit' isLoading={isSubmitting} color='primary' radius='full'>
        Ingresar
      </Button>
    </form>
  )
}

export default Form
