import { type FunctionComponent } from 'react'
import Form from './_components/Form'
import { type Metadata } from 'next'
import Link from 'next/link'
import { routes } from '@/utils/constants/routes.const'

export const metadata: Metadata = {
  title: 'Ingresar | LleGo!'
}

const Page: FunctionComponent = () => (
  <div className='flex w-full flex-col gap-5'>
    <div className='flex w-full flex-col gap-1 '>
      <h1 className='text-3xl'>
        Ingresar a <b>LleGo!</b>
      </h1>
      <p className='text-base'>Te damos la bienvenida</p>
    </div>
    <Form />
    <Link href={routes.auth.REGISTER} className='flex w-full justify-center font-light'>
      <p>
        ¿No tienes una cuenta? <b className='font-semibold text-primary'>Registrate</b>
      </p>
    </Link>
  </div>
)

export default Page
