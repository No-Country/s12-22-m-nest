import { type Product } from '.'

export interface Shop {
  id: string
  products: Product[]
  name: string
  address: string
  description: string
  phone: string
  coordinates: string
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}
