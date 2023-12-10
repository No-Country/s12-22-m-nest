import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import image from '@/assets/order-finished.svg'
import { type OrderInterface } from '@/interfaces'

interface Props {
  order: OrderInterface | null
}

const Finished: FunctionComponent<Props> = async ({ order }) => (
  <div className='padding-general-x mx-auto min-h-[80vh] w-[50%] py-[70px]'>
    <Card>
      <CardHeader>
        <h1 className='mx-auto'>
          Pedido <span className='font-semibold'>#{order?.id}</span> finalizado
        </h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='px-[20px]'>
          <p className='font-semibold'>Tienda</p>
          <p className='font-normal'>{order?.shop.name}</p>
          <p className='text-sm font-light'>{order?.shop.address}</p>
        </div>
        <div className='px-[20px]'>
          <p className='font-semibold'>Domicilio</p>
          <p className='text-sm font-light'>{order?.shipAddress}</p>
        </div>
        <div className='px-[20px]'>
          <p className='font-semibold'>Cliente</p>
          <p className='text-sm font-light'>{order?.client?.firstName + ' ' + order?.client?.lastName}</p>
        </div>
        <p className='px-[20px] text-right font-medium'>Total: ${order?.price}</p>
      </CardBody>
    </Card>
    <Image src={image} className='mx-auto w-[60%]' alt='illustration' />
  </div>
)

export default Finished
