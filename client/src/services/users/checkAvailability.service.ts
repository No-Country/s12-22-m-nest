// TODO: Add types
import { getRequest } from '@/app/services/api.requests'
import { type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

interface CheckAvailabilityResponse {
  isAvailable: boolean
  order?: string
}

export const checkAvailability = async (userId: string): Promise<Response<CheckAvailabilityResponse>> => {
  const response = await getRequest<CheckAvailabilityResponse>({ url: Endpoints.CHECK_USER_AVAILABILITY(userId) })

  if (response.error) {
    console.error(response.error)
    throw new Error(response.error.message)
  }

  return response
}
