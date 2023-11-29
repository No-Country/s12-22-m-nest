import { type FunctionComponent } from 'react'
import Shop from './_components/Content'
import { type Session } from 'next-auth'
import { type OrderRequest } from '@/interfaces'

interface Props {
  order: OrderRequest
  session: Session | null
}

const ShopPage: FunctionComponent<Props> = async ({ session, order }) => (
  <main className='padding-general-x min-h-screen py-[100px] '>
    <Shop session={session} order={order} />
  </main>
)

export default ShopPage
