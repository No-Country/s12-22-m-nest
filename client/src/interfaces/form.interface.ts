import { type User } from '.'

export interface LoginFormData {
  email: string
  password: string
}

export type RegisterFormData = Omit<User, 'id'>

export type AccountFormProps = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'birthdate' | 'password'>

export interface PasswordFormProps {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}

export interface ShippingFormProps {
  shipAddress: string
}

export interface OrderFormProps {
  shipAddress: string
  client: string
  shop: string
  products: string[]
}

export interface CreateProductProps {
  name: string
  price: number
  thumbnail: File | FileList
  description: string
  shopId: string
}
