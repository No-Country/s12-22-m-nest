// Todo: fix eslint-disable
/* eslint-disable @typescript-eslint/indent */
import { type User } from 'src/users/entities/user.entity'
import { type Product, type Order } from 'src/order/entities/order.entity'
import { type Chat } from 'src/chat/entities/chat.mongo-entity'

export interface OrderRequest
  extends Omit<
    Order,
    'dealer' | 'shipCoordinates' | 'shopCoordinates' | 'products' | 'chat'
  > {
  shipMapUrl: URL
  shopMapUrl: URL
  dealer: User | null
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  products: Product[]
  chat: Chat
}
