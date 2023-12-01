import { type OrderRequest } from 'src/socket/interfaces/orderRequest.interface'
import { buildMapsUrl } from './buildMapsUrl.utils'
import { type Product, type Order } from 'src/order/entities/order.entity'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'

export const formatOrder = (order: Order, chat: Chat) => {
  const shipCoordinates = JSON.parse(order.shipCoordinates) as Coordinates
  const shopCoordinates = JSON.parse(order.shopCoordinates) as Coordinates
  const products = JSON.parse(order.products) as Product[]
  const orderRequest: OrderRequest = {
    ...order,
    products,
    chat,
    shipCoordinates,
    shopCoordinates,
    shipMapUrl: buildMapsUrl(order.shipAddress),
    shopMapUrl: buildMapsUrl(order.shopAddress)
  }

  return orderRequest
}
