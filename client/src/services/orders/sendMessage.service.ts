import { type Type } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { serverUrl } from '@/utils/constants/env.const'
import axios from 'axios'

export const handleSendMessage = async (
  event: React.FormEvent<HTMLFormElement>,
  orderId: string,
  mode: Type,
  userId: string
): Promise<void> => {
  event.preventDefault()
  await axios.post(serverUrl + Endpoints.SEND_MESSAGE(orderId), {
    sender_id: mode === 'customer' ? null : userId,
    body: event.currentTarget.message.value
  })
}
