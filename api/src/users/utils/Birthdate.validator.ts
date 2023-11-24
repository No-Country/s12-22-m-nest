import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ name: 'custom', async: false })
export default class BirthdateValidator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/
    return typeof value === 'string' && regex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid birthdate format'
  }
}
