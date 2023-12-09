import { type OrderRequest } from 'src/socket/interfaces/orderRequest.interface'
import { buildMapsUrl } from './buildMapsUrl.utils'
import { type Product, type Order } from 'src/order/entities/order.entity'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { calculateDistance } from './calculateDistance.utils'

export const formatOrder = (order: Order, chat: Chat | null) => {
  const shipCoordinates = JSON.parse(order.shipCoordinates) as Coordinates
  const shopCoordinates = JSON.parse(order.shopCoordinates) as Coordinates
  const products = JSON.parse(order.products) as Product[]
  const distance = calculateDistance(
    parseFloat(shipCoordinates.lat),
    parseFloat(shipCoordinates.lon),
    parseFloat(shopCoordinates.lat),
    parseFloat(shopCoordinates.lon)
  )

  const orderRequest: OrderRequest = {
    ...order,
    products,
    ...(chat && { chat }),
    shipCoordinates,
    shopCoordinates,
    shipMapUrl: buildMapsUrl(order.shipAddress),
    shopMapUrl: buildMapsUrl(order.shopAddress),
    distance
  }

  return orderRequest
}
