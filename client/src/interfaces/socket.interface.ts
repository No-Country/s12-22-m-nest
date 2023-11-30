import { type User, type Order } from '@/interfaces'

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

export interface OrderRequest extends Omit<Order, 'dealer'> {
  shipMapUrl: URL
  shopMapUrl: URL
  dealer: User | null | string
}

export interface Coordinates {
  lat: string
  lon: string
}
