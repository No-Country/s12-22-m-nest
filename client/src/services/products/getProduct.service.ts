import { getRequest } from '@/services/api.requests'
import { type Product, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getProduct = async (id: string): Promise<Response<Product>> => {
  const response = await getRequest<Product>({
    url: Endpoints.FIND_PRODUCT(id),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
