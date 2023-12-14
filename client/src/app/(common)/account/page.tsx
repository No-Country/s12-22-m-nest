import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Tabs } from '@/components'
import { getUser } from '@/services/users/getUser.service'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import type { Metadata } from 'next'
import Hero from './_components/Hero'
import { accountTabs } from '@/lib/accountTabs.lib'

export const metadata: Metadata = {
  title: 'Cuenta | LleGO!'
}

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  const { data: user } = await getUser(session?.user?.id ?? '')
  if (!user) return null
  const items = accountTabs(user)
  return (
    <main className='padding-general-x flex flex-col items-center gap-10 pb-10 pt-[100px] lg:gap-5 '>
      <Hero session={session} user={user} />
      <section className='flex w-full flex-col gap-3 2xl:container'>
        <Tabs items={items} variant='solid' />
      </section>
    </main>
  )
}

export default Page
