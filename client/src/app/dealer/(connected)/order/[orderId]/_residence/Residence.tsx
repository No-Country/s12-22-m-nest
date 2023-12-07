'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox, TopBarDealer } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../socketManager'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { SocketContext } from '@/context/providers/socket.provider'
import Client from './_components/Client'

interface Props {
  order: OrderRequest
}

const Residence: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const handleUpdateOrder = async (): Promise<void> => {
    void updateOrderStatus(order?.id ?? '', router)
  }

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)

      socket.on('updateOrder', async (data: OrderRequest) => {
        console.log('updateOrder', data)
        await mutate()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className=' flex flex-col items-start  pt-[100px] '>
        <TopBarDealer
          title='ON_RESIDENCE'
          description='ON_RESIDENCE'
          button
          buttonTitle='Ya entregué'
          buttonAction={handleUpdateOrder}
          isSwitchActive={true}
        />
        <section className='padding-general-x w-full bg-gray-100 py-10'>
          <Client order={order ?? fallbackData} />
          <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} />
        </section>
      </main>
    </OrderManager>
  )
}

export default Residence
