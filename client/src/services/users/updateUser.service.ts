import { type Response, type AccountFormProps, type User } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { mutationRequest } from '../api.requests'

export const updateUser = async (
  userId: string,
  formData: AccountFormProps,
  sessionId: string
): Promise<Response<User>> => {
  try {
    const res = await mutationRequest<User>('put', Endpoints.UPDATE_USER(userId), formData, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    if (res.error) {
      throw new Error(res.error.message)
    }

    return res
  } catch (error) {
    console.error(error)
    throw error
  }
}
