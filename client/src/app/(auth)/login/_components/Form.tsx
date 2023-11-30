'use client'
import { Input, Button } from '@/components'
import { loginService } from '@/services/auth/login.service'
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
      await loginService(data.email, data.password)
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Email'
        placeholder='Ingrese su email'
        name='email'
        hookForm={{
          register,
          validations: {
            required: { value: true, message: 'Este campo es requerido' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ingrese un email válido'
            }
          }
        }}
        errorMessage={errors?.email?.message}
      />
      <Input
        type='password'
        label='Contraseña'
        placeholder='Ingrese su contraseña'
        name='password'
        hookForm={{
          register,
          validations: {
            required: { value: true, message: 'Este campo es requerido' }
          }
        }}
        errorMessage={errors?.password?.message}
      />
      <Button type='submit' isLoading={isSubmitting} color='primary' radius='full' title='Ingresar' />
    </form>
  )
}

export default Form
