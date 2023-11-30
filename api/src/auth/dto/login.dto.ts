import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsString()
  @MinLength(6)
  @MaxLength(25)
    password: string
}
