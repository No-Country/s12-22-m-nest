'use client'
import { type FunctionComponent, useEffect } from 'react'
import { handleSystemMessage } from '@/services/socket/handlers'
import { type Socket } from 'socket.io-client'

interface Props {
  socket: Socket
}

const ShopManager: FunctionComponent<Props> = ({ socket }) => {
  useEffect(() => {
    handleSystemMessage(socket)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

export default ShopManager
