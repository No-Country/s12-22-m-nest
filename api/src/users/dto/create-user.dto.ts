import { Transform } from 'class-transformer'
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Validate
} from 'class-validator'
import BirthdateValidator from '../utils/Birthdate.validator'

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  firstName: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  lastName: string

  @IsEmail()
  email: string

  @Validate(BirthdateValidator)
  birthdate: string

  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string
}
