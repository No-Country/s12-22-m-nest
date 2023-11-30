'use client'
import { type FunctionComponent, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat, EnumSteps } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../socketManager'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { SocketContext } from '@/context/providers/socket.provider'

interface Props {
  order: OrderRequest
}

const Going: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })
  const [chat, setChat] = useState<Chat | null>(order?.chat ?? null)

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, setChat)
      socket.on('updateOrder', async (data: OrderRequest) => {
        console.log('updateOrder', data)
        await mutate()
        router.refresh()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className='padding-general-x min-h-screen py-[100px] '>
        <section>
          <h1>Yendo a X lugar</h1>
          <h3>Status: {order?.status}</h3>
          <h3>Step: {order && EnumSteps[order?.step]}</h3>
          {order && order.step <= 5 && (
            <button
              onClick={() => {
                void updateOrderStatus(order.id)
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
          <ChatBox mode='dealer' orderId={fallbackData?.id} chat={chat} />
        </section>
      </main>
    </OrderManager>
  )
}

export default Going
