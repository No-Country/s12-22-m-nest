'use client'
import { type OrderInterface, type Product, type Shop, type TSteps } from '@/interfaces'
import connector from '@/services/socket/connector.service'
import { handleUpdateActiveOrders } from '@/services/socket/handlers'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { type Session } from 'next-auth'
import Image from 'next/image'
import { useEffect, type FunctionComponent, useMemo } from 'react'
import useSWR from 'swr'
import ShopManager from '../../shopManager'

interface Props {
  shop: Shop
  session: Session | null
}

const formatStatus = (status: TSteps): string => {
  switch (status) {
    case 1:
      return 'Buscando repartidor'
    case 2:
      return 'Repartidor en camino'
    case 3:
      return 'Repartidor en tienda'
    case 4:
      return 'Repartidor en camino al cliente'
    case 5:
      return 'Orden entregada'
    default:
      return 'Algo salió mal'
  }
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
        {orders?.map((order) => (
          <div key={order.id} className='flex flex-col gap-4 rounded-xl border p-5 '>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Image
                  alt='profile image'
                  src={order.client?.profileImage || '/image/placeholder.png'}
                  width={40}
                  height={40}
                  className='aspect-square rounded-full object-cover'
                />
                <p className='text-lg font-semibold'>Orden de {order?.client?.firstName}</p>
              </div>
              <div>
                <p className='text-xs'>Id: {order.id.slice(0, 5)}</p>
                <p className='text-xs'>Creación: {new Date(order.createdAt).toLocaleString()}</p>
                <p className='text-xs font-semibold'>Estado: {formatStatus(order.step)}</p>
              </div>
            </div>
            <div>
              {order.products.map((product: Product) => (
                <div key={product.id} className='flex items-center gap-2 rounded-lg bg-gray-100 p-2'>
                  <Image
                    alt='profile image'
                    src={product.thumbnail || '/image/placeholder.png'}
                    width={40}
                    height={40}
                    className='aspect-square rounded-md object-cover'
                  />
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-sm font-semibold'>{product.name}</p>
                    <p className='mr-2 text-sm font-semibold'>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Orders
