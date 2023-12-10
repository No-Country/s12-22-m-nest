export interface User {
  id: string
  firstName: string
  lastName: string
  type: Type
  email: string
  birthdate: Date | string
  password: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export type Type = 'customer' | 'dealer'
