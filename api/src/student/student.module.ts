import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonModule } from '../lesson/lesson.module';
import { Student, StudentSchema } from './student.model';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]), forwardRef(() =>LessonModule)],
    providers: [StudentService, StudentResolver],
    exports: [StudentService]
})
export class StudentModule { }
