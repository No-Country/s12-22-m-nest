import { type User, type Chat } from '.'
export interface Order {
  id: string
  dealer: User
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: 1 | 2 | 3 | 4 | 5
  chat: Chat
  price: number
  clientName: string
  clientEmail: string
  products: Product[]
}

export interface Product {
  name: string
  quantity: number
  price: number
}
