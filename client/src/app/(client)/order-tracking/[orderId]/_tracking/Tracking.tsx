import dynamic from 'next/dynamic'
import { type FunctionComponent } from 'react'
import { type Order } from '@/interfaces'
import { DataComponent, MoreInfoModal } from './_components'

interface Props {
  order: Order
}

const DynamicMap = dynamic(async () => await import('@/components/DynamicMap'), {
  ssr: false
})

const Tracking: FunctionComponent<Props> = async ({ order }) => (
  <div className='padding-general-x min-h-screen py-[100px] '>
    <h1 className='text-center font-medium'>Seguí tu pedido en tiempo real</h1>
    <DataComponent order={order}/>
    <DynamicMap/>
    <MoreInfoModal order={order}/>
  </div>
)

export default Tracking
