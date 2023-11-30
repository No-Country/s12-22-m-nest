'use client'
import DealerConnectionService from '@/services/socket/connection.service'
import connector from '@/services/socket/connector.service'
import { type Session } from 'next-auth'
import { type FunctionComponent, createContext, useMemo } from 'react'

interface Props {
  children: React.ReactNode
  session: Session | null
  mode: 'dealer' | 'client'
}

export const SocketContext = createContext(connector('dealer', 'null'))

const SocketProvider: FunctionComponent<Props> = ({ children, session, mode }) => {
  const socket = useMemo(() => connector(mode, session?.user?.id ?? 'null'), [mode, session?.user?.id])
  return (
    <>
      {mode === 'dealer' && <DealerConnectionService socket={socket} />}
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </>
  )
}

export default SocketProvider
