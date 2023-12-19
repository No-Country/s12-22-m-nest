/* eslint-disable @typescript-eslint/member-delimiter-style */
'use client'
import { Input, Button, SimpleSelect } from '@/components'
import { type Type, type RegisterFormData } from '@/interfaces'
import { registerService } from '@/services/auth/register.service'
import { ScrollShadow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import {
  birthdateValidations,
  emailValidations,
  nameValidations,
  passwordValidations
} from '@/utils/constants/validations.const'

const roles: Array<{ value: Type; label: string }> = [
  {
    value: 'customer',
    label: 'Cliente'
  },
  {
    value: 'dealer',
    label: 'Repartidor'
  },
  {
    value: 'shop',
    label: 'Tienda'
  }
]

const Form: FunctionComponent = () => {
  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    control,
    getValues
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
      router.push(routes.auth.LOGIN)
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
            validations: nameValidations.firstName
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
            validations: nameValidations.lastName
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
            validations: emailValidations
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
            validations: birthdateValidations
          }}
          errorMessage={errors?.birthdate?.message}
        />
        <Controller
          name='type'
          control={control}
          rules={{ required: { value: true, message: 'Este campo es requerido' } }}
          render={({ field }: any) => (
            <SimpleSelect
              name='role'
              field={field}
              label='¿Que tipo de usuario eres?'
              defaultSelectedKeys={[getValues('type')]}
              setSelected={(selected) => {
                setValue('type', selected as Type)
              }}
              names={roles}
              placeholder='Selecciona una opcion'
              errorMessage={errors?.type?.message?.toString()}
            />
          )}
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
    </ScrollShadow>
  )
}

export default Form
