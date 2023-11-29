//page de prueba para los componentes
'use client'
import { type FunctionComponent } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input' // Ajusta la ruta de importación según tu estructura de carpetas
import { TextArea } from '../../components/TextArea' // Ajusta la ruta de importación según tu estructura de carpetas
import { Button } from '../../components/Button/Button' // Ajusta la ruta de importación según tu estructura de carpetas

interface FormData {
  name: string
  message: string
}

const Page: FunctionComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData): void => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Name:
            <Input type="text" name="name" register={register} validations={{ required: 'Name is required' }} />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
        </div>

        <div>
          <label>
            Message:
            <TextArea name="message" register={register} validations={{ required: 'Message is required' }} />
            {errors.message && <p>{errors.message.message}</p>}
          </label>
        </div>

        <div>
        <Button>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default Page
