import { type Order } from '@/interfaces'

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

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: URL
  shopMapUrl: URL
}

export interface Coordinates {
  lat: string
  lon: string
}
