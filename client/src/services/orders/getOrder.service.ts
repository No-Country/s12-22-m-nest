import { getRequest } from '@/services/api.requests'
import { type OrderInterface, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getOrder = async (orderId: string): Promise<Response<OrderInterface>> => {
  const response = await getRequest<OrderInterface>({
    url: Endpoints.FIND_ORDER(orderId),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
