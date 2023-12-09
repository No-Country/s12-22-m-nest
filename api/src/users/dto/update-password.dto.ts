/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty } from 'class-validator'

export class UpdatePasswordDto {
  @IsNotEmpty()
  newPassword: string

  @IsNotEmpty()
  oldPassword: string

  @IsNotEmpty()
  repeatPassword: string
}
