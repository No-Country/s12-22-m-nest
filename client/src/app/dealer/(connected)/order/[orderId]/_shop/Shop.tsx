'use client'
import { type FunctionComponent, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderRequest } from '@/interfaces/socket.interface'
import { type Chat } from '@/interfaces'
import { updateOrderStatus } from '@/services/orders/updateStatus.service'
import { ChatBox } from '@/components'
import { handleChat } from '@/services/socket/handlers'
import OrderManager from '../socketManager'
import useSWR from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { SocketContext } from '@/context/providers/socket.provider'
import Order from './_components/Order'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import Hierarchy from './_components/Hierarchy'

interface Props {
  order: OrderRequest
}

const Shop: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const { data: order, mutate } = useSWR<OrderRequest>(Endpoints.FIND_ORDER(fallbackData?.id), {
    fallbackData
  })
  const [chat, setChat] = useState<boolean>(false)

  const activeChat = async (): Promise<void> => { setChat(!chat) }

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
      <main className='padding-general-x min-h-screen py-[100px] w-[60%] mx-auto px-[20px] '>
        <Card className='py-[10px] px-[20px]'>
          <CardHeader>
            <Hierarchy/>
          </CardHeader>
          <CardBody>
            <h1 className='font-semibold text-lg'>Retira el pedido</h1>
            <Order order={fallbackData}/>
          </CardBody>
          <CardFooter>
            {
              order && order.step <= 5 && (
                <Button className='bg-[#EB9817] w-[100%]'
                onClick={() => {
                  void updateOrderStatus(order.id, router)
                }}>Tengo el pedido</Button>
              )
            }
          </CardFooter>
        </Card>
        <div className='py-[10px] flex justify-center'>
          <button className='text-center text-red-700 duration-150 hover:bg-red-100 bg-red-50 p-[10px] rounded-full'
          onClick={activeChat}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/><circle cx="8" cy="12" r="1" fill="currentColor"/><path fill="currentColor" d="M19.07 4.93a10 10 0 0 0-16.28 11a1.06 1.06 0 0 1 .09.64L2 20.8a1 1 0 0 0 .27.91A1 1 0 0 0 3 22h.2l4.28-.86a1.26 1.26 0 0 1 .64.09a10 10 0 0 0 11-16.28Zm.83 8.36a8 8 0 0 1-11 6.08a3.26 3.26 0 0 0-1.25-.26a3.43 3.43 0 0 0-.56.05l-2.82.57l.57-2.82a3.09 3.09 0 0 0-.21-1.81a8 8 0 0 1 6.08-11a8 8 0 0 1 9.19 9.19Z"/></svg>
          </button>
        </div>
        {
          chat &&
          <ChatBox mode='dealer' orderId={fallbackData?.id} chat={order?.chat as Chat} />
        }
      </main>
    </OrderManager>
  )
}

export default Shop
