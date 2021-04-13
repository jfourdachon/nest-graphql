import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Lesson, LessonSchema } from './lesson.model';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Lesson.name, schema: LessonSchema}]),
        UserModule,
        AuthModule
    ],
    providers: [LessonResolver, LessonService],
    exports: [LessonService]
})
export class LessonModule {

}
