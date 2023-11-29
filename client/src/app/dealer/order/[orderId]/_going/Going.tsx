import { type FunctionComponent } from 'react'
import Going from './_components/Content'
import { type Session } from 'next-auth'
import { type OrderRequest } from '@/interfaces'

interface Props {
  orderId: string
  order: OrderRequest
  session: Session | null
}

const GoingPage: FunctionComponent<Props> = async ({ orderId, session, order }) => (
  <main className='padding-general-x min-h-screen py-[100px] '>
    <Going session={session} order={order} />
  </main>
)

export default GoingPage
