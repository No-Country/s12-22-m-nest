'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderInterface, type Chat } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox, TopBarDealer } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../orderManager'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { SocketContext } from '@/context/providers/socket.provider'
import Order from './_components/Order'

interface Props {
  order: OrderInterface
}

const Shop: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const handleUpdateOrder = async (): Promise<void> => {
    void updateOrderStatus(order?.id ?? '', router)
  }

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)
      socket.on('updateOrder', async (data: OrderInterface) => {
        await mutate()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className=' flex flex-col items-start  pt-[100px] '>
        <TopBarDealer
          title='ON_SHOP'
          description='ON_SHOP'
          button
          buttonTitle='Tengo el pedido'
          buttonAction={handleUpdateOrder}
          isSwitchActive={true}
        />
        <section className='padding-general-x w-full bg-gray-100 py-10'>
          <Order order={fallbackData} />
          <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} order={order ?? null} />
        </section>
      </main>
    </OrderManager>
  )
}

export default Shop
