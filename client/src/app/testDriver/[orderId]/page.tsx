/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import socket from '@/app/socketManager'
import { useEffect, type FunctionComponent, useState } from 'react'
import axios from 'axios'
import TestChatBox from '@/app/testChatBox'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const getOrder = async () => {
    await axios.get('http://localhost:3001/api/' + params.orderId).then((res) => {
      setCurrentOrder(res.data)
      setChat(res.data.chat)
    })
  }

  const updateOrderStatus = async (): Promise<void> => {
    await axios.post('http://localhost:3001/api/' + params.orderId + '/nextStep')
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
        lat: -34.644018,
        lon: -58.5907331
      },
      active: true,
      taken: true
    })

    socket.emit('joinOrderDealer', {
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

    getLocation()
    const intervalId = setInterval(getLocation, 10000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (currentOrder.status !== 'In Progress') {
      router.push('/testDriver')
    }
  }, [currentOrder])

  return (
    <section>
      <h1>Test Driver</h1>
      <h2>Order: {params.orderId}</h2>
      <h3>Status: {currentOrder.status}</h3>
      <h3>Step: {OrderStatus[currentOrder.step - 1]}</h3>
      {currentOrder.step <= 5 && (
        <button
          onClick={() => {
            void updateOrderStatus()
          }}
        >
          Next Step
        </button>
      )}
      <TestChatBox messages={chat.messages} mode='dealer' orderId={params.orderId} />
    </section>
  )
}

export default Page
