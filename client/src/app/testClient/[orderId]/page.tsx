/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import socket from '@/app/socketManager'
import TestChatBox from '@/app/testChatBox'
import axios from 'axios'
import { useEffect, type FunctionComponent, useState } from 'react'

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
  const [currentOrder, setCurrentOrder] = useState({}) as any
  const [chat, setChat] = useState([]) as any

  const getOrder = async () => {
    await axios.get('http://localhost:3001/api/' + params.orderId).then((res) => {
      setCurrentOrder(res.data)
      setChat(res.data.chat)
    })
  }

  useEffect(() => {
    void getOrder()

    socket.emit('joinOrderClient', {
      orderId: params.orderId
    })

    socket.on('updateOrder', (data: any) => {
      console.log('updateOrder', data)
      setCurrentOrder(data)
    })

    socket.on('message', (data: any) => {
      console.log('message', data)
    })

    socket.on('updatedChat', (data: any) => {
      console.log('updatedChat', data)
      setChat(data)
    })

    socket.on('updatedDealerLocation', (data: any) => {
      console.log('updatedDealerLocation', data)
    })

    return () => {}
  }, [])

  return (
    <section>
      <h1>Test Client</h1>
      <h2>Order: {params.orderId}</h2>
      <h3>Status: {currentOrder.status}</h3>
      <h3>Step: {OrderStatus[currentOrder.step - 1]}</h3>
      <TestChatBox messages={chat.messages} mode='client' orderId={params.orderId} />
    </section>
  )
}

export default Page
