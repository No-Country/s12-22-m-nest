import { type Order } from '@/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { type FunctionComponent } from 'react'

interface Props {
  order: Order
}

const DataComponent: FunctionComponent<Props> = ({ order }) => (
    <Card className='max-w-[800px] mx-auto mt-2 mb-5 px-10 pb-5 bg-black rounded-lg'>
        <CardBody className='flex flex-row justify-between text-slate-200'>
            <div>
                <h2 className='font-light mb-1'>Tu orden</h2>
                <p className='font-semibold'>{order.shop}</p>
            </div>
            {
                order.shop === 'McDonalds' &&
                  <Image
                  alt="mcdonalds logo"
                  height={40}
                  radius='full'
                  src='https://seeklogo.com/images/M/mcdonald-s-logo-255A7B5646-seeklogo.com.png'
                  width={40}
                />
            }
        </CardBody>
        <CardFooter className='bg-orange-400 flex flex-row justify-between px-10 rounded-md'>
            <p>Llega en </p><span>25min</span>
        </CardFooter>
    </Card>
)

export default DataComponent
