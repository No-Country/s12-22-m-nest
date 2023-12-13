import { Header, ProductGrid, ProductPagination } from '@/components'
import { getProducts } from '@/services/products/getProducts.service'
import { type FunctionComponent } from 'react'

const OroductsPage: FunctionComponent = async () => {
  const { data: products } = await getProducts()
  return (
    <>
      <Header />
      <main className='padding-general-x flex flex-col items-center gap-[60px] pb-10 pt-[100px] '>
        <section className='flex w-full flex-col gap-5  2xl:container'>
          <h2 className='text-2xl font-semibold'>Todos los productos 🚀</h2>
          <ProductGrid products={products ?? []} />
          <ProductPagination products={products ?? []} />
        </section>
      </main>
    </>
  )
}

export default OroductsPage
