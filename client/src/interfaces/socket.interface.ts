import { type User, type Order, type Chat, type Product } from '@/interfaces'

export interface SockDealerData {
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface FormatedSockDealer {
  sockId: string
  clientId: string
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface OrderRequest
  extends Omit<Order, 'dealer' | 'shipCoordinates' | 'shopCoordinates' | 'products' | 'chat'> {
  shipMapUrl: URL
  shopMapUrl: URL
  dealer: User | null
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  products: Product[]
  chat: Chat
}

export interface Coordinates {
  lat: string
  lon: string
}
