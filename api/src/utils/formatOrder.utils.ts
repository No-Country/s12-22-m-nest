import {
  type OrderRequest,
  type Order
} from 'src/socket/interfaces/orderRequest.interface'
import { buildMapsUrl } from './buildMapsUrl.utils'

export const formatOrder = (
  order: Order,
  shipCoordinates: Coordinates,
  shopCoordinates: Coordinates
) => {
  const orderRequest: OrderRequest = {
    ...order,
    shipCoordinates,
    shopCoordinates,
    shipMapUrl: buildMapsUrl(order.shipAddress),
    shopMapUrl: buildMapsUrl(order.shopAddress)
  }

  return orderRequest
}
