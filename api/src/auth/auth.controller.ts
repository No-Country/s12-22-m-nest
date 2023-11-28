import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @Post('refresh-token')
  async refresToken(@Headers('authorization') authorizationHeader: string) {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing Authorization header')
    }
    const oldToken = authorizationHeader.split(' ')[1]
    return await this.authService.refreshToken(oldToken)
  }
}
