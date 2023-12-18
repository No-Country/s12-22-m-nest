import { type FunctionComponent } from 'react'
import { Footer } from '@/components'
import RoleMiddleware from '../role.middleware'

interface Props {
  children: React.ReactNode
}

const ClientLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <RoleMiddleware />
    {children}
    <Footer />
  </>
)
export default ClientLayout
