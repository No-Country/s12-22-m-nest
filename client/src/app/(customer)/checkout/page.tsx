import { type FunctionComponent } from 'react'
import { getUser } from '@/services/users/getUser.service'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import Content from './_components/Content'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | LleGo!'
}

const Checkout: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const { data: user } = await getUser(session?.user?.id)
  if (!user) return null
  return (
    <main className='padding-general-x flex flex-col items-center gap-10 pb-10 pt-[100px]  lg:gap-8 '>
      <Content user={user} />
    </main>
  )
}

export default Checkout
