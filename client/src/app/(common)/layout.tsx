import { type FunctionComponent } from 'react'
import DealerMiddleware from '../dealer.middleware'
import { Footer } from '@/components'

interface Props {
  children: React.ReactNode
}

const CommonLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <DealerMiddleware />
    {children}
    <Footer />
  </>
)

export default CommonLayout
