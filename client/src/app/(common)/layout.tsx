import { type FunctionComponent } from 'react'
import RoleMiddleware from '../role.middleware'
import { Footer } from '@/components'

interface Props {
  children: React.ReactNode
}

const CommonLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <RoleMiddleware />
    {children}
    <Footer />
  </>
)

export default CommonLayout
