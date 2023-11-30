import { type FunctionComponent } from 'react'
import Form from './_components/Form'

const Page: FunctionComponent = () => (
  <div className='flex w-full flex-col gap-5'>
    <div className='flex w-full flex-col gap-1 '>
      <h1 className='text-3xl'>
        Ingresar a <b>LleGo!</b>
      </h1>
      <p className='text-base'>Ingreso para repartidores</p>
    </div>
    <Form />
  </div>
)

export default Page
