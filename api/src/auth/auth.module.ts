import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.NEST_JWT_SECRET,
            // signOptions: {
            //     expiresIn: 3600, // 1 hour
            // },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule { }
