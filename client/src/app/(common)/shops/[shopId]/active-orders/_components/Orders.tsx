'use client'
import { type OrderInterface, type Shop } from '@/interfaces'
import connector from '@/services/socket/connector.service'
import { handleUpdateActiveOrders } from '@/services/socket/handlers'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { type Session } from 'next-auth'
import { useEffect, type FunctionComponent, useMemo } from 'react'
import useSWR from 'swr'
import ShopManager from '../../shopManager'
import { OrderActiveItem } from '@/components'

interface Props {
  shop: Shop
  session: Session | null
}

const Orders: FunctionComponent<Props> = ({ shop, session }) => {
  const { data: orders, mutate } = useSWR<OrderInterface[]>(Endpoints.FIND_SHOP_ACTIVE_ORDERS(shop.id))
  const socket = useMemo(() => connector('shop', session?.user?.shopId ?? 'null'), [session?.user?.shopId])

  useEffect(() => {
    handleUpdateActiveOrders(socket, mutate)
  }, [])

  return (
    <>
      <ShopManager socket={socket} />
      <div className='flex flex-col gap-5'>
        {orders?.map((order) => order.step > 1 && order.step < 6 && <OrderActiveItem key={order.id} order={order} />)}
      </div>
    </>
  )
}

export default Orders
