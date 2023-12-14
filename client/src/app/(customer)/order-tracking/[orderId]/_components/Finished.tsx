'use client'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { useState, type FunctionComponent } from 'react'
import { type OrderInterface } from '@/interfaces'
import { DynamicMap } from '@/components'
import { type Location } from '@/components/DynamicMap/DynamicMap'

interface Props {
  order: OrderInterface | null
}

const Finished: FunctionComponent<Props> = ({ order }) => {
  const [mapData] = useState<Location>({
    shipCoordinates: order?.shipCoordinates || null,
    shopCoordinates: order?.shop.coordinates || null,
    dealerCoordinates: null
  })
  return (
    <>
      <DynamicMap locations={mapData} />
      <div className='absolute left-0 top-0 z-[1] h-full w-full  '>
        <div className='absolute left-0 top-0 z-[0] h-full w-full bg-black opacity-30 backdrop-blur-lg' />
        <div className='padding-general-x z-[1] flex h-full w-full items-end justify-center py-10 backdrop-blur-sm  lg:items-center'>
          <Card>
            <CardHeader>
              <h1 className='mx-auto'>
                Pedido <span className='font-semibold'>#{order?.id?.slice(0, 5)}</span> finalizado
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className='flex w-full flex-col gap-2 py-4'>
              <div className='px-[20px]'>
                <p className='font-semibold'>Tienda</p>
                <p className='font-normal'>{order?.shop?.name}</p>
                <p className='text-sm font-light'>{order?.shop?.address}</p>
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
        </div>
      </div>
    </>
  )
}

export default Finished
