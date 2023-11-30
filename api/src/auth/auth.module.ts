import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'
import { UsersModule } from 'src/users/users.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    }),
    UsersModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
