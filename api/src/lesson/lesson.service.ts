import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './lesson.model';
import { Model } from 'mongoose';


@Injectable()
export class LessonService {
    constructor(
        @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>
    ) { }

    async getLessonById(id: string): Promise<Lesson> {
        return this.lessonModel.findOne({ id }).exec()
    }

    async getAllLessons(): Promise<Lesson[]> {
        const result =  await this.lessonModel.find().exec()
        return result
    }

    createLesson(createLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const lesson = new this.lessonModel({
            lessonId: uuid(),
            name,
            startDate,
            endDate,
            students
        })
        return lesson.save()
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonModel.findOne({ lessonId: lessonId })
        lesson.students = [...lesson.students, ...studentIds]
        const result = await lesson.save()
        return result
    }

}
