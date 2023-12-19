import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Header } from '@/components'
import { routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

const Onboarding: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return
  if (session?.user?.shopId) {
    redirect(routes.shop.HOME)
  }

  return (
    <>
      <Header withBorder layout='simple' />
      <main className='padding-general-x flex flex-col items-center justify-between pt-[100px]'>
        <h1>Onboarding</h1>
      </main>
    </>
  )
}

export default Onboarding
