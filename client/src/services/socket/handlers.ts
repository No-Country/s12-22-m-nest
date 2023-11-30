import { type Chat } from '@/interfaces'
import { type Coordinates, type OrderRequest } from '@/interfaces/socket.interface'
import { Routes } from '@/utils/constants/routes.const'
import { getLocation } from '@/utils/getLocation.utils'
import { type DebouncedFunc } from 'lodash'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { type Dispatch, type SetStateAction } from 'react'
import { type Socket } from 'socket.io-client'
import { type KeyedMutator } from 'swr'

export const manageDealer = async (socket: Socket, setConnected: Dispatch<SetStateAction<boolean>>): Promise<void> => {
  const connect = (lat: string, lon: string): void => {
    socket.emit('manageDealer', {
      coordinates: {
        lat,
        lon
      },
      active: true
    })
  }

  const getLocationPromise = async (): Promise<Coordinates> => {
    const { lat, lon } = await getLocation()
    connect(lat, lon)
    setConnected(true)
    return { lat, lon }
  }

  await getLocationPromise()
}

export const handleDealerStatus = (socket: Socket, router: AppRouterInstance): void => {
  socket.on('dealerStatus', (data) => {
    if (data.taken) {
      router.push(Routes.ORDER(data.orderId))
    }
  })
}

export const handleOrderRequest = (
  socket: Socket,
  debManageOrder: DebouncedFunc<(data: OrderRequest, callback: (accepted: boolean) => void) => void>
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

export const handleJoinOrderClient = (socket: Socket, params: { orderId: string }): void => {
  socket.emit('joinOrderClient', {
    orderId: params.orderId
  })
}

export const handleSystemMessage = (socket: Socket): void => {
  socket.on('message', (data: string) => {
    console.log('message', data)
    return data
  })
}

export const handleChat = (socket: Socket, update: KeyedMutator<OrderRequest>): void => {
  socket.on('updatedChat', async (data: Chat) => {
    console.log('updatedChat', data)
    await update()
  })
}
