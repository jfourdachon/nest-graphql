import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

// const cookieExtractor = (req: Request): string | null => {
//   let accessToken = null;
//   if (req && req.cookies) {
//     accessToken = req.cookies.accessToken;
//   }
//   return accessToken;
// };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.NEST_JWT_SECRET,
        });
        const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    validate(payload) {
        return this.authService.validate(payload);
    }
}

