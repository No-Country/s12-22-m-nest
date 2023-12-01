import { type Chat, type Coordinates } from '.'

export type TSteps = 1 | 2 | 3 | 4 | 5 | 6

export enum EnumSteps {
  LookingForDealer = 1,
  GoingToShop = 2,
  GettingOrder = 3,
  GoingToCustomer = 4,
  InCustomerPlace = 5,
  Delivered = 6
}

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
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  clientEmail: string
  products: Product[]
  shop: string
}

export interface Product {
  name: string
  quantity: number
  price: number
}
