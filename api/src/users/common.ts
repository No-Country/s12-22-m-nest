import { BadRequestException, NotFoundException } from '@nestjs/common'
import { type User } from './entities/user.entity'
import { type FindOneOptions, type Repository } from 'typeorm'
import UserCriteria from './utils/userCriteria.utils'
import { type CreateUserDto } from './dto/create-user.dto'
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
  userRepository: Repository<User>
): Promise<User> => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const selectedFields = [
    'id',
    'firstName',
    'lastName',
    'birthdate',
    'email',
    'profileImage',
    'orders'
  ]

  const criteria = emailRegex.test(id)
    ? new UserCriteria(null, id)
    : new UserCriteria(id, null)

  return await findUserByCriteria(
    userRepository,
    criteria,
    selectedFields as FindOneOptions<User>['select']
  )
}

export const findUserByCriteria = async (
  userRepository: Repository<User>,
  criteria: UserCriteria,
  select?: FindOneOptions<User>['select']
): Promise<User> => {
  if ((!criteria.id && !criteria.email) || (criteria.id && criteria.email)) {
    throw new BadRequestException('Error: Criteria needs one property.')
  }

  let user: User
  if (criteria.id) {
    user = await userRepository.findOne({
      where: { id: criteria.id },
      select,
      relations: ['orders']
    })
    // .createQueryBuilder('user')
    // .leftJoinAndSelect('user.orders', 'orders')
    // .where('user.id = :userId', { userId: criteria.id })
    // .getOne()
  } else {
    user = await userRepository.findOne({
      where: { email: criteria.email }
    })
  }

  if (!user) throw new NotFoundException('User not found')
  return user
}
