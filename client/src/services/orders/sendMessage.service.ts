import { type Type } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'

export const handleSendMessage = async (
  orderId: string,
  mode: Type,
  userId: string,
  message: string
): Promise<void> => {
  await axios.post(serverUrl + Endpoints.SEND_MESSAGE(orderId), {
    sender_id: mode === 'customer' ? null : userId,
    body: message
  })
}
