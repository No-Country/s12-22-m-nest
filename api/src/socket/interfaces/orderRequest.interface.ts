import { type TSteps } from './step.interface'

// Todo: Use Order Entity instead of Order interface
export interface Order {
  id: string
  dealer: User | string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
  chat: Chat
  price: number
  clientName: string
  clientEmail: string
  shop: string
  products: Product[]
}

// TODO: Quit
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  birthdate: Date
  profileImage: string
}

// TODO: Quit
export interface Product {
  name: string
  quantity: number
  price: number
}

// TODO: Quit
export interface Chat {
  id: string
  messages: Message[]
}

// TODO: Quit
export interface Message {
  sender: string | null
  body: string
}

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: URL
  shopMapUrl: URL
}
