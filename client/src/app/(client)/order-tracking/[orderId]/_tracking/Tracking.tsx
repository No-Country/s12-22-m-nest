'use client'
import dynamic from 'next/dynamic'
import { useContext, type FunctionComponent, useEffect, useState } from 'react'
import { type Coordinates, type OrderRequest } from '@/interfaces'
import { DataComponent, MoreInfoModal } from './_components'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { handleChat } from '@/services/socket/handlers'
import { redirect } from 'next/navigation'
import { Routes } from '@/utils/constants/routes.const'
import SocketManager from '../SocketManager'
const DynamicMap = dynamic(async () => await import('@/components/DynamicMap'), {
  ssr: false
})

interface Props {
  order: OrderRequest
}

const Tracking: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)

      socket.on('updateOrder', async (data: OrderRequest) => {
        console.log('updateOrder', data)
        await mutate()
      })

      socket.on('updatedDealerLocation', (data: Coordinates) => {
        console.log('updatedDealerLocation', data)
        if (data === undefined) return
        setCoordinates(data)
      })
    }

    void handleSystem()
    console.log(coordinates)
  }, [mutate, socket, coordinates])

  if (fallbackData.status !== 'In Progress') {
    redirect(Routes.ORDER_TRACKING(fallbackData.id))
  }

  const mapData = {
    shipCoordinates: order?.shipCoordinates,
    shopCoordinates: order?.shopCoordinates,
    dealerCoordinates: coordinates
  }

  console.log(mapData)

  return (
    <SocketManager socket={socket}>
      <div className='padding-general-x min-h-[80vh] py-[50px]'>
        <h1 className='text-center font-medium'>Seguí tu pedido en tiempo real</h1>
        <DataComponent order={fallbackData} />
        <DynamicMap heightMap='500px' widthMap='100%' locations={mapData} />
        <MoreInfoModal order={fallbackData} />
      </div>
    </SocketManager>
  )
}

export default Tracking
