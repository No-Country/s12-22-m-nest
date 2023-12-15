import { type FunctionComponent } from 'react'
import { Footer } from '@/components'

interface Props {
  children: React.ReactNode
}

const MerchantsLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    {children}
    <Footer />
  </>
)
export default MerchantsLayout
