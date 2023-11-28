export interface Message {
  sender: number
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  messages: Message[]
}
