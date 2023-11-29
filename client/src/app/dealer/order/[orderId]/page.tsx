/* eslint-disable multiline-ternary */
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import { EnumSteps } from '@/interfaces'
import { getOrder } from '@/services/orders/getOrder.service'
import { checkAvailability } from '@/services/users/checkAvailability.service'
import { Routes } from '@/utils/constants/routes.const'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'
import GoingPage from './_going/Going'
import ShopPage from './_shop/Shop'
import ResidencePage from './_residence/Residence'
import FinishedPage from './_finished/Finished'

interface Props {
  children: React.ReactNode
  params: {
    orderId: string
  }
}

const MainPage: FunctionComponent<Props> = async ({ params, children }) => {
  const session = await getServerSession(authOptions)
  const { data } = await checkAvailability(session?.user?.id ?? 'null')
  const { data: order } = await getOrder(params?.orderId ?? 'null')

  if (data?.isAvailable && data?.orderId !== params?.orderId) {
    redirect(Routes.WAITING_ORDER)
  }

  return (
    <>
      {order?.step === EnumSteps.GoingToShop ? (
        <GoingPage orderId={params?.orderId} session={session} order={order} />
      ) : order?.step === EnumSteps.GettingOrder ? (
        <ShopPage orderId={params?.orderId} session={session} order={order} />
      ) : order?.step === EnumSteps.GoingToCustomer ? (
        <GoingPage orderId={params?.orderId} session={session} order={order} />
      ) : order?.step === EnumSteps.InCustomerPlace ? (
        <ResidencePage orderId={params?.orderId} />
      ) : order?.step === EnumSteps.Delivered ? (
        <FinishedPage orderId={params?.orderId} />
      ) : null}
    </>
  )
}

export default MainPage
