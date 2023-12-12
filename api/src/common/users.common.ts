/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { type User } from '../users/entities/user.entity'
import { type FindOneOptions, type Repository } from 'typeorm'
import UserCriteria from '../users/utils/userCriteria.utils'
import { type CreateUserDto } from '../users/dto/create-user.dto'
import { hash } from 'src/utils/bcryptManager.utils'

export const createUser = async (
  createUserDto: CreateUserDto,
  userRepository: Repository<User>
) => {
  await validateEmail(createUserDto.email, userRepository)

  const user = userRepository.create({
    ...createUserDto,
    password: await hash(createUserDto.password),
    profileImage: 'https://i.postimg.cc/WbGN7jvM/6yvpkj.png'
  })

  return await userRepository.save(user)
}

export const validateEmail = async (
  email: string,
  userRepository: Repository<User>
) => {
  const user = await userRepository.findOne({ where: { email } })
  if (user) throw new BadRequestException('Email already exists')
}

export const findUser = async (
  id: string,
  userRepository: Repository<User>,
  populate?: boolean,
  filters?: 'default' | false | FindOneOptions<User>['select']
): Promise<User> => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const defaultFilter = [
    'id',
    'firstName',
    'lastName',
    'birthdate',
    'email',
    'profileImage',
    'orders'
  ]

  const selectedFields =
    filters === 'default'
      ? (defaultFilter as FindOneOptions<User>['select'])
      : filters === false
      ? undefined
      : filters

  const criteria = emailRegex.test(id)
    ? new UserCriteria(null, id)
    : new UserCriteria(id, null)

  return await findUserByCriteria(
    userRepository,
    criteria,
    selectedFields,
    populate
  )
}

export const findUserByCriteria = async (
  userRepository: Repository<User>,
  criteria: UserCriteria,
  select?: FindOneOptions<User>['select'],
  populate?: boolean
): Promise<User> => {
  if ((!criteria.id && !criteria.email) || (criteria.id && criteria.email)) {
    throw new BadRequestException('Error: Criteria needs one property.')
  }

  let user: User

  if (criteria.id) {
    user = await userRepository.findOne({
      where: { id: criteria.id },
      select,
      ...(populate && { relations: ['orders', 'clientOrders'] })
    })

    if (user.shop) {
      user.shop = {
        ...user.shop,
        coordinates: JSON.parse(user.shop.coordinates)
      }
    }
  } else {
    user = await userRepository.findOne({
      where: { email: criteria.email },
      select,
      ...(populate && { relations: ['orders'] })
    })
  }

  if (!user) throw new NotFoundException('User not found')
  return user
}
