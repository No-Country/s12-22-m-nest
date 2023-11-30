import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { type TSteps } from './step.interface'
import { type User } from 'src/users/entities/user.entity'

// Todo: Use Order Entity instead of Order interface
export interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
  chat: Chat
  price: number
  clientName: string
  clientEmail: string
  shop: string
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  products: Product[]
}

// TODO: Quit
export interface Product {
  name: string
  quantity: number
  price: number
}

export interface OrderRequest extends Omit<Order, 'dealer'> {
  shipMapUrl: URL
  shopMapUrl: URL
  dealer: User | null | string
}
