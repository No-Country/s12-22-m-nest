'use client'
import socket from '../socket'
import { useEffect, type FunctionComponent, useState } from 'react'
import axios from 'axios'
import TestChatBox from '@/app/(test)/_components/ChatBox'
import { useRouter } from 'next/navigation'
import { type Chat, type OrderRequest } from '../../interfaces'
import { serverUrl } from '@/utils/constants/env.const'

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
  const [currentOrder, setCurrentOrder] = useState<OrderRequest | undefined>(undefined)
  const [chat, setChat] = useState<Chat | undefined>(undefined)
  const router = useRouter()

  // TODO: Validar si el pedido es del repartidor
  const getOrder = async (): Promise<void> => {
    await axios.get(`${serverUrl}/api/test/` + params.orderId).then((res) => {
      setCurrentOrder(res.data)
      setChat(res.data.chat)
    })
  }

  const updateOrderStatus = async (): Promise<void> => {
    await axios.post(`${serverUrl}/api/test/` + params.orderId + '/nextStep')
  }

  const getLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log({ latitude, longitude })
        socket.emit('updateDealerLocation', {
          orderId: params.orderId,
          lat: latitude,
          lon: longitude
        })
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  useEffect(() => {
    void getOrder()
    socket.emit('manageDealer', {
      coordinates: {
        lat: 10.1825,
        lon: -68.0172
      },
      active: true,
      taken: true
    })

    socket.emit('joinOrderDealer', {
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

    getLocation()
    const intervalId = setInterval(getLocation, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (currentOrder && currentOrder.status !== 'In Progress') {
      router.push('/testDriver')
    }
  }, [currentOrder])

  return (
    <section>
      <h1>Test Driver</h1>
      <h2>Order: {params.orderId}</h2>
      <h3>Status: {currentOrder?.status}</h3>
      <h3>Step: {currentOrder && OrderStatus[currentOrder?.step - 1]}</h3>
      {currentOrder && currentOrder.step <= 5 && (
        <button
          onClick={() => {
            void updateOrderStatus()
          }}
        >
          Next Step
        </button>
      )}
      <TestChatBox messages={chat?.messages ?? []} mode='dealer' orderId={params.orderId} />
    </section>
  )
}

export default Page
