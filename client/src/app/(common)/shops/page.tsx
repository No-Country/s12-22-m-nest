import { Header, ShopGrid } from '@/components'
import { getShops } from '@/services/shops/getShops.service'
import { type FunctionComponent } from 'react'

const ShopsPage: FunctionComponent = async () => {
  const { data: shops } = await getShops()
  return (
    <>
      <Header />
      <main className='padding-general-x flex flex-col items-center gap-[60px] pb-10 pt-[100px] '>
        <section className='flex w-full flex-col gap-5  2xl:container'>
          <h2 className='text-2xl font-semibold'>Tiendas 🏪</h2>
          <ShopGrid shops={shops ?? []} />
        </section>
      </main>
    </>
  )
}

export default ShopsPage
