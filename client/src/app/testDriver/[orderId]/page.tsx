/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import socket from '@/app/socketManager'
import { useEffect, type FunctionComponent, useState } from 'react'
import axios from 'axios'

interface Props {
  params: {
    orderId: string
  }
}

const Page: FunctionComponent<Props> = ({ params }) => {
  const [currentOrder, setCurrentOrder] = useState({}) as any

  const getOrder = async () => {
    await axios.get('http://localhost:3001/api/' + params.orderId).then((res) => {
      setCurrentOrder(res.data)
    })
  }

  const updateOrderStatus = () => {
    axios.post('http://localhost:3001/api/' + params.orderId + '/nextStep').then((res) => {})
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

    const getLocation = (): any => {
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

    getLocation()
    const intervalId = setInterval(getLocation, 10000)
    // Asegúrate de desconectar el socket cuando el componente se desmonta
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <section>
      <h1>Test Driver</h1>
      <h2>Order: {params.orderId}</h2>
      <h3>Status: {currentOrder.status}</h3>
      <h3>Step: {currentOrder.step}</h3>
      {currentOrder.step <= 4 && <button onClick={updateOrderStatus}>Next Step</button>}
    </section>
  )
}

export default Page
