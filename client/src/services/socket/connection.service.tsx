'use client'
import { type FunctionComponent, useEffect, useMemo, useState, useContext } from 'react'
import { debounce } from 'lodash'
import { manageDealer } from '@/services/socket/handlers'
import { type Socket } from 'socket.io-client'
import { usePathname } from 'next/navigation'
import { DealerLocationContext } from '@/context/providers/socket.provider'

interface Props {
  socket: Socket
}
const DealerConnectionService: FunctionComponent<Props> = ({ socket }) => {
  const pathname = usePathname()
  const [connected, setConnected] = useState(false)
  const dealerLocationContext = useContext(DealerLocationContext)

  const handleManageDealer = useMemo(
    () =>
      debounce(async () => {
        await manageDealer(socket, setConnected, dealerLocationContext.setDealerCoordinates)
      }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connected, socket, pathname]
  )

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      console.log('handleSystem')
      await handleManageDealer()
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

  return null
}

export default DealerConnectionService
