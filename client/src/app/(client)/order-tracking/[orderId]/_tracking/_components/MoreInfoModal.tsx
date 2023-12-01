'use client'
import { useState, type FunctionComponent } from 'react'
import { type Order } from '@/interfaces'
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@nextui-org/react'

interface Props {
  order: Order
}

// const OrderStatus = [
//   'GoingToShop',
//   'GettingOrder',
//   'GoingToCustomer',
//   'InCustomerPlace',
//   'Delivered'
// ]

const MoreInfoModal: FunctionComponent<Props> = ({ order }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const [handleView, setHandleView] = useState(true)

  const handleInfo = (): void => {
    setMoreInfo(!moreInfo)
  }

  const ManagerView = (): void => {
    setHandleView(!handleView)
  }

  return (
        <Card className={`bg-red-100 max-w-[800px] px-9 mx-auto absolute bottom-0 inset-x-0 z-[999] ${moreInfo && 'pb-[100px]'}`}>
            <CardHeader className='flex flex-col gap-3'>
                <button onClick={handleInfo} className='mx-auto'>
                    {
                        !moreInfo
                          ? <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
                            </svg>
                          : <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                            </svg>
                    }
                </button>
                {
                  moreInfo &&
                  <ButtonGroup className='w-[100%] bg-red-50'>
                    <Button onClick={ManagerView} className={`rounded-lg ${handleView ? 'bg-orange-400' : 'bg-red-50'}` } fullWidth={true}>Tu orden</Button>
                    <Button onClick={ManagerView} className={`rounded-lg ${!handleView ? 'bg-orange-400' : 'bg-red-50'}` } fullWidth={true}>Productos</Button>
                  </ButtonGroup>
                }
            </CardHeader>
            <CardBody>
                {
                    handleView &&
                    <div>
                        <p>#{order.id}</p>
                    </div>
                }
                {
                    !handleView &&
                    <p>prueba 2</p>
                }
            </CardBody>
        </Card>
  )
}

export default MoreInfoModal
