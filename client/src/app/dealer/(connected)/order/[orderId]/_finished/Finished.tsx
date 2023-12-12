'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type OrderInterface } from '@/interfaces'
import OrderManager from '../orderManager'
import { SocketContext } from '@/context/providers/socket.provider'
import { routes } from '@/utils/constants/routes.const'

interface Props {
  order: OrderInterface
}

const Finished: FunctionComponent<Props> = ({ order: fallbackData }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)

  useEffect(() => {
    setTimeout(() => {
      router.push(routes.dealer.WAITING_ORDER)
    }, 3000)
  }, [router])

  return (
    <OrderManager socket={socket} orderId={fallbackData?.id}>
      <main className='padding-general-x min-h-screen py-[100px] '>
        <section>
          <h1>Orden terminada, aguarda un instante...</h1>
        </section>
      </main>
    </OrderManager>
  )
}

export default Finished
