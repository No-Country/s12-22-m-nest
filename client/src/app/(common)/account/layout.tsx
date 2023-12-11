import { Header } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const AccountLayout: FunctionComponent<Props> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

export default AccountLayout
