// TODO: Add types
import { getRequest } from '@/services/api.requests'
import { type OrderRequest, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getOrder = async (orderId: string): Promise<Response<OrderRequest>> => {
  const response = await getRequest<OrderRequest>({
    url: Endpoints.FIND_ORDER(orderId),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
