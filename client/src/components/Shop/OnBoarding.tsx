'use client'
import { Button, Input } from '@/components'
import { type ShopFormProps } from '@/interfaces'
import { shopValidations } from '@/utils/constants/validations.const'
import { useState, type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CreateShop } from '@/services/shops/createShop.service'
import Image from 'next/image'

interface Props {
  step: number
  nextStep: () => Promise<void>
  previousStep: () => Promise<void>
}

const ShopForm: FunctionComponent<Props> = ({ step, nextStep, previousStep }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    trigger,
    getValues
  } = useForm<ShopFormProps>({
    mode: 'onChange'
  })

  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState({})

  const handleFile = async(e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      setFile(e.target.files[0])
      e.target.files[0].size < 5000000
        ? setImage(URL.createObjectURL(e.target.files[0]))
        : toast.error('Selecciona una imagen que pese menos que 5MB')
    } else toast.error('No se pudo cargar la imagen')
  }

  const handleNextStep = async(): Promise<void> => {
    const isValid = await trigger(['name', 'description'])
    isValid && await nextStep()
  }

  const onSubmit: SubmitHandler<ShopFormProps> = async (data) => {
    try {
      const formData = {
        ...data,
        ...(data.thumbnail && { thumbnail: file as FileList }),
        userId: session?.user.id
      }
      if (session?.user.id) await CreateShop(formData, session?.user?.sessionId)
      router.refresh()
      toast.success('Se creó correctamente')
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return (
    <div>
      <div className='pt-1 pb-6'>
        <h1 className='font-semibold text-2xl text-green-800'>{
          (step === 1 && 'Bienvenido!') || (step === 2 && 'Ya casi terminamos :)')
        }</h1>
        <p className='font-medium'>{
          (step === 1 && 'Registra tu tienda ahora y prepárate para brillar en nuestra plataforma 💼🚀') ||
        (step === 2 && 'Unos datos más y estará todo listo para vender tus productos...')
        }</p>
      </div>
      <form className='flex flex-col gap-7' onSubmit={handleSubmit(onSubmit)}>
        {
          step === 1 &&
          <div className='flex flex-col gap-2'>
            <label className='text-sm'>Foto de portada</label>
            <div className={`${!image && 'h-[150px]'} w-[150px] rounded-full mx-auto mb-4 relative flex justify-center items-center shadow-md shadow-gray-400 cursor-pointer`}
            onClick={() => {
              const input: HTMLElement = document.querySelector('#input-file') as HTMLElement
              input.click()
            }}>
              <input {...register('thumbnail', { required: true })} id='input-file' name='thumbnail' type='file' accept='image/*' onChange={handleFile} className={`absolute ${image && 'opacity-0'} hidden`}/>
              {
                image
                  ? <Image src={image} width={100} height={100} className='rounded-full object-cover w-[150px] h-[150px]' alt='profile-image'/>
                  : <Button type='button' title={'📂'} className='bg-transparent'/>
              }
            </div>
            <Input
              type='text'
              label='Nombre de la tienda'
              placeholder='Ingrese el nombre de la tienda'
              name='name'
              hookForm={{
                register,
                validations: shopValidations.name
              }}
              defaultValue={getValues('name')}
              errorMessage={errors?.name?.message}
            />
            <Input
              type='text'
              label='Descripción'
              placeholder='Ingrese la descripción de la tienda'
              name='description'
              defaultValue={getValues('description')}
              hookForm={{
                register,
                validations: shopValidations.description
              }}
              errorMessage={errors?.description?.message}
            />
          </div>
        }
        {
          step === 2 &&
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              label='Dirección'
              placeholder='Ingrese la dirección de la tienda'
              name='address'
              hookForm={{
                register,
                validations: shopValidations.address
              }}
              defaultValue={getValues('address')}
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
              defaultValue={getValues('phone')}
              errorMessage={errors?.phone?.message}
            />
          </div>
        }
        {
          step === 1
            ? <Button type='button' title='Siguiente'
                onClick={handleNextStep}/>
            : <div className='flex flex-col gap-2'>
              <Button type='submit' isLoading={isSubmitting} title='Guardar' />
              <Button type='button' className='bg-green-50 text-green-700' title='Volver' onClick={previousStep}/>
            </div>
        }
    </form>
    </div>
  )
}

export default ShopForm
