import { checkAvailability } from '@/services/users/checkAvailability.service'
import { routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'
import authOptions from './api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'

interface Props {
  operation?: 'both' | 'shop' | 'dealer'
}

const RoleMiddleware: FunctionComponent<Props> = async ({ operation = 'both' }) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const { data } = await checkAvailability(session?.user?.id)
    if (!data?.isAvailable && data?.orderId && session.user.type === 'dealer' && operation !== 'shop') {
      redirect(routes.dealer.ORDER(data?.orderId))
    }
    if (session?.user?.type === 'shop' && !session?.user?.shopId && operation !== 'dealer') {
      redirect(routes.shop.ONBOARDING)
    }
  }

  return <></>
}

export default RoleMiddleware
