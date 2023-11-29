import { emailRegex, passwordRegex } from './regex.const'

interface Pattern {
  value: RegExp
  message: string
}

export const emailPattern: Pattern = {
  value: emailRegex,
  message: 'Ingresa un email válido'
}

export const passwordPattern: Pattern = {
  value: passwordRegex,
  message: 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números'
}
