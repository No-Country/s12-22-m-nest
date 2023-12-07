/* eslint-disable multiline-ternary */
'use client'
import { useState, type FunctionComponent } from 'react'
import { type OrderRequest } from '@/interfaces'
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@nextui-org/react'
import OrderInfo from './OrderInfo'
import ProductsTable from './ProductsTable'
import { ChatBox } from '@/components'

interface Props {
  order: OrderRequest
}

const InfoSheets: FunctionComponent<Props> = ({ order }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const [handleView, setHandleView] = useState(true)

  const handleInfo = (): void => {
    setMoreInfo(!moreInfo)
  }

  const ManagerView = (): void => {
    setHandleView(!handleView)
  }

  return (
    <Card
      className={`padding-general-x absolute inset-x-0 bottom-0 z-[1000] mx-auto max-w-[800px] bg-white ${
        moreInfo && 'min-h-[400px]'
      }`}
    >
      <CardHeader className='flex flex-col gap-3'>
        <button onClick={handleInfo} className='mx-auto'>
          {!moreInfo ? (
            <svg
              className='h-4 w-4 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 8'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7'
              />
            </svg>
          ) : (
            <svg
              className='h-4 w-4 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 8'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1'
              />
            </svg>
          )}
        </button>
        {moreInfo && (
          <ButtonGroup className='w-[100%] rounded-lg bg-red-50'>
            <Button
              onClick={ManagerView}
              className={`rounded-lg ${handleView ? 'bg-orange-400' : 'bg-red-50'}`}
              fullWidth={true}
            >
              Tu orden
            </Button>
            <Button
              onClick={ManagerView}
              className={`rounded-lg ${!handleView ? 'bg-orange-400' : 'bg-red-50'}`}
              fullWidth={true}
            >
              Productos
            </Button>
          </ButtonGroup>
        )}
      </CardHeader>
      <CardBody className='pb-7'>
        {!moreInfo ? (
          <OrderInfo order={order} />
        ) : handleView ? (
          <div>
            <OrderInfo order={order} />
            <ChatBox mode='client' orderId={order?.id} chat={order?.chat} />
          </div>
        ) : (
          <ProductsTable products={order.products} />
        )}
      </CardBody>
    </Card>
  )
}

export default InfoSheets
