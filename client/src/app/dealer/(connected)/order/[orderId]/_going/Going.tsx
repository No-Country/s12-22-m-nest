'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat, EnumSteps } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox, DynamicMap, OrderReqModal, TopBarDealer } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../socketManager'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { DealerLocationContext, SocketContext } from '@/context/providers/socket.provider'

interface Props {
  order: OrderRequest
}

const Going: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const dealerLocationContext = useContext(DealerLocationContext)

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
        await mutate()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className=' flex flex-col items-start pt-[100px] z-0 '>

        <TopBarDealer
          title={order?.step === EnumSteps.GoingToShop ? 'GOING_SHOP' : 'GOING_CUSTOMER'}
          description={order?.step === EnumSteps.GoingToShop ? 'GOING_SHOP' : 'GOING_CUSTOMER'}
          button
          buttonTitle='Ya llegué'
          buttonAction={handleUpdateOrder}
          isSwitchActive={true}
          mapButton
          mapButtonLink={order?.step === EnumSteps.GoingToShop ? order?.shopMapUrl : order?.shipMapUrl}
          />

        <section className='relative h-full w-screen flex-grow'>
              <DynamicMap
                locations={{
                  shipCoordinates: null,
                  shopCoordinates: null,
                  dealerCoordinates: dealerLocationContext.dealerCoordinates
                }}
              />
            <OrderReqModal />
          </section>

      <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} />
        </main>
    </OrderManager>
  )
}

export default Going
