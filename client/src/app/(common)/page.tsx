import { Header, ProductGrid, ShopGrid } from '@/components'
import { getProducts } from '@/services/products/getProducts.service'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import { getShops } from '@/services/shops/getShops.service'

export const metadata: Metadata = {
  title: 'Inicio | LleGo!'
}

const Home: FunctionComponent = async () => {
  const { data: products } = await getProducts()
  const { data: shops } = await getShops()
  return (
    <>
      <Header />
      <main className='padding-general-x flex flex-col items-center gap-[60px] pb-10 pt-[100px] '>
        <section className='flex w-full flex-col gap-5  2xl:container'>
          <h2 className='text-2xl font-semibold'>Los mas vendidos 🔥</h2>
          <ProductGrid products={products?.slice(0, 10) ?? []} isOneRow />
        </section>
        <section className='flex w-full flex-col gap-5  2xl:container'>
          <h2 className='text-2xl font-semibold'>Tiendas 🏪</h2>
          <ShopGrid shops={shops ?? []} />
        </section>
      </main>
    </>
  )
}

export default Home
