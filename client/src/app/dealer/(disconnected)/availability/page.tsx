import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { DynamicMap, TopBarDealer } from '@/components'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return

  return (
    <main className=' flex min-h-screen flex-col items-start pt-[100px] '>
      <TopBarDealer title='DISCONNECTED' description='DISCONNECTED' switch={true} isSwitchActive={false} />
      <section className='relative h-full w-screen flex-grow'>
        <DynamicMap
          locations={{
            shipCoordinates: null,
            shopCoordinates: null,
            dealerCoordinates: null
          }}
        />
      </section>
    </main>
  )
}

export default Page
