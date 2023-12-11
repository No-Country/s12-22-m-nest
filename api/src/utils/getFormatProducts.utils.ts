import { type Product } from 'src/products/entities/product.entity'
import { type Repository } from 'typeorm'

export const getFormatProducts = async (
  items: string[],
  productRepository: Repository<Product>
): Promise<Product[]> => {
  const res = await Promise.all(
    items.map(async (item) => {
      const product = await productRepository.findOne({
        where: { id: item }
      })
      if (!product) return null
      return product
    })
  )

  return res
}
