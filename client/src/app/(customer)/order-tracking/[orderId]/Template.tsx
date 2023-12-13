'use client'
import { useContext, type FunctionComponent, useEffect } from 'react'
import { type OrderInterface } from '@/interfaces'
import { SocketContext } from '@/context/providers/socket.provider'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { handleChat } from '@/services/socket/handlers'
import SocketManager from './SocketManager'
import { ChatBox, ProductOrderItem } from '@/components'
import Image from 'next/image'
import status from './status.lib'

interface Props {
  order: OrderInterface
  children: React.ReactNode
}

const Template: FunctionComponent<Props> = ({ order: fallbackData, children }) => {
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  useEffect(() => {
    handleChat(socket, mutate)
  }, [mutate, socket])

  return (
    <SocketManager socket={socket}>
      <div className='padding-general-x flex h-full w-full flex-col pb-5 sm:w-[350px]'>
        <div className='flex min-h-[100px] items-center'>
          <Image src='/icon/shop-logo.svg' alt='Logo' width={120} height={50} />
        </div>
        <div className='flex h-auto flex-col gap-5 overflow-hidden'>
          <div className='flex flex-col'>
            <p className='text-xs'>#{order?.id.slice(0, 5)}</p>
            <div>
              <p className='text-xl font-semibold'>{status[order?.step ?? 1]?.title}</p>
              <p>{status[order?.step ?? 1]?.message}</p>
            </div>
          </div>
          <div className='max-h-auto overflow-y-auto'>
            <div className='flex w-full flex-col gap-2 '>
              {order?.products?.map((product) => <ProductOrderItem key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex-grow bg-gray-100'>{children}</div>
      <ChatBox mode='customer' orderId={order?.id ?? ''} chat={order?.chat ?? null} />
    </SocketManager>
  )
}

export default Template
