'use client'
import dynamic from 'next/dynamic'
import { useContext, type FunctionComponent, useEffect, useState } from 'react'
import { type OrderRequest } from '@/interfaces'
import { DataComponent, MoreInfoModal } from './_components'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { handleChat } from '@/services/socket/handlers'
import { redirect } from 'next/navigation'
import { Routes } from '@/utils/constants/routes.const'

interface Props {
  order: OrderRequest
}

interface Dealer {
  orderId: string
  lat: number
  lon: number
}

const Tracking: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const [dealer, setDealer] = useState<Dealer | null>()

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)

      socket.on('updateOrder', async (data: OrderRequest) => {
        console.log('updateOrder', data)
        await mutate()
      })

      socket.on('updatedDealerLocation', (data: { orderId: string, lat: number, lon: number }) => {
        console.log('updatedDealerLocation', data)
        setDealer(data)
      })
    }

    void handleSystem()
    console.log(dealer)
  }, [mutate, socket, dealer])

  if (fallbackData.status !== 'In Progress') {
    redirect(Routes.ORDER_TRACKING(fallbackData.id))
  }

  const DynamicMap = dynamic(async () => await import('@/components/DynamicMap'), {
    ssr: false
  })

  const coordinates = {
    shipAddress: {
      name: order?.shipAddress,
      coordinates: order?.shipCoordinates
    },
    shopAdress: {
      name: order?.shop,
      coordinates: order?.shopCoordinates
    }
  }

  return (
  <div className='padding-general-x min-h-[80vh] py-[50px]'>
    <h1 className='text-center font-medium'>Seguí tu pedido en tiempo real</h1>
    <DataComponent order={fallbackData}/>
    <DynamicMap heightMap='500px' widthMap='100%' locations={coordinates}/>
    <MoreInfoModal order={fallbackData}/>
  </div>
  )
}

export default Tracking
