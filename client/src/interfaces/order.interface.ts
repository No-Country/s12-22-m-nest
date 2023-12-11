import { type User, type Chat, type Coordinates, type Product, type Shop } from '.'

export type TSteps = 1 | 2 | 3 | 4 | 5 | 6

export enum EnumSteps {
  LookingForDealer = 1,
  GoingToShop = 2,
  GettingOrder = 3,
  GoingToCustomer = 4,
  InCustomerPlace = 5,
  Delivered = 6
}

export interface OrderInterface {
  id: string
  dealerId: string | null
  dealer: User | null
  client: User
  clientId: string
  shipAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
  chat: Chat
  price: number
  shipCoordinates: Coordinates
  products: Product[]
  shop: Shop
  createdAt: string
  updatedAt: string
  distance: number
  shipMapUrl: URL
}
