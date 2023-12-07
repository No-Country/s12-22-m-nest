'use client'
import { type FunctionComponent, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { type Session } from 'next-auth'
import { handleDealerStatus } from '@/services/socket/handlers'
import { DealerLocationContext, SocketContext } from '@/context/providers/socket.provider'
import { DynamicMap, OrderReqModal } from '@/components'

interface Props {
  session: Session | null
}

const Content: FunctionComponent<Props> = ({ session }) => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const dealerLocationContext = useContext(DealerLocationContext)

  useEffect(() => {
    handleDealerStatus(socket, router)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
  )
}

export default Content
