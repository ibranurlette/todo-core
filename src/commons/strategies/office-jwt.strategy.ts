import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { IPayload } from './payload.interface'

@Injectable()
export class OfficeJwtStrategy extends PassportStrategy(Strategy, 'officejwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.OFFICE_ACCESS_TOKEN_SECRET
    })
  }

  async validate(payload: IPayload) {
    return payload
  }
}
