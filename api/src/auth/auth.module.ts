import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { User } from 'src/users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
