export interface Message {
  sender: string
  customer: string
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  messages: Message[]
}
