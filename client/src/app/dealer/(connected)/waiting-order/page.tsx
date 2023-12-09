import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import Content from './_components/Content'
import { TopBarDealer } from '@/components'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { redirect } from 'next/navigation'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return
  const { data } = await checkAvailability(session?.user?.id)

  if (!data?.isAvailable && data?.orderId) {
    redirect(Routes.ORDER(data?.orderId))
  }

  return (
    <main className=' flex min-h-screen flex-col items-start pt-[100px] '>
      <TopBarDealer title='CONNECTED' description='WAITING_ORDER' switch={true} isSwitchActive={true} />
      <Content session={session} />
    </main>
  )
}

export default Page
