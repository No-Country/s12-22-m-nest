import { mutationRequest } from '@/services/api.requests'
import { type Shop, type Response, type ShopFormProps } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const CreateShop = async (formData: ShopFormProps, sessionId: string): Promise<Response<Shop>> => {
  try {
    const res = await mutationRequest<Shop>('post', Endpoints.CREATE_SHOP, formData, {
      headers: {
        Authorization: `Bearer ${sessionId}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  } catch (error) {
    console.error(error)
    throw error
  }
}
