import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import image from '@/assets/order-finished.svg'
import { type OrderRequest } from '@/interfaces'

interface Props {
  order: OrderRequest | null
}

const Finished: FunctionComponent<Props> = async ({ order }) => (
  <div className='padding-general-x min-h-[80vh] py-[70px] w-[50%] mx-auto'>
    <Card>
      <CardHeader>
        <h1 className='mx-auto'>Pedido <span className='font-semibold'>#{order?.id}</span> finalizado</h1>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className='px-[20px]'>
          <p className='font-semibold'>Tienda</p>
          <p className='font-normal'>{order?.shop}</p>
          <p className='font-light text-sm'>{order?.shopAddress}</p>
        </div>
        <div className='px-[20px]'>
          <p className='font-semibold'>Domicilio</p>
          <p className='font-light text-sm'>{order?.shipAddress}</p>
        </div>
        <div className='px-[20px]'>
          <p className='font-semibold'>Cliente</p>
          <p className='font-light text-sm'>{order?.clientName}</p>
        </div>
        <p className='font-medium text-right px-[20px]'>Total: ${order?.price}</p>
      </CardBody>
    </Card>
    <Image src={image} className='mx-auto w-[60%]' alt='illustration'/>
  </div>
)

export default Finished
