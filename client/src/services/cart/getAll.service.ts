import { type Product } from '@/interfaces'
import { getProduct } from '../products/getProduct.service'

export const getAllItems = async (items: string[]): Promise<Product[]> => {
  const res = await Promise.all(
    items.map(async (item) => {
      const { data: product } = await getProduct(item)
      if (!product) return null
      return product
    })
  )

  return res.filter((product): product is Product => product !== null)
}
