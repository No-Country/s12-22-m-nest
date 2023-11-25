// Todo: Use Order Entity instead of Order interface
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
  shipMapUrl: URL
  shopMapUrl: URL
}
