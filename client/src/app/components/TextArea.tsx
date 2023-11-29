import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string
  register: UseFormRegister<any>
  validations?: RegisterOptions
}

export const TextArea = ({ name, register, validations, ...rest }: TextAreaProps): JSX.Element => <textarea {...register(name, validations)} {...rest} />
