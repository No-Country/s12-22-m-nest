import { Footer, Header } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const CommonLayout: FunctionComponent<Props> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default CommonLayout
