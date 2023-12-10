'use client'
import { type Coordinates } from '@/interfaces'
import DealerConnectionService from '@/services/socket/connection.service'
import connector from '@/services/socket/connector.service'
import { type Session } from 'next-auth'
import { type FunctionComponent, createContext, useMemo, useState } from 'react'

interface Props {
  children: React.ReactNode
  session: Session | null
  mode: 'dealer' | 'client'
}

interface DealerLocationContextProps {
  dealerCoordinates: Coordinates | null
  setDealerCoordinates: (coordinates: Coordinates | null) => void
}

export const SocketContext = createContext(connector('dealer', 'null'))
export const DealerLocationContext = createContext<DealerLocationContextProps>({
  dealerCoordinates: null,
  setDealerCoordinates: (coordinates: Coordinates | null) => {}
})

const SocketProvider: FunctionComponent<Props> = ({ children, session, mode }) => {
  console.log('SocketProvider', session?.user?.id)
  const socket = useMemo(() => connector(mode, session?.user?.id ?? 'null'), [mode, session?.user?.id])
  const [dealerCoordinates, setDealerCoordinates] = useState<Coordinates | null>(null)
  return (
    <SocketContext.Provider value={socket}>
      <DealerLocationContext.Provider value={{ dealerCoordinates, setDealerCoordinates }}>
        {mode === 'dealer' && <DealerConnectionService socket={socket} />}
        {children}
      </DealerLocationContext.Provider>
    </SocketContext.Provider>
  )
}

export default SocketProvider
