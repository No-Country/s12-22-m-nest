import { type TSteps } from './step.interface'

// Todo: Use Order Entity instead of Order interface
export interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
}

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: URL
  shopMapUrl: URL
}
