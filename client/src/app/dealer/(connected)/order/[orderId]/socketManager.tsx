'use client'
import { type FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { handleDealerStatus, handleJoinOrderDealer, handleSystemMessage } from '@/services/socket/handlers'
import { type Socket } from 'socket.io-client'

interface Props {
  children: JSX.Element
  orderId: string
  socket: Socket
}

const OrderManager: FunctionComponent<Props> = ({ children, orderId, socket }) => {
  const router = useRouter()

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleDealerStatus(socket, router)
      handleJoinOrderDealer(socket, orderId)
      handleSystemMessage(socket)
    }

    void handleSystem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default OrderManager
