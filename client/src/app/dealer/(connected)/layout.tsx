import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import SocketProvider from '@/context/providers/socket.provider'
import authOptions from '@/app/api/auth/[...nextauth]/auth.const'

interface Props {
  children: React.ReactNode
}

const ConnectedLayout: FunctionComponent<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)
  if (!session) return
  console.log('ConnectedLayout', session)
  return (
    <SocketProvider session={session} mode='dealer'>
      {children}
    </SocketProvider>
  )
}

export default ConnectedLayout
