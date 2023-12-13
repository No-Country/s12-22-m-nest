import { getRequest } from '@/services/api.requests'
import { type OrderInterface, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const findDealer = async (orderId: string): Promise<Response<OrderInterface>> => {
  console.log('findDealer', orderId)
  const response = await getRequest<OrderInterface>({
    url: Endpoints.FIND_DEALER_FOR_ORDER(orderId),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
