import { getRequest } from '@/services/api.requests'
import { type Shop, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getShops = async (): Promise<Response<Shop[]>> => {
  const response = await getRequest<Shop[]>({
    url: Endpoints.FIND_SHOPS,
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
