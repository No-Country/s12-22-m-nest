import { getRequest } from '@/services/api.requests'
import { type User, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getUser = async (userId: string): Promise<Response<User>> => {
  const response = await getRequest<User>({
    url: Endpoints.FIND_USER(userId),
    cache: 'no-store'
  })

  if (response.error) {
    console.error(response.error)
    throw new Error(response?.error?.message)
  }

  return response
}
