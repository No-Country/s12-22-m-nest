import { checkAvailability } from '@/services/users/checkAvailability.service'
import { routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'
import authOptions from './api/auth/[...nextauth]/auth.const'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'

const DealerMiddleware: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    const { data } = await checkAvailability(session?.user?.id)
    if (!data?.isAvailable && data?.orderId && session.user.type === 'dealer') {
      redirect(routes.dealer.ORDER(data?.orderId))
    }
  }

  return <></>
}

export default DealerMiddleware
