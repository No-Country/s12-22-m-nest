import { Header } from '@/components'
import { getShop } from '@/services/shops/getShop.service'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
  params: {
    shopId: string
  }
}

const ShopLayout: FunctionComponent<Props> = async ({ children, params }) => {
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
              <div className='padding-general-x z-[1] flex  w-full flex-col items-start gap-1 py-5 lg:px-5'>
                <h1 className='text-xl font-semibold text-primary'>{shop.name}</h1>
                <p className='text-sm font-light'>{shop.description}</p>
              </div>
            </div>
          </div>
          <div className='padding-general-x flex w-full flex-col gap-5 py-10'>{children}</div>
        </section>
      </main>
    </>
  )
}

export default ShopLayout
