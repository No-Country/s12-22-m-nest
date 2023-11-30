export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  birthdate: Date | string
  password: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}
