'use client'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  handleDealerStatus,
  handleJoinOrderDealer,
  handleSystemMessage,
  manageDealer
} from '@/services/socket/handlers'
import { debounce } from 'lodash'
import { getLocation } from '@/utils/getLocation.utils'
import { type Socket } from 'socket.io-client'

interface Props {
  children: JSX.Element
  orderId: string
  socket: Socket
}

const OrderManager: FunctionComponent<Props> = ({ children, orderId, socket }) => {
  const router = useRouter()

  const handleManageDealer = useMemo(
    () =>
      debounce(async () => {
        console.log('handleManageDealer')
        const { lat, lon } = await getLocation()
        console.log('Ok Location', lat, lon)
        manageDealer(lat, lon, socket)
      }, 1000),
    [socket]
  )

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      await handleManageDealer()
      handleDealerStatus(socket, router)
      handleJoinOrderDealer(socket, orderId)
      handleSystemMessage(socket)
    }

    void handleSystem()

    const intervalId = setInterval(async () => {
      console.log('interval')
      await handleManageDealer()
    }, 30000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default OrderManager
