import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'
import { config } from 'dotenv'
config()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    UsersModule
  ]
})
export class AuthModule {}
