import { type FunctionComponent } from 'react'
import Form from './_components/Form'

const Register: FunctionComponent = async () => (
  <div className='flex w-full flex-col gap-5'>
    <div className='flex w-full flex-col gap-1 '>
      <h1 className='text-3xl'>
        Registrarse en <b>LleGo!</b>
      </h1>
      <p className='text-base'>Registro para repartidores</p>
    </div>
    <div className='overflow-hidden md:max-h-[400px]'>
      <Form />
    </div>
  </div>
)

export default Register
