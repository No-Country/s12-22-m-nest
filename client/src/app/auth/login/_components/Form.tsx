'use client'
import { Input, Button } from '@/components'
import { type LoginFormData } from '@/interfaces'
import { loginService } from '@/services/auth/login.service'
import { emailValidations, passwordValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Form: FunctionComponent = () => {
  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await loginService(data.email, data.password)
      if (res?.url) {
        toast.success('Ingresando a su Cuenta')
        router.push(res.url)
      }
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
          validations: emailValidations
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
          validations: passwordValidations
        }}
        errorMessage={errors?.password?.message}
      />
      <Button type='submit' isLoading={isSubmitting} color='primary' radius='full' title='Ingresar' />
    </form>
  )
}

export default Form
