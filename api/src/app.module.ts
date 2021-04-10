import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { MongooseModule } from '@nestjs/mongoose';


require('dotenv').config()


@Module({
  imports: [
    MongooseModule.forRoot(process.env.NEST_APP_DB_URL),
    GraphQLModule.forRoot({
        autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}