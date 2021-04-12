import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

const cookieExtractor = (req: Request): string | null => {
  let accessToken = null;
  if (req && req.cookies) {
    accessToken = req.cookies.accessToken;
  }
  return accessToken;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.NEST_JWT_SECRET,
    });
  }

  validate(payload) {
    return this.authService.validate(payload);
  }
}