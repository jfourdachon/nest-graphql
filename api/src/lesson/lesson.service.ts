import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

import { v4 as uuid } from 'uuid'
import { Parent, ResolveField } from '@nestjs/graphql';


@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    async getLessonById(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id })
    }

    async getAllLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    getManyLessons(lessonsIds: string[]): Promise<Lesson[]> {
        return this.lessonRepository.find({
            where: {
                id: {
                    $in: lessonsIds
                }
            }
        })
    }

    createLesson(createLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })
        return this.lessonRepository.save(lesson)
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({ id: lessonId })
        lesson.students = [...lesson.students, ...studentIds]
        return this.lessonRepository.save(lesson)
    }

}
