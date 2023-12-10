import { getRequest } from '@/services/api.requests'
import { type Response, type OrderInterface } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getUserOrders = async (userId: string): Promise<Response<OrderInterface[]>> => {
  const response = await getRequest<OrderInterface[]>({
    url: Endpoints.FIND_USER_ORDERS(userId),
    cache: 'no-store'
  })

  if (response.error) {
    console.error(response.error)
    throw new Error(response?.error?.message)
  }

  return response
}
