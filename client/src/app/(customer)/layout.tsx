import { type FunctionComponent } from 'react'
import { Footer, Header } from '@/components'
import DealerMiddleware from '../dealer.middleware'

interface Props {
  children: React.ReactNode
}

const ClientLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <Header />
    <DealerMiddleware />
    {children}
    <Footer />
  </>
)
export default ClientLayout
