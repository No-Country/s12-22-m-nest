import { ProductGrid } from '@/components'
import { getProducts } from '@/services/products/getProducts.service'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inicio | LleGo!'
}

const Home: FunctionComponent = async () => {
  const { data: products } = await getProducts()
  return (
    <main className='padding-general-x flex flex-col gap-10 pb-10 pt-[100px] lg:gap-5 '>
      <section className='flex w-full flex-col gap-5 2xl:container'>
        <h2 className='text-2xl font-semibold'>Los mas vendidos 🔥</h2>
        <ProductGrid products={products ?? []} />
      </section>
    </main>
  )
}

export default Home
