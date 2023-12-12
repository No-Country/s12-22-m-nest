import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import DealerMiddleware from '@/app/dealer.middleware'
import { Header } from '@/components'

export const metadata: Metadata = {
  title: 'Conviertete en un repartidor | LleGo!'
}

const Home: FunctionComponent = () => (
  <>
    <Header />
    <DealerMiddleware />
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>HOME - LANDING PAGE / SHOPS</main>
  </>
)

export default Home
