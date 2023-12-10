'use client'
import dynamic from 'next/dynamic'
import { useContext, type FunctionComponent, useEffect, useState } from 'react'
import { type Coordinates, type OrderInterface } from '@/interfaces'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { handleChat } from '@/services/socket/handlers'
import { redirect } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import SocketManager from '../SocketManager'
import InfoSheets from './_components/InfoSheets'
import { TopBarClient } from '@/components'

const DynamicMap = dynamic(async () => await import('@/components/DynamicMap/DynamicMap'), {
  ssr: false
})

interface Props {
  order: OrderInterface
}

const Tracking: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [mapData, setMapData] = useState({
    shipCoordinates: order?.shipCoordinates,
    shopCoordinates: order?.shopCoordinates,
    dealerCoordinates: coordinates
  })

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)

      socket.on('updateOrder', async (data: OrderInterface) => {
        console.log('updateOrder', data)
        await mutate()
      })

      socket.on('updatedDealerLocation', (data: Coordinates) => {
        console.log('updatedDealerLocation', data)
        if (data === undefined) return
        setCoordinates(data)
        setMapData({
          ...mapData,
          dealerCoordinates: coordinates
        })
      })
    }
    void handleSystem()
  }, [mutate, socket, coordinates, mapData])

  if (fallbackData.status !== 'In Progress') {
    redirect(routes.customer.ORDER_TRACKING(fallbackData.id))
  }

  return (
    <SocketManager socket={socket}>
      <>
        <TopBarClient order={order || fallbackData} />
        <section className='relative h-full w-screen flex-grow'>
          <DynamicMap locations={mapData} />
          <InfoSheets order={order || fallbackData} />
        </section>
      </>
    </SocketManager>
  )
}

export default Tracking
