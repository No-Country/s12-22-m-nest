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
import { status, paymentStatus } from './status.lib'

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
      <section className='flex h-full w-full flex-col-reverse lg:flex-row'>
        <div className='padding-general-x flex h-full max-h-[500px] w-full flex-col border-r py-8 !pb-5 lg:max-h-none lg:w-[350px] lg:pt-0'>
          <div className='padding-general-x absolute left-0 top-0 z-10 flex min-h-[100px] items-center lg:relative lg:p-0'>
            <Image src='/icon/shop-logo-black.svg' alt='Logo' width={120} height={50} />
          </div>
          <div className='flex h-auto flex-col gap-5 overflow-hidden '>
            <div className='flex flex-col'>
              <p className='text-xs'>#{order?.id.slice(0, 5)}</p>
              <div>
                {order?.paymentStatus !== 'Completed' ? (
                  <>
                    <p className='text-xl font-semibold'>{paymentStatus[order?.paymentStatus ?? 'Pending']?.title}</p>
                    <p>{paymentStatus[order?.paymentStatus ?? 'Pending']?.message}</p>
                  </>
                ) : order?.status !== 'Canceled' ? (
                  <>
                    <p className='text-xl font-semibold'>{status[order?.step ?? 1]?.title}</p>
                    <p>{status[order?.step ?? 1]?.message}</p>
                  </>
                ) : (
                  <>
                    <p className='text-xl font-semibold'>Orden Cancelada</p>
                    <p>Lo sentimos, tu orden ha sido cancelada.</p>
                  </>
                )}
              </div>
            </div>
            <div className='max-h-auto overflow-y-auto'>
              <div className='flex w-full flex-col gap-2 '>
                {order?.products?.map((product) => <ProductOrderItem key={product.id} product={product} />)}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className='relative h-full min-h-[calc(max(65vh,_500px))] flex-grow '>{children}</div>
        {order?.status === 'In Progress' && (
          <ChatBox mode='customer' orderId={order?.id ?? ''} chat={order?.chat ?? null} />
        )}
      </section>
    </SocketManager>
  )
}

export default Template
