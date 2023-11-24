export interface Message {
  sender_id: number
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: number
  messages: Message[]
}
