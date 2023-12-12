import { Header, ProductGrid } from '@/components'
import { getShop } from '@/services/shops/getShop.service'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tienda | LleGo!'
}

interface Props {
  params: {
    shopId: string
  }
}

const ShopPage: FunctionComponent<Props> = async ({ params }) => {
  const { data: shop } = await getShop(params.shopId)
  if (!shop) return null
  return (
    <>
      <Header withBorder />
      <main className=' flex flex-col items-center justify-center pt-[100px]  '>
        <section className='grid w-full border-x  2xl:container lg:grid-cols-[250px_auto]'>
          <div className='relative flex w-full flex-col justify-between border-b border-r md:border-b-0'>
            <div className='sticky top-[100px] flex flex-col items-center '>
              <div className='relative min-h-[200px] w-full lg:aspect-video lg:min-w-0'>
                <Image
                  src={shop.thumbnail ?? '/image/placeholder.png'}
                  alt={shop.name}
                  fill
                  className='z-[0] object-cover '
                />
              </div>
              <div className='padding-general-x z-[1] flex w-auto flex-col gap-1 py-5 md:px-5'>
                <h1 className='text-xl font-semibold text-primary'>{shop.name}</h1>
                <p className='text-sm font-light'>{shop.description}</p>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col gap-5 p-10'>
            <h2 className='text-2xl font-semibold'>Productos</h2>
            <ProductGrid products={shop.products ?? []} />
          </div>
        </section>
      </main>
    </>
  )
}

export default ShopPage