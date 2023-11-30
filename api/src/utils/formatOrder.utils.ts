import {
  type OrderRequest,
  type Order
} from 'src/socket/interfaces/orderRequest.interface'
import { buildMapsUrl } from './buildMapsUrl.utils'

export const formatOrder = (order: Order) => {
  const orderRequest: OrderRequest = {
    ...order,
    shipCoordinates: order.shipCoordinates,
    shopCoordinates: order.shopCoordinates,
    shipMapUrl: buildMapsUrl(order.shipAddress),
    shopMapUrl: buildMapsUrl(order.shopAddress)
  }

  return orderRequest
}
