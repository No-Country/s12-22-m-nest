import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

const BaseTopBar: FunctionComponent<Props> = ({ children, className }) => (
  <section className={`${className} padding-general-x flex w-full items-center justify-center rounded-2xl  pb-5`}>
    {children}
  </section>
)

export default BaseTopBar
