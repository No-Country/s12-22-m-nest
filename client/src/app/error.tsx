'use client'
import { Button } from '@/components'
import { routes } from '@/utils/constants/routes.const'
import { type FunctionComponent } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: FunctionComponent<Props> = ({ reset }) => (
  <>
    <main className='flex flex-col items-center'>
      <section className='padding-general-x flex min-h-[100vh] flex-col items-center justify-center 2xl:container'>
        <h1 className='text-center text-2xl !font-light'>
          Ocurrió un error <b className='font-semibold'>inesperado.</b>
        </h1>
        <p className='text-center'>Esto puede deberse a un error de conexión o a un error en el servidor</p>
        <div className='flex gap-2'>
          <Button href={routes.customer.HOME} title='Volver al inicio' className='mt-4' />
          <Button onClick={reset} title='Reintentar' className='mt-4' variant='flat' />
        </div>
      </section>
    </main>
  </>
)

export default Error
