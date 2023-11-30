'use client'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { manageDealer } from '@/services/socket/handlers'
import { toast } from 'sonner'
import { type Socket } from 'socket.io-client'
import { usePathname } from 'next/navigation'
import { Routes } from '@/utils/constants/routes.const'

interface Props {
  socket: Socket
}

const DealerConnectionService: FunctionComponent<Props> = ({ socket }) => {
  const pathname = usePathname()
  const [connected, setConnected] = useState(false)

  const handleManageDealer = useMemo(
    () =>
      debounce(async () => {
        console.log('handleManageDealer')
        const manageDealerPromise = async (): Promise<void> => {
          await manageDealer(socket, setConnected)
        }

        if (!connected && pathname === Routes.WAITING_ORDER) {
          toast.promise(manageDealerPromise, {
            loading: 'Conectando con el servidor',
            success: () => 'Conectado con el servidor',
            error: 'Error al conectar con el servidor'
          })
        }
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
