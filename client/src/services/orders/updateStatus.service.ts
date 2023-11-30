import { Endpoints } from '@/utils/constants/endpoints.const'
import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'

export const updateOrderStatus = async (orderId: string): Promise<void> => {
  try {
    await axios.post(serverUrl + Endpoints.NEXT_STEP(orderId))
  } catch (error) {
    console.error(error)
  }
}
