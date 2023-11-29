'use client'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import connector from '@/services/socket/connector.service'
import { debounce } from 'lodash'
import { type Session } from 'next-auth'
import { handleDealerStatus, handleOrderRequest, manageDealer } from '@/services/socket/handlers'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { getLocation } from '@/utils/getLocation.utils'

interface Props {
  session: Session | null
}

const Content: FunctionComponent<Props> = ({ session }) => {
  const router = useRouter()
  const socket = useMemo(() => connector('dealer', session?.user?.id ?? 'null'), [session?.user?.id])

  const debManageOrder = useMemo(
    () =>
      debounce((data: OrderRequest, callback: (accepted: boolean) => void) => {
        console.log('orderRequest', data)
        const accepted = confirm('¿Aceptar el pedido?')
        callback(accepted)
        router.refresh()
      }, 1000),
    [router]
  )

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
      handleOrderRequest(socket, debManageOrder)
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

  return <div>Esperando orden</div>
}

export default Content
