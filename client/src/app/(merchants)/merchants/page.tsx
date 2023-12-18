import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import RoleMiddleware from '@/app/role.middleware'
import { Button, Header } from '@/components'
import Image from 'next/image'
import { routes } from '@/utils/constants/routes.const'

export const metadata: Metadata = {
  title: 'Conviertete en una tienda | LleGo!'
}

const Home: FunctionComponent = () => (
  <>
    <Header withBorder />
    <RoleMiddleware />
    <main className='padding-general-x flex flex-col items-center justify-between pt-[100px]'>
      <section className='flex w-full flex-col-reverse items-center justify-center  2xl:container md:grid md:grid-cols-2 md:gap-10 '>
        <div className='flex flex-col items-start gap-2 pb-10 md:pb-0 '>
          <h1 className='text-3xl font-light'>
            <b className='font-semibold'>Simplifica</b> la logistica de tu negocio
          </h1>
          <p>
            LleGo! es una plataforma que te permite conectar con repartidores independientes para realizar tus entregas
          </p>
          <Button title='Quiero ser parte' className='mt-2' href={routes.auth.REGISTER} />
        </div>
        <div className='relative   w-full py-10'>
          <div className='relative aspect-square w-full sm:aspect-auto sm:h-[300px] md:h-[400px] '>
            <Image src='/image/merchants-hero.jpg' alt='Hero image' fill objectFit='cover' className='rounded-full' />
          </div>
        </div>
      </section>
    </main>
  </>
)

export default Home
