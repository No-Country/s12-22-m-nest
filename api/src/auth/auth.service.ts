import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JsonWebTokenError, JwtService } from '@nestjs/jwt'
import type { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import type { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcryptjs'
import BcryptManager from 'src/users/utils/bcryptManager.utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}

  async register(
    createUserDto: CreateUserDto
  ): Promise<{ user: any, access_token: string }> {
    const user = await this.userService.create(createUserDto)
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id
    })
    delete user.password
    return { user, access_token: token }
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ user: any, access_token: string }> {
    const { email, password } = loginDto
    const user = await this.userService.findOneByEmail(email)
    if (!user || !(await BcryptManager.compare(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials!')
    }
    const token = this.jwtService.sign({
      email: user.email,
      sub: user.id
    })
    delete user.password
    return { user, access_token: token }
  }

  async refreshToken(refreshToken: string): Promise<{ refresh_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET
      })
      const user = await this.userService.findOneById(payload.sub)
      if (!user) throw new UnauthorizedException('Invalid token!')
      const newToken = this.jwtService.sign({ email: user.email, sub: user.id })
      return { refresh_token: newToken }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token signature')
      }
      console.log('Token error: ', error)
      throw new UnauthorizedException('Invalid token')
    }
  }
}
