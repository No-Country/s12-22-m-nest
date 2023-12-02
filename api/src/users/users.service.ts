import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { type CreateUserDto } from './dto/create-user.dto'
import { type UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { type DeleteResult, Repository, type UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'
import { hash } from './../utils/bcryptManager.utils'
import { createUser, findUser } from './common'
import { Order } from 'src/order/entities/order.entity'
import { checkIsAvailable } from 'src/utils/isAvailable.utils'
import { findOrdersByUser } from 'src/order/common'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await createUser(createUserDto, this.userRepository)
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

  async findOneById(id: string, populate: boolean): Promise<User> {
    return await findUser(id, this.userRepository, populate)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await findUser(id, this.userRepository)

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
    return await findUser(id, this.userRepository)
  }

  async checkDealerAvailability(dealerId: string) {
    return await checkIsAvailable(dealerId, this.orderRepository)
  }

  async remove(id: string): Promise<string> {
    const results: DeleteResult = await this.userRepository.delete({ id })

    if (results.affected === 0) throw new NotFoundException('User not found')
    return 'User deleted'
  }

  async findOneByEmail(email: string): Promise<User> {
    return await findUser(email, this.userRepository)
  }

  async findOrdersByUser(id: string): Promise<Order[]> {
    return await findOrdersByUser(id, this.orderRepository)
  }

  private async validateEmail(email: string): Promise<void> {
    const check = await this.userRepository.findOne({ where: { email } })
    if (check) throw new BadRequestException('Email in use')
  }
}
