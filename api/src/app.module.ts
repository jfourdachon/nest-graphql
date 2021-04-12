import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration'

require('dotenv').config()

@Module({
    imports: [
        ConfigModule.forRoot({ignoreEnvFile: true, isGlobal: true, load: [config] }),
        MongooseModule.forRoot(process.env.NEST_APP_DB_URL),
        GraphQLModule.forRoot({
            tracing: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        LessonModule,
        AuthModule,
        UserModule,
        RedisCacheModule,
    ],
})
export class AppModule { }