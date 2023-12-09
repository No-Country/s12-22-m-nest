import { type FunctionComponent } from 'react'
import { Footer, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

const ClientLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
export default ClientLayout
