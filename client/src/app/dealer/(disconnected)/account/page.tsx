import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { Button, Tabs } from '@/components'
import { getUser } from '@/services/users/getUser.service'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { tabsItems } from './tabsItems.lib'
import type { Metadata } from 'next'
import { Routes } from '@/utils/constants/routes.const'

export const metadata: Metadata = {
  title: 'Cuenta | LleGO!'
}

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const { data: user } = await getUser(session?.user?.id)
  if (!user) return null
  const items = tabsItems(user)

  return (
    <main className='padding-general-x flex flex-col gap-10 pb-10 pt-[100px] lg:gap-5 '>
      <section className='flex flex-col items-center justify-between gap-4 lg:flex-row'>
        <div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-start'>
          <Image
            src={user?.profileImage || '/image/placeholder.png'}
            alt='profile image'
            width={80}
            height={80}
            className='aspect-square rounded-full object-cover'
          />
          <div>
            <h1 className='text-center text-2xl lg:text-start'>
              Hola,{' '}
              <b>
                {user?.firstName} {user?.lastName}
              </b>
            </h1>
            <p className='text-center lg:text-start'>Aqui puedes editar tu cuenta</p>
          </div>
        </div>
        <Button title='Historial de pedidos' href={Routes.ORDER_HISTORY} />
      </section>
      <section className='flex flex-col gap-3'>
        <Tabs items={items} variant='solid' />
      </section>
    </main>
  )
}

export default Page
