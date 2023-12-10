// Todo: fix eslint-disable
/* eslint-disable @typescript-eslint/indent */
import { type Product, type Order } from 'src/order/entities/order.entity'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { type ShopResponse } from 'src/shops/entities/shop.entity'

export interface OrderRequest
  extends Omit<
    Order,
    | 'dealer'
    | 'shipCoordinates'
    | 'shopCoordinates'
    | 'products'
    | 'chat'
    | 'shop'
  > {
  shipCoordinates: Coordinates
  products: Product[]
  chat: Chat
  shop: ShopResponse
}
