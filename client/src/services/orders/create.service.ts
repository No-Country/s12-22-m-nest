import { Endpoints } from '@/utils/constants/endpoints.const'
import { mutationRequest } from '../api.requests'
import { toast } from 'sonner'
import { type OrderRequest, type OrderFormProps, type Response } from '@/interfaces'

export const createOrder = async (data: OrderFormProps): Promise<Response<OrderRequest>> => {
  const res = await mutationRequest<OrderRequest>('post', Endpoints.CREATE_ORDER)
  if (res.error) {
    toast.error('Error al crear la orden, intente de nuevo más tarde')
    return res
  }

  return res
}
