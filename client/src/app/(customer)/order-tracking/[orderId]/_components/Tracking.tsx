'use client'
import dynamic from 'next/dynamic'
import { useContext, type FunctionComponent, useEffect, useState } from 'react'
import { type Coordinates, type OrderInterface } from '@/interfaces'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { type Location } from '@/components/DynamicMap/DynamicMap'
import { useRouter } from 'next/navigation'

const DynamicMap = dynamic(async () => await import('@/components/DynamicMap/DynamicMap'), {
  ssr: false
})

interface Props {
  order: OrderInterface
}

const Tracking: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const [mapData, setMapData] = useState<Location>({
    shipCoordinates: order?.shipCoordinates || null,
    shopCoordinates: order?.shop.coordinates || null,
    dealerCoordinates: null
  })

  useEffect(() => {
    socket.on('updatedDealerLocation', (data: Coordinates) => {
      if (!data) return
      setMapData({
        ...mapData,
        dealerCoordinates: data
      })
    })
    socket.on('updateOrder', async (data: OrderInterface) => {
      if (data.status !== 'In Progress') {
        router.refresh()
      }
      await mutate()
    })
  }, [socket, mapData])

  return <DynamicMap locations={mapData} />
}

export default Tracking
