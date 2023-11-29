import { type FunctionComponent } from 'react'
import Residence from './_components/Content'
import { type Session } from 'next-auth'
import { type OrderRequest } from '@/interfaces'

interface Props {
  order: OrderRequest
  session: Session | null
}

const ResidencePage: FunctionComponent<Props> = async ({ session, order }) => (
  <main className='padding-general-x min-h-screen py-[100px] '>
    <Residence session={session} order={order} />
  </main>
)

export default ResidencePage
