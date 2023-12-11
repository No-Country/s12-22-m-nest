import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import DealerMiddleware from '../dealer.middleware'

export const metadata: Metadata = {
  title: 'Conviertete en un repartidor | LleGo!'
}

const Home: FunctionComponent = () => (
  <>
    <DealerMiddleware />
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>HOME - LANDING PAGE / DEALER</main>
  </>
)

export default Home
