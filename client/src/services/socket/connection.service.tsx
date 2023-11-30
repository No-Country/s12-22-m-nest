'use client'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { manageDealer } from '@/services/socket/handlers'
import { toast } from 'sonner'
import { type Socket } from 'socket.io-client'

interface Props {
  socket: Socket
}

const DealerConnectionService: FunctionComponent<Props> = ({ socket }) => {
  const [connected, setConnected] = useState(false)

  const handleManageDealer = useMemo(
    () =>
      debounce(async () => {
        const manageDealerPromise = async (): Promise<void> => {
          await manageDealer(socket, setConnected)
        }

        if (!connected) {
          toast.promise(manageDealerPromise, {
            loading: 'Conectando con el servidor',
            success: () => 'Conectado con el servidor',
            error: 'Error al conectar con el servidor'
          })
        }
      }, 1000),
    [connected, socket]
  )

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
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
