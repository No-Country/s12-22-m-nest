'use client'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import connector from '@/services/socket/connector.service'
import { type Session } from 'next-auth'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat, EnumSteps } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../../manager'

interface Props {
  session: Session | null
  order: OrderRequest
}

const Going: FunctionComponent<Props> = ({ session, order }) => {
  const router = useRouter()
  const [chat, setChat] = useState<Chat | null>(null)
  const socket = useMemo(() => connector('dealer', session?.user?.id ?? 'null'), [session?.user?.id])

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, setChat)

      socket.on('updateOrder', (data: OrderRequest) => {
        console.log('updateOrder', data)
        router.refresh()
      })
    }

    void handleSystem()
  }, [router, socket])

  return (
    <OrderManager socket={socket} orderId={order.id}>
      <section>
        <h1>Yendo a X lugar</h1>
        <h3>Status: {order?.status}</h3>
        <h3>Step: {order && EnumSteps[order?.step - 1]}</h3>
        {order && order.step <= 5 && (
          <button
            onClick={() => {
              void updateOrderStatus(order.id)
            }}
          >
            Next Step
          </button>
        )}
        <ChatBox mode='dealer' orderId={order.id} chat={chat} />
      </section>
    </OrderManager>
  )
}

export default Going
