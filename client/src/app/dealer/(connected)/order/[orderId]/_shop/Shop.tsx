'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat, EnumSteps } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../socketManager'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { SocketContext } from '@/context/providers/socket.provider'

interface Props {
  order: OrderRequest
}

const Shop: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  console.log('order', order, 'fallbackData', fallbackData)

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)

      socket.on('updateOrder', async (data: OrderRequest) => {
        console.log('updateOrder', data)
        await mutate()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className='padding-general-x min-h-screen py-[100px] '>
        <section>
          <h1>En la tienda</h1>
          <h3>Status: {order?.status}</h3>
          <h3>Step: {order && EnumSteps[order?.step]}</h3>
          {order && order.step <= 5 && (
            <button
              onClick={() => {
                void updateOrderStatus(order.id, router)
              }}
            >
              Next Step
            </button>
          )}
          <button
            onClick={() => {
              router.refresh()
            }}
            className='mx-6'
          >
            Force Refresh
          </button>
          <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} />
        </section>
      </main>
    </OrderManager>
  )
}

export default Shop
