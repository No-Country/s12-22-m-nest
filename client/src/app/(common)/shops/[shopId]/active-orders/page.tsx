import { getShop } from '@/services/shops/getShop.service'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import Orders from './_components/Orders'

export const metadata: Metadata = {
  title: 'Tienda | LleGo!'
}

interface Props {
  params: {
    shopId: string
  }
}

const ActiveOrders: FunctionComponent<Props> = async ({ params }) => {
  const { data: shop } = await getShop(params.shopId)
  if (!shop) return null
  return (
    <>
      <h2 className='text-2xl font-semibold'>Ordenes activas</h2>
      <Orders shop={shop} />
    </>
  )
}

export default ActiveOrders
