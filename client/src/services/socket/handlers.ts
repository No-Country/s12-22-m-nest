import { type Chat, type Coordinates, type OrderInterface } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'
import { getLocation } from '@/utils/getLocation.utils'
import { type DebouncedFunc } from 'lodash'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { type Dispatch, type SetStateAction } from 'react'
import { type Socket } from 'socket.io-client'
import { type KeyedMutator } from 'swr'

const getLocationPromise = async (): Promise<Coordinates> => {
  const { lat, lon } = await getLocation()
  return { lat, lon }
}

export const manageDealer = async (
  socket: Socket,
  setConnected: Dispatch<SetStateAction<boolean>>,
  setDealerCoordinates: (coordinates: Coordinates | null) => void
): Promise<void> => {
  const connect = (lat: string, lon: string): void => {
    socket.emit('manageDealer', {
      coordinates: {
        lat,
        lon
      },
      active: true
    })
  }

  const { lat, lon } = await getLocationPromise()
  setDealerCoordinates({ lat, lon })
  console.log('manageDealer', lat, lon)
  connect(lat, lon)
  setConnected(true)
}

export const handleDealerStatus = (socket: Socket, router: AppRouterInstance): void => {
  socket.on('dealerStatus', (data) => {
    if (data.taken) {
      router.push(routes.dealer.ORDER(data.orderId))
    }
  })
}

export const handleOrder = (
  socket: Socket,
  debManageOrder: DebouncedFunc<(data: OrderInterface, callback: (accepted: boolean) => void) => void>
): void => {
  socket.on('orderRequest', (data, callback) => {
    debManageOrder(data, callback)
  })
}

export const handleJoinOrderDealer = (socket: Socket, orderId: string): void => {
  socket.emit('joinOrderDealer', {
    orderId
  })
}

export const handleJoinOrderClient = (
  socket: Socket,
  setConnected: Dispatch<SetStateAction<boolean>>,
  orderId: string
): void => {
  socket.emit('joinOrderClient', {
    orderId
  })

  setConnected(true)
  console.log('joinOrderClient', orderId)
}

export const handleSystemMessage = (socket: Socket): void => {
  console.log('handleSystemMessage')
  socket.on('message', (data: string) => {
    console.log('message', data)
    return data
  })
}

export const handleChat = (socket: Socket, update: KeyedMutator<OrderInterface>): void => {
  socket.on('updatedChat', async (data: Chat) => {
    console.log('updatedChat', data)
    await update()
  })
}

export const handleUpdateActiveOrders = (socket: Socket, update: KeyedMutator<OrderInterface[]>): void => {
  socket.on('updatedActiveOrders', async () => {
    console.log('updatedActiveOrders')
    await update()
  })
}
