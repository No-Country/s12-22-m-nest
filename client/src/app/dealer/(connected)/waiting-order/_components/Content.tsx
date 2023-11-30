'use client'
import { type FunctionComponent, useEffect, useMemo, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { type Session } from 'next-auth'
import { handleDealerStatus, handleOrderRequest } from '@/services/socket/handlers'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { SocketContext } from '@/context/providers/socket.provider'

interface Props {
  session: Session | null
}

const Content: FunctionComponent<Props> = ({ session }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)

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

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleDealerStatus(socket, router)
      handleOrderRequest(socket, debManageOrder)
    }

    void handleSystem()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Esperando orden</div>
}

export default Content
