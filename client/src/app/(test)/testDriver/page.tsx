/* eslint-disable @typescript-eslint/member-delimiter-style */
'use client'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import connector from './socket'
import { debounce } from 'lodash'
import { type OrderRequest } from '../interfaces'
import { useSession } from 'next-auth/react'

const ConductorComponent: FunctionComponent = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const socket = useMemo(() => connector(session?.user?.id ?? ''), [])
  const debManageOrder = useMemo(
    () =>
      debounce(
        (data: OrderRequest, callback: (accepted: boolean) => void) => {
          console.log('orderRequest', data)
          const accepted = confirm('¿Aceptar el pedido?')
          callback(accepted)
          if (accepted) {
            router.push(`/testDriver/${data.id}`)
          }
        },

        1000
      ),
    []
  )

  useEffect(() => {
    socket.emit('manageDealer', {
      coordinates: {
        lat: -34.644018,
        lon: -58.5907331
      },
      active: true
    })

    socket.on('dealerStatus', (data: { taken: boolean; orderId: string }) => {
      if (data.taken) {
        router.push(`/testDriver/${data.orderId}`)
      }
    })

    socket.on('orderRequest', (data: OrderRequest, callback: any) => {
      debManageOrder(data, callback)
    })

    return () => {}
  }, []) // El array vacío [] garantiza que este efecto solo se ejecute una vez al montar el componente

  return <div>Esperando orden</div>
}

export default ConductorComponent
