import { type FunctionComponent } from 'react'

interface Props {
  orderId: string
}

const FinishedPage: FunctionComponent<Props> = () => (
  <main className='padding-general-x min-h-screen py-[100px] '>Orden finalizada - entrgada</main>
)

export default FinishedPage
