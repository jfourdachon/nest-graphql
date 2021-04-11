import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.model';
import { Model, Schema as MongooseSchema } from 'mongoose';


@Injectable()
export class LessonService {
    constructor(
        @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>
    ) { }

    async getLessonById(_id: string): Promise<Lesson> {
        return this.lessonModel.findById(_id).exec()
    }

    async getAllLessons(): Promise<Lesson[]> {
        const result =  await this.lessonModel.find().exec()
        return result
    }

    createLesson(createLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const lesson = new this.lessonModel({
            name,
            startDate,
            endDate,
            students
        })
        return lesson.save()
    }

    async assignUsersToLesson(lessonId: string, usersIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonModel.findById(lessonId)
        lesson.users = [...lesson.users, ...usersIds]
        const result = await lesson.save()
        return result
    }

}
