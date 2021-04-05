import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
        autoSchemaFile: true,
    }),
    LessonModule,
  ],
})
export class AppModule {}