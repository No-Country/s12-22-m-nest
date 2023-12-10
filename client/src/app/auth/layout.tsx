import { type FunctionComponent, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AuthLayout: FunctionComponent<Props> = ({ children }) => (
  <main className='grid min-h-screen w-full grid-cols-[auto_450px] bg-green-800 '>
    <div className='flex flex-col items-start justify-end gap-2 p-10'>
      <h1 className='text-4xl text-white'>
        Somos <b>LleGo!</b>
      </h1>
      <p className=' text-base text-white'>La plataforma que te acerca eso que tanto te gusta</p>
    </div>
    <div className='flex min-h-screen flex-col items-center justify-center bg-white p-10'>{children}</div>
  </main>
)

export default AuthLayout
