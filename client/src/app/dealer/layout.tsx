import { Footer, Header } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const DealerLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <Header theme='light' />
    {children}
    <Footer />
  </>
)

export default DealerLayout
