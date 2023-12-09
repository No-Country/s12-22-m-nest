import { type Response, type User, type PasswordFormProps } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { mutationRequest } from '../api.requests'

export const updatePassword = async (
  userId: string,
  formData: PasswordFormProps,
  sessionId: string
): Promise<Response<User>> => {
  try {
    const res = await mutationRequest<User>('put', Endpoints.UPDATE_USER_PASSWORD(userId), formData, {
      headers: {
        Authorization: `Bearer ${sessionId}`
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
