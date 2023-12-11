import { Footer } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const ShopsLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    {children}
    <Footer />
  </>
)

export default ShopsLayout
