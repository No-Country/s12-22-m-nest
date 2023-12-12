import { getShop } from '@/services/shops/getShop.service'
import { type FunctionComponent } from 'react'
import { type Metadata } from 'next'
import ProductForm from './_components/Form'

export const metadata: Metadata = {
  title: 'Tienda | LleGo!'
}

interface Props {
  params: {
    shopId: string
  }
}

const CreateProduct: FunctionComponent<Props> = async ({ params }) => {
  const { data: shop } = await getShop(params.shopId)
  if (!shop) return null
  return (
    <>
      <h2 className='text-2xl font-semibold'>Crear un producto</h2>
      <ProductForm />
    </>
  )
}

export default CreateProduct
