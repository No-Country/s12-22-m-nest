import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import Content from './_components/Content'
import { TopBarDealer } from '@/components'
import { type Metadata } from 'next'
import RoleMiddleware from '@/app/role.middleware'

export const metadata: Metadata = {
  title: 'Esperando una orden | LleGo!'
}

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return

  return (
    <>
      <RoleMiddleware />
      <main className=' flex min-h-screen flex-col items-start pt-[100px] '>
        <TopBarDealer title='CONNECTED' description='WAITING_ORDER' switch={true} isSwitchActive={true} />
        <Content session={session} />
      </main>
    </>
  )
}

export default Page
