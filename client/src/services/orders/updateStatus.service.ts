import { Endpoints } from '@/utils/constants/endpoints.const'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { mutationRequest } from '../api.requests'

export const updateOrderStatus = async (orderId: string, router: AppRouterInstance): Promise<void> => {
  try {
    await mutationRequest('post', Endpoints.NEXT_STEP(orderId))
    router.refresh()
  } catch (error) {
    console.error(error)
  }
}
