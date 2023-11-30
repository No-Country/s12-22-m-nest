import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { Routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'

interface Props {
  children: React.ReactNode
}

const DisconnectedLayout: FunctionComponent<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)
  if (!session) return
  const { data } = await checkAvailability(session?.user?.id)

  if (!data?.isAvailable && data?.orderId) {
    redirect(Routes.ORDER(data?.orderId))
  }

  return <>{children}</>
}

export default DisconnectedLayout
