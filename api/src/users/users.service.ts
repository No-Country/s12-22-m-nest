import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { type CreateUserDto } from './dto/create-user.dto'
import { type UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import {
  type FindOneOptions,
  type DeleteResult,
  Repository,
  type UpdateResult
} from 'typeorm'
import { User } from './entities/user.entity'

import { hash } from './../utils/bcryptManager.utils'
import UserCriteria from './utils/userCriteria.utils'
import { orders } from 'src/fakeDb'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email)

    const user = this.userRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password),
      profileImage: 'https://i.postimg.cc/WbGN7jvM/6yvpkj.png'
    })

    return await this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: {},
      select: [
        'id',
        'firstName',
        'lastName',
        'birthdate',
        'email',
        'profileImage'
      ]
    })
  }

  async findOneById(id: string): Promise<User> {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    if (emailRegex.test(id)) {
      return await this.findUserByCriteria(new UserCriteria(null, id))
    }

    return await this.findUserByCriteria(new UserCriteria(id, null), [
      'id',
      'firstName',
      'lastName',
      'birthdate',
      'email',
      'profileImage'
    ])
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findUserByCriteria(new UserCriteria(id, null))

    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email)
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password)
    }

    const updatedDB: UpdateResult = await this.userRepository.update(
      id,
      updateUserDto
    )

    if (updatedDB.affected === 0) {
      throw new InternalServerErrorException('Error updating user')
    }
    return await this.findOneById(id)
  }

  async checkDealerAvailability(dealerId: string) {
    // TODO: Implement this method
    console.log('dealerId', dealerId, orders)
    const order = orders.filter(
      (order) => order.dealer === dealerId && order.status === 'In Progress'
    )[0]

    return {
      isAvailable: Boolean(!order),
      orderId: order?.id
    }
  }

  async remove(id: string): Promise<string> {
    const results: DeleteResult = await this.userRepository.delete({ id })

    if (results.affected === 0) throw new NotFoundException('User not found')
    return 'User deleted'
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findUserByCriteria(new UserCriteria(null, email))
  }

  private async validateEmail(email: string): Promise<void> {
    const check = await this.userRepository.findOne({ where: { email } })
    if (check) throw new BadRequestException('Email in use')
  }

  private async findUserByCriteria(
    criteria: UserCriteria,
    select?: FindOneOptions<User>['select']
  ): Promise<User> {
    if ((!criteria.id && !criteria.email) || (criteria.id && criteria.email)) {
      throw new BadRequestException('Error: Criteria needs one property.')
    }

    let user: User
    if (criteria.id) {
      user = await this.userRepository.findOne({
        where: { id: criteria.id },
        select
      })
    } else {
      user = await this.userRepository.findOne({
        where: { email: criteria.email }
      })
    }

    if (!user) throw new NotFoundException('User not found')
    return user
  }
}
