import { type Response, type Product, type CreateProductProps } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { mutationRequest } from '../api.requests'

export const createProduct = async (formData: CreateProductProps, sessionId: string): Promise<Response<Product>> => {
  try {
    const res = await mutationRequest<Product>('post', Endpoints.CREATE_PRODUCT, formData, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return res
  } catch (error) {
    console.error(error)
    throw error
  }
}
