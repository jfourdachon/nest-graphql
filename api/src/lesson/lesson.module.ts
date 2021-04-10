import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { StudentModule } from 'src/student/student.module';
import { Lesson, LessonSchema } from './lesson.model';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Lesson.name, schema: LessonSchema}]),
        StudentModule,
        AuthModule
    ],
    providers: [LessonResolver, LessonService],
    exports: [LessonService]
})
export class LessonModule {

}
