import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        RedisCacheModule,
        JwtModule.register({
            secret: process.env.NEST_JWT_SECRET,
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule { }
