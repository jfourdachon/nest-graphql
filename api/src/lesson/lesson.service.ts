import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuid } from 'uuid'
import { Parent, ResolveField } from '@nestjs/graphql';
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
        return this.lessonModel.find().exec()
    }

    getManyLessons(lessonsIds: string[]): Promise<Lesson[]> {
        return this.lessonModel.find({
            where: {
                id: {
                    $in: lessonsIds
                }
            }
        }).exec()
    }

    createLesson(createLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const lesson = new this.lessonModel({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })
        return lesson.save()
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonModel.findOne({ id: lessonId })
        lesson.students = [...lesson.students, ...studentIds]
        return lesson.save()
    }

}
