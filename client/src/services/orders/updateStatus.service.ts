import { Endpoints } from '@/utils/constants/endpoints.const'
import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const updateOrderStatus = async (orderId: string, router: AppRouterInstance): Promise<void> => {
  try {
    await axios.post(serverUrl + Endpoints.NEXT_STEP(orderId))
    router.refresh()
  } catch (error) {
    console.error(error)
  }
}
