import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
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
    const user = await this.userService.findOneById(payload.sub)
    if (!user) throw new UnauthorizedException('Invalid token!')
    return user
  }
}
