'use client'

import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react'
import { type UseFormRegister, type RegisterOptions } from 'react-hook-form'

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  register: UseFormRegister<any>
  validations?: RegisterOptions
}

export const Input = ({ name, register, validations, ...rest }: InputProps): JSX.Element => (
    <input {...register(name, validations)} {...rest} />)
