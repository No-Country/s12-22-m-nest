'use client'
import { type FunctionComponent, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderInterface, type Chat, EnumSteps } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox, DynamicMap, OrderReqModal, TopBarDealer } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../orderManager'
import { Endpoints } from '@/utils/constants/endpoints.const'
import useSWR from 'swr'
import { SocketContext, DealerLocationContext } from '@/context/providers/socket.provider'
import { type Location } from '@/components/DynamicMap/DynamicMap'
interface Props {
  order: OrderInterface
}

const Going: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const dealerLocationContext = useContext(DealerLocationContext)
  const { data: order, mutate } = useSWR<OrderInterface>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })

  const [mapData, setMapData] = useState<Location>({
    shipCoordinates: order?.shipCoordinates || null,
    shopCoordinates: order?.shop.coordinates || null,
    dealerCoordinates: dealerLocationContext.dealerCoordinates || null
  })

  const handleUpdateOrder = async (): Promise<void> => {
    void updateOrderStatus(order?.id ?? '', router)
  }

  useEffect(() => {
    if (dealerLocationContext.dealerCoordinates) {
      setMapData({
        ...mapData,
        dealerCoordinates: dealerLocationContext.dealerCoordinates
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealerLocationContext.dealerCoordinates])

  useEffect(() => {
    const handleSystem = async (): Promise<void> => {
      handleChat(socket, mutate)
      socket.on('updateOrder', async (data: OrderInterface) => {
        await mutate()
      })
    }

    void handleSystem()
  }, [mutate, router, socket])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className=' flex min-h-screen flex-col items-start pt-[100px]'>
        <TopBarDealer
          title={order?.step === EnumSteps.GoingToShop ? 'GOING_SHOP' : 'GOING_CUSTOMER'}
          description={order?.step === EnumSteps.GoingToShop ? 'GOING_SHOP' : 'GOING_CUSTOMER'}
          button
          buttonTitle='Ya llegué'
          buttonAction={handleUpdateOrder}
          isSwitchActive={true}
          mapButton
          mapButtonLink={order?.step === EnumSteps.GoingToShop ? order?.shop.mapUrl : order?.shipMapUrl}
        />
        <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} />
        <section className='relative h-full w-screen flex-grow '>
          <DynamicMap locations={mapData} />
          <OrderReqModal />
        </section>
      </main>
    </OrderManager>
  )
}

export default Going
