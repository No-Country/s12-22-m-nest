export interface Order {
  id: number
  dealer: string
  shipAddress: string
  shopAddress: string
  status: string
  step: string
  chat: string[]
  price: number
  clientName: string
  clientEmail: string
  products: Product[]
}

export interface Product {
  name: string
  quantity: number
  price: number
}
