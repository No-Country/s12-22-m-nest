'use client'
import { useContext, type FunctionComponent, useEffect } from 'react'
import { type OrderInterface } from '@/interfaces'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { CircularProgress } from '@nextui-org/react'
import { findDealer } from '@/services/orders/findDealer.service'
import { useRouter } from 'next/navigation'

interface Props {
  order: OrderInterface
}

const Waiting: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      await findDealer(order?.id as string)
    }

    socket.on('updateOrder', async (data: OrderInterface) => {
      console.log(data)
      if (data.status !== 'Pending') {
        console.log('refresh')
        router.refresh()
      }
      await mutate()
    })

    void handleSystem()
  }, [socket])

  return (
    <div className='flex h-full w-full  items-center justify-center gap-3'>
      <CircularProgress color='primary' aria-label='Loading...' />
      <p>Muy pronto un repartidor tomará tu orden</p>
    </div>
  )
}

export default Waiting
