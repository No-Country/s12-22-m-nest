import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { type CreateUserDto } from './dto/create-user.dto'
import { type UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { type DeleteResult, Repository, type UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'
import { hash, compare } from './../utils/bcryptManager.utils'
import { createUser, findUser } from '../common/users.common'
import { Order } from 'src/order/entities/order.entity'
import { checkIsAvailable } from 'src/utils/isAvailable.utils'
import { findOrdersByUser } from 'src/common/orders.common'
import { type UpdatePasswordDto } from './dto/update-password.dto'
import { type OrderRequest } from 'src/socket/interfaces/orderRequest.interface'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  private async validateEmail(email: string): Promise<void> {
    const check = await this.userRepository.findOne({ where: { email } })
    if (check) throw new BadRequestException('Email in use')
  }

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

  async checkDealerAvailability(dealerId: string) {
    return await checkIsAvailable(dealerId, this.orderRepository)
  }

  async findUserOrders(id: string): Promise<OrderRequest[]> {
    const user = await findUser(id, this.userRepository)
    return await findOrdersByUser(id, user.type, this.orderRepository)
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<User> {
    const currentUser = await findUser(id, this.userRepository)

    if (updatePasswordDto.newPassword !== updatePasswordDto.repeatPassword) {
      throw new BadRequestException('Passwords do not match')
    }

    const equal = await compare(
      currentUser.password,
      updatePasswordDto.oldPassword
    )

    if (!equal) {
      throw new UnauthorizedException('Incorrect password')
    }

    const newPassword = await hash(updatePasswordDto.newPassword)

    const updatedDB: UpdateResult = await this.userRepository.update(id, {
      password: newPassword
    })

    if (updatedDB.affected === 0) {
      throw new InternalServerErrorException('Error updating password')
    }

    return currentUser
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await findUser(id, this.userRepository)

    if (updateUserDto.email && updateUserDto.email !== currentUser.email) {
      await this.validateEmail(updateUserDto.email)
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

  async remove(id: string): Promise<string> {
    const results: DeleteResult = await this.userRepository.delete({ id })
    if (results.affected === 0) throw new NotFoundException('User not found')
    return 'User deleted'
  }
}
