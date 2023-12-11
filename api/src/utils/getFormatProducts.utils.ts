import { type Product as OrderProduct } from 'src/order/entities/order.entity'
import { type Product } from 'src/products/entities/product.entity'
import { type Repository } from 'typeorm'

export const getFormatProducts = async (
  items: string[],
  productRepository: Repository<Product>
): Promise<OrderProduct[]> => {
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
    .filter((product): product is Product => product !== null)
    .map((product) => {
      return {
        name: product.name,
        quantity: 1,
        price: product.price
      }
    })
}
