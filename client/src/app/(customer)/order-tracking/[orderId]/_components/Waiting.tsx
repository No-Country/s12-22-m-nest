'use client'
import { useContext, type FunctionComponent, useEffect, useState } from 'react'
import { type OrderInterface } from '@/interfaces'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { findDealer } from '@/services/orders/findDealer.service'
import { useRouter } from 'next/navigation'
import { type Location } from '@/components/DynamicMap/DynamicMap'
import { DynamicMap } from '@/components'

interface Props {
  order: OrderInterface
}

const Waiting: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const [mapData] = useState<Location>({
    shipCoordinates: order?.shipCoordinates || null,
    shopCoordinates: order?.shop.coordinates || null,
    dealerCoordinates: null
  })

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      await findDealer(order?.id as string)
    }

    socket.on('updateOrder', async (data: OrderInterface) => {
      if (data.status !== 'Pending') {
        console.log('refresh')
        router.refresh()
      }
      await mutate()
    })

    void handleSystem()
  }, [socket])

  return <DynamicMap locations={mapData} />
}

export default Waiting
