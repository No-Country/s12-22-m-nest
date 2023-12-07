import { type OrderRequest } from '@/interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { type FunctionComponent } from 'react'

interface Props {
  order: OrderRequest | undefined
}

const Data: FunctionComponent<Props> = ({ order }) => (
  <Card className='mx-auto mb-5 mt-2 max-w-[800px] rounded-lg bg-black px-10 pb-5'>
    <CardBody className='flex flex-row justify-between text-slate-200'>
      <div>
        <h2 className='mb-1 font-light'>Tu orden</h2>
        <p className='font-semibold'>{order?.shop}</p>
      </div>
      {order?.shop === 'McDonalds' && (
        <Image
          alt='mcdonalds logo'
          height={40}
          radius='full'
          src='https://seeklogo.com/images/M/mcdonald-s-logo-255A7B5646-seeklogo.com.png'
          width={40}
        />
      )}
    </CardBody>
    <CardFooter className='flex flex-row justify-between rounded-md bg-orange-400 px-10'>
      <p>Llega en </p>
      <span>25min</span>
    </CardFooter>
  </Card>
)

export default Data
