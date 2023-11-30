import { type Chat } from 'src/chat/entities/chat.mongo-entity'
import { type TSteps } from './step.interface'
import { type User } from 'src/users/entities/user.entity'

// Todo: Use Order Entity instead of Order interface
export interface Order {
  id: string
  dealer: typeof User | string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
  chat: typeof Chat
  price: number
  clientName: string
  clientEmail: string
  shop: string
  products: Product[]
}

// TODO: Quit
export interface Product {
  name: string
  quantity: number
  price: number
}

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: URL
  shopMapUrl: URL
}
