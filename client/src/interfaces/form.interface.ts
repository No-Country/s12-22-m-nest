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
