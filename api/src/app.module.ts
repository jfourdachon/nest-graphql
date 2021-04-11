import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

require('dotenv').config()

@Module({
    imports: [
        MongooseModule.forRoot(process.env.NEST_APP_DB_URL),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        LessonModule,
        AuthModule,
        UserModule,
    ],
})
export class AppModule { }