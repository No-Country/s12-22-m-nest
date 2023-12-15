import { type FunctionComponent } from 'react'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import Content from './_components/Content'
import { type Metadata } from 'next'
import { Header } from '@/components'

export const metadata: Metadata = {
  title: 'Checkout | LleGo!'
}

const Checkout: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  return (
    <>
      <Header withBorder />
      <main className='padding-general-x flex flex-col items-center gap-10 pb-10 pt-[100px]  lg:gap-8 '>
        <Content userId={session?.user?.id} />
      </main>
    </>
  )
}

export default Checkout
