import { ProductGrid } from '@/components'
import { getShop } from '@/services/shops/getShop.service'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    shopId: string
  }
}

const ShopPage: FunctionComponent<Props> = async ({ params }) => {
  const { data: shop } = await getShop(params.shopId)
  if (!shop) return null
  return (
    <main className='padding-general-x flex flex-col gap-10 pb-10 pt-[100px] lg:gap-10 '>
      <section className='flex w-full flex-col justify-between gap-5'>
        <div className='flex items-center gap-5'>
          <div className='relative aspect-square w-[200px] '>
            <Image
              src={shop.thumbnail ?? '/image/placeholder.png'}
              alt={shop.name}
              fill
              className='rounded-md object-cover '
            />
          </div>
          <div className='flex w-auto flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>{shop.name}</h1>
            <p className='max-w-[65%] '>{shop.description}</p>
          </div>
        </div>
      </section>
      <section className='flex w-full flex-col gap-5 2xl:container'>
        <h2 className='text-2xl font-semibold'>Productos</h2>
        <ProductGrid products={shop.products ?? []} />
      </section>
    </main>
  )
}

export default ShopPage
