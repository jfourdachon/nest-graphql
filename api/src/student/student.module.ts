import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from '../lesson/lesson.module';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([Student]), forwardRef(() =>LessonModule)],
    providers: [StudentService, StudentResolver],
    exports: [StudentService]
})
export class StudentModule { }
