import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Header } from '@/components'
import { routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'
import MultiSteps from './_components/MultiSteps'

const Onboarding: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return
  if (session?.user?.shopId) {
    redirect(routes.shop.HOME)
  }

  return (
    <>
      <Header withBorder layout='simple' />
      <main className='padding-general-x min-h-[70vh] w-3/5 m-auto mt-[110px] mb-[50px]'>
        <MultiSteps/>
      </main>
    </>
  )
}

export default Onboarding
