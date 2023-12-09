import { type Shop } from '.'

export interface Product {
  id: string
  shopId: string
  shop: Shop
  name: string
  description: string
  price: number
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}
