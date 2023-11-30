import { Footer, Header } from '@/components'
import { getServerSession } from 'next-auth'
import { type FunctionComponent } from 'react'
import authOptions from '../api/auth/[...nextauth]/auth.const'
import SocketProvider from '@/context/providers/socket.provider'

interface Props {
  children: React.ReactNode
}

const DealerLayout: FunctionComponent<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions)
  if (!session) return

  return (
    <>
      <Header theme='light' />
      <SocketProvider session={session} mode='dealer'>
        {children}
      </SocketProvider>
      <Footer />
    </>
  )
}

export default DealerLayout
