export interface Coordinates {
  lat: string
  lon: string
}

export interface DealerData {
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: 1 | 2 | 3 | 4 | 5
}

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: string
  shopMapUrl: string
}
