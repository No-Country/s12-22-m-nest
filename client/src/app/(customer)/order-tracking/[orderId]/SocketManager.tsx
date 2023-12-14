'use client'
import { type FunctionComponent, useEffect, useState } from 'react'
import { handleJoinOrderClient, handleSystemMessage } from '@/services/socket/handlers'
import { type Socket } from 'socket.io-client'
import { useParams } from 'next/navigation'

interface Props {
  children: React.ReactNode
  socket: Socket
}

const SocketManager: FunctionComponent<Props> = ({ children, socket }) => {
  const params = useParams()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleJoinOrderClient(socket, setConnected, params?.orderId as string)
      handleSystemMessage(socket)
    }

    void handleSystem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  return <>{children}</>
}

export default SocketManager
