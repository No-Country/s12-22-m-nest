import { type Response, type ShopFormProps, type Shop } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { mutationRequest } from '../api.requests'

export const updateShop = async (id: string, formData: ShopFormProps, sessionId: string): Promise<Response<Shop>> => {
  try {
    const res = await mutationRequest<Shop>('put', Endpoints.UPDATE_SHOP(id), formData, {
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
