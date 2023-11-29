import { type Chat } from '@/interfaces'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { Routes } from '@/utils/constants/routes.const'
import { type DebouncedFunc } from 'lodash'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { type Dispatch, type SetStateAction } from 'react'
import { type Socket } from 'socket.io-client'

export const manageDealer = (lat: string, lon: string, socket: Socket): void => {
  socket.emit('manageDealer', {
    coordinates: {
      lat,
      lon
    },
    active: true
  })
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

export const handleChat = (socket: Socket, setChat: Dispatch<SetStateAction<Chat | null>>): void => {
  socket.on('updatedChat', (data: Chat) => {
    console.log('updatedChat', data)
    setChat(data)
  })
}
