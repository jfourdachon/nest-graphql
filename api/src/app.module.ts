import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Lesson } from './lesson/lesson.entity';

require('dotenv').config()


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mongodb',
        url: process.env.NEST_APP_DB_URL,
        synchronize: true,
        useUnifiedTopology: true,
        entities: [
            Lesson
        ]
      }),
    GraphQLModule.forRoot({
        autoSchemaFile: true,
    }),
    LessonModule,
  ],
})
export class AppModule {}