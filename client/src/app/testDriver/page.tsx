'use client'
import React, { type FunctionComponent, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import socket from '../socketManager'
import { debounce } from 'lodash'

interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: 1 | 2 | 3 | 4 | 5 | 6
}

interface Coordinates {
  lat: string
  lon: string
}

interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
}

const ConductorComponent: FunctionComponent = () => {
  const router = useRouter()

  const debManageOrder = useMemo(
    () =>
      debounce(
        (data: any, callback: any) => {
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

    socket.on('dealerStatus', (data: any) => {
      if (data.taken) {
        router.push(`/testDriver/${data.orderId}`)
      }
    })

    socket.on('orderRequest', (data: OrderRequest, callback) => {
      debManageOrder(data, callback)
    })

    return () => {}
  }, []) // El array vacío [] garantiza que este efecto solo se ejecute una vez al montar el componente

  return <div>Esperando orden</div>
}

export default ConductorComponent
