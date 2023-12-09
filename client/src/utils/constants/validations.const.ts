import { type RegisterOptions, type ValidationRule } from 'react-hook-form'

const required: ValidationRule<boolean> = { value: true, message: 'Este campo es requerido' }

export const emailValidations: RegisterOptions = {
  required,
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
  }
}

export const passwordValidations: RegisterOptions = {
  required,
  minLength: {
    value: 6,
    message: 'Debe tener al menos 6 caracteres'
  },
  maxLength: {
    value: 25,
    message: 'Debe tener máximo 25 caracteres'
  }
}

export const nameValidations: Record<string, RegisterOptions> = {
  firstName: {
    required,
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres'
    },
    maxLength: {
      value: 25,
      message: 'Debe tener máximo 25 caracteres'
    }
  },
  lastName: {
    required,
    minLength: {
      value: 3,
      message: 'Debe tener al menos 3 caracteres'
    },
    maxLength: {
      value: 25,
      message: 'Debe tener máximo 25 caracteres'
    }
  }
}

export const birthdateValidations: RegisterOptions = {
  required
}

export const firstNameValidations: RegisterOptions = {
  required
}

export const lastNameValidations: RegisterOptions = {
  required
}
