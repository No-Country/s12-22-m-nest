export interface DealerData {
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface SockDealer {
  sockId: string
  clientId: string
  coordinates: Coordinates
  active: boolean
  taken: boolean
}
