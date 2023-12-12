import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const ShopsLayout: FunctionComponent<Props> = async ({ children }) => <>{children}</>

export default ShopsLayout
