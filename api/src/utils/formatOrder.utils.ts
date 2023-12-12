import { type OrderRequest } from 'src/socket/interfaces/orderRequest.interface'
import { type Order } from 'src/order/entities/order.entity'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'

export const formatOrder = (order: Order, chat: Chat | null) => {
  const shipCoordinates = JSON.parse(order.shipCoordinates) as Coordinates
  const products = order.products

  const orderRequest: OrderRequest = {
    ...order,
    products,
    ...(chat && { chat }),
    shipCoordinates,
    shop: {
      ...order.shop,
      coordinates: JSON.parse(order.shop.coordinates) as Coordinates
    }
  }

  return orderRequest
}
