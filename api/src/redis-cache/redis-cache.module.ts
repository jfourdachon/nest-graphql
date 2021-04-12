import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service'
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const redisConfig = configService.get('redis');
                return {
                    store: redisStore,
                    host: redisConfig.host,
                    port: redisConfig.port,
                    ttl: redisConfig.ttl,
                    max: redisConfig.max
                }
            }
        })
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService]
})
export class RedisCacheModule {}