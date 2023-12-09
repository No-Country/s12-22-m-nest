import SocketProvider from '@/context/providers/socket.provider'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import authOptions from '../api/auth/[...nextauth]/auth.const'

interface Props {
  children: React.ReactNode
}

const ClientLayout: FunctionComponent<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)
  return (
    <SocketProvider session={session} mode='client'>
      {children}
    </SocketProvider>
  )
}
export default ClientLayout
