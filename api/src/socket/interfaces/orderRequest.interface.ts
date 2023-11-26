import { type TSteps } from './step.interface'

// Todo: Use Order Entity instead of Order interface
export interface Order {
  id: string
  dealer: string | null
  shipAddress: string
  shopAddress: string
  status: 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
  step: TSteps
  chat: Chat
}

// TODO: Quit
export interface Chat {
  id: string
  messages: Message[]
}

// TODO: Quit
export interface Message {
  sender: string | null
  body: string
}

export interface OrderRequest extends Order {
  shipCoordinates: Coordinates
  shopCoordinates: Coordinates
  shipMapUrl: URL
  shopMapUrl: URL
}
