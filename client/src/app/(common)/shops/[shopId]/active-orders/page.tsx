import { getShop } from '@/services/shops/getShop.service'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import Orders from './_components/Orders'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'

export const metadata: Metadata = {
  title: 'Tienda | LleGo!'
}

interface Props {
  params: {
    shopId: string
  }
}

const ActiveOrders: FunctionComponent<Props> = async ({ params }) => {
  const session = await getServerSession(authOptions)
  const { data: shop } = await getShop(params.shopId)
  if (!shop) return null
  return (
    <>
      <h2 className='text-2xl font-semibold'>Órdenes activas</h2>
      <Orders shop={shop} session={session} />
    </>
  )
}

export default ActiveOrders
