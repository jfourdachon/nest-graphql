import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { ConfigService } from '@nestjs/config';


@Module({
    imports: [
        UserModule,
        RedisCacheModule,
        JwtModule.register({
            secret: process.env.NEST_JWT_SECRET,
        }),
        MailgunModule.forAsyncRoot({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
              const mailgunConfig = configService.get('mailgun');
              return {
                DOMAIN: mailgunConfig.domain,
                API_KEY: mailgunConfig.apiKey,
                //TODO upgrade to test EU region
                // HOST: 'api.eu.mailgun.net', // default: 'api.mailgun.net'. Note that if you are using the EU region the host should be set to 'api.eu.mailgun.net'
              };
            },
          }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule { }
