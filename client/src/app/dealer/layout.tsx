import { Footer, Header } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const DealerLayout: FunctionComponent<Props> = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header theme='light' />
    {children}
    <Footer />
  </>
)

export default DealerLayout
