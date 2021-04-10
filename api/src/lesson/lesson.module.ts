import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StudentModule } from 'src/student/student.module';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Lesson]),
        StudentModule,
        AuthModule
    ],
    providers: [LessonResolver, LessonService],
    exports: [LessonService]
})
export class LessonModule {

}
