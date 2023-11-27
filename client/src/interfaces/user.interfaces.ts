export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  birthdate: Date
  password: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}
