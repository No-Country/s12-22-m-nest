'use client'
import { Input, Button } from '@/components'
import { type User } from '@/interfaces'
import { registerService } from '@/services/auth/register.service'
import { ScrollShadow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Routes } from '@/utils/constants/routes.const'

type RegisterFormData = Omit<User, 'id'>

const Form: FunctionComponent = () => {
  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<RegisterFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const formData = {
        ...data,
        birthdate: new Date(data.birthdate).toISOString()
      }
      const { error } = await registerService(formData)
      if (error) {
        toast.error('Ocurrió un error')
      }
      router.push(Routes.LOGIN)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollShadow className='h-full w-full  overflow-scroll'>
      <form className='flex  flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Nombre'
          placeholder='Ingrese su nombre'
          name='firstName'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'Este campo es requerido' },
              minLength: {
                value: 3,
                message: 'Debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 25,
                message: 'Debe tener máximo 25 caracteres'
              }
            }
          }}
          errorMessage={errors?.firstName?.message}
        />
        <Input
          type='text'
          label='Apellido'
          placeholder='Ingrese su apellido'
          name='lastName'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'Este campo es requerido' },
              minLength: {
                value: 3,
                message: 'Debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 25,
                message: 'Debe tener máximo 25 caracteres'
              }
            }
          }}
          errorMessage={errors?.lastName?.message}
        />
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
          type='date'
          label='Fecha de nacimiento'
          placeholder='Ingrese su fecha de nacimiento'
          name='birthdate'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          errorMessage={errors?.birthdate?.message}
        />
        <Input
          type='password'
          label='Contraseña'
          placeholder='Ingrese su contraseña'
          name='password'
          hookForm={{
            register,
            validations: {
              required: { value: true, message: 'Este campo es requerido' },
              minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres'
              },
              maxLength: {
                value: 25,
                message: 'Debe tener máximo 25 caracteres'
              }
            }
          }}
          errorMessage={errors?.password?.message}
        />
        <Button type='submit' isLoading={isSubmitting} color='primary' radius='full' title='Ingresar' />
      </form>
    </ScrollShadow>
  )
}

export default Form
