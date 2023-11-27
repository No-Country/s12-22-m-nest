import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import BcryptManager from './utils/bcryptManager.utils'
import UserCriteria from './utils/userCriteria.utils'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    //check email:
    await this.validateEmail(createUserDto.email)

    const user = this.userRepository.create({
      ...createUserDto,
      password: await BcryptManager.hash(createUserDto.password),
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

  /** NOTE **/

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'birthdate',
        'email',
        'profileImage'
      ]
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    //check user
    await this.findUserByCriteria(new UserCriteria(id, null))

    //check email:
    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email)
    }
    //check pass:
    if (updateUserDto.password) {
      updateUserDto.password = await BcryptManager.hash(updateUserDto.password)
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

  async remove(id: number): Promise<string> {
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

  private async findUserByCriteria(criteria: UserCriteria): Promise<User> {
    if ((!criteria.id && !criteria.email) || (criteria.id && criteria.email))
      throw new BadRequestException('Error: Criteria needs one property.')

    let user: User
    if (criteria.id) {
      user = await this.userRepository.findOne({ where: { id: criteria.id } })
    } else {
      user = await this.userRepository.findOne({
        where: { email: criteria.email }
      })
    }

    if (!user) throw new NotFoundException('User not found')
    return user
  }
}
