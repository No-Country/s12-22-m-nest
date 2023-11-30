/* eslint-disable @typescript-eslint/member-delimiter-style */
'use client'
import axios from 'axios'
import { useEffect, type FunctionComponent, useState, useMemo } from 'react'
import { serverUrl } from '@/utils/constants/env.const'
import { type Chat, type OrderRequest } from '@/interfaces'
import connector from '@/services/socket/connector.service'
import { ChatBox } from '@/components'
import { Endpoints } from '@/utils/constants/endpoints.const'

interface Props {
  params: {
    orderId: string
  }
}

const OrderStatus = [
  'LookingForDealer',
  'GoingToShop',
  'GettingOrder',
  'GoingToCustomer',
  'InCustomerPlace',
  'Delivered'
]

const Page: FunctionComponent<Props> = ({ params }) => {
  const socket = useMemo(() => connector('dealer'), [])
  const [currentOrder, setCurrentOrder] = useState<OrderRequest | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chat, setChat] = useState<Chat | null>(currentOrder?.chat ?? null)

  const getOrder = async (): Promise<void> => {
    await axios.get(serverUrl + Endpoints.FIND_ORDER(params.orderId)).then((res) => {
      setCurrentOrder(res.data)
      setChat(res.data.chat)
    })
  }

  useEffect(() => {
    void getOrder()

    socket.emit('joinOrderClient', {
      orderId: params.orderId
    })

    socket.on('updateOrder', (data: OrderRequest) => {
      console.log('updateOrder', data)
      setCurrentOrder(data)
    })

    socket.on('message', (data: string) => {
      console.log('message', data)
    })

    socket.on('updatedChat', (data: Chat) => {
      console.log('updatedChat', data)
      setChat(data)
    })

    socket.on('updatedDealerLocation', (data: { orderId: string; lat: number; lon: number }) => {
      console.log('updatedDealerLocation', data)
    })

    return () => {}
  }, [])

  return (
    <section>
      <h1>Test Client</h1>
      <h2>Order: {params.orderId}</h2>
      <h3>Status: {currentOrder?.status}</h3>
      <h3>Step: {currentOrder && OrderStatus[currentOrder.step - 1]}</h3>
      <ChatBox mode='dealer' orderId={params.orderId} chat={chat} />
    </section>
  )
}

export default Page
