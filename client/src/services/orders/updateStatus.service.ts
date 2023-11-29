import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'

export const updateOrderStatus = async (orderId: string): Promise<void> => {
  try {
    await axios.post(`${serverUrl}/api/test/` + orderId + '/nextStep')
  } catch (error) {
    console.error(error)
  }
}
