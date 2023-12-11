import { Footer } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const CommonLayout: FunctionComponent<Props> = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
)

export default CommonLayout
