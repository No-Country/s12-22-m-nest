import { Footer, Header } from '@/components'
import { image } from '@/utils/constants/img.const'
import Image from 'next/image'
import { type FunctionComponent, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AuthLayout: FunctionComponent<Props> = ({ children }) => (
  <>
    <Header layout='simple' logo='white' />
    <main className='relative flex w-full justify-center lg:min-h-screen '>
      <div className='absolute inset-0 z-[0] '>
        <div className='absolute inset-0 z-[1] bg-black opacity-50' />
        <Image src={image.auth.hero} alt='Hero' layout='fill' objectFit='cover' objectPosition='center' />
      </div>
      <section className='z-[1] grid h-full w-full 2xl:container  lg:grid-cols-[auto_450px]'>
        <div className='padding-general-x relative flex min-h-[300px] flex-col items-end justify-end gap-2 py-10 lg:min-h-0'>
          <div className='z-[1] w-full'>
            <h1 className='text-4xl text-white'>
              Somos <b>LleGo!</b>
            </h1>
            <p className=' text-base text-white'>La plataforma que te acerca eso que tanto te gusta</p>
          </div>
        </div>
        <div className='padding-general-x flex flex-col items-center justify-center bg-white py-10 lg:min-h-screen'>
          {children}
        </div>
      </section>
    </main>
    <Footer />
  </>
)

export default AuthLayout
