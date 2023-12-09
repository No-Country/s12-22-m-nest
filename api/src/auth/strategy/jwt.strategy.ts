import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { findUser } from 'src/common/users.common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: (req) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        if (!token) {
          throw new UnauthorizedException('Missing token')
        }
        try {
          this.jwtService.verify(token)
          return token
        } catch (error) {
          throw new UnauthorizedException('Invalid token format')
        }
      },
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any) {
    const user = await findUser(payload.sub, this.userRepository)
    if (!user) throw new UnauthorizedException('Invalid token!')
    return user
  }
}
