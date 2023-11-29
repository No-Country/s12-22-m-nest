import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { getUser } from '@/services/users/getUser.service'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const { data: user } = await getUser(session?.user?.id ?? 'null')
  return (
    <main className='padding-general-x min-h-screen py-[100px] '>
      <h1 className='text-2xl'>
        Hola, {user?.firstName} {user?.lastName}
      </h1>
      <p>Aqui puedes editar tu cuenta</p>
    </main>
  )
}

export default Page
