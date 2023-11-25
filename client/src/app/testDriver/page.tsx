'use client'
import React, { type FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import socket from '../socketManager'

interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: 1 | 2 | 3 | 4 | 5
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
  useEffect(() => {
    socket.emit('manageDealer', {
      coordinates: {
        lat: -34.644018,
        lon: -58.5907331
      },
      active: true,
      // Taken debe ser gestionado por el backend
      taken: false
    })
    // Escuchar el evento 'order-request'
    socket.on('orderRequest', (data: OrderRequest, callback) => {
      console.log('orderRequest', data)
      const accepted = confirm('¿Aceptar el pedido?')
      console.log('accepted', accepted)
      const acceptOrder = true
      callback(acceptOrder)
      router.push(`/testDriver/${data.id}`)
    })

    return () => {}
  }, []) // El array vacío [] garantiza que este efecto solo se ejecute una vez al montar el componente

  return <div>{/* Contenido del componente */}</div>
}

export default ConductorComponent
