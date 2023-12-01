import { mutationRequest } from '@/services/api.requests'
import { type User, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const registerService = async (user: Omit<User, 'id'>): Promise<Response<Omit<User, 'id'>>> => {
  const response = await mutationRequest<Omit<User, 'id'>>('post', Endpoints.REGISTER, user)

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
