import { type User } from '.'

export interface LoginFormData {
  email: string
  password: string
}

export type RegisterFormData = Omit<User, 'id'>
