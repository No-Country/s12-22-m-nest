import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    //check email:
    const checkEmail = await this.findOneByEmail(createUserDto.email)
    if (checkEmail) throw new BadRequestException('Email in use')

    const user = this.userRepository.create({
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 8)
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
  //withPass: false = Return user without password.
  //withPass: true = Return user with password
  async findOneById(id: number, withPass: boolean = false): Promise<User> {
    const user = withPass
      ? await this.userRepository
          .createQueryBuilder('user')
          .where('user.id = :id', { id })
          .addSelect('user.password')
          .getOne()
      : await this.userRepository.findOne({ where: { id } })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    //check user
    const user = await this.findOneById(id, true)

    //check email:
    if (updateUserDto.email) {
      const checkEmail = await this.findOneByEmail(updateUserDto.email)
      if (checkEmail) throw new BadRequestException('Email in use')
    }

    const updated: UpdateResult = await this.userRepository.update(id, {
      firstName: updateUserDto.firstName ?? user.firstName,
      lastName: updateUserDto.lastName ?? user.lastName,
      email: updateUserDto.email ?? user.email,
      password: updateUserDto.password
        ? await bcryptjs.hash(updateUserDto.password, 8)
        : user.password,
      profileImage: updateUserDto.profileImage ?? user.profileImage,
      birthdate: updateUserDto.birthdate ?? user.birthdate
    })

    if (updated.affected === 0) {
      return false
    }
    return true
  }

  async remove(id: number): Promise<boolean> {
    const results: DeleteResult = await this.userRepository.delete({ id })

    if (results.affected === 0) return false
    return true
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } })
  }
}
