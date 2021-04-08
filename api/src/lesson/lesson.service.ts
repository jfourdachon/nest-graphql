import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

import { v4 as uuid } from 'uuid'


@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    async getLessonById(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id })
    }

    createLesson(createLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate
        })
        return this.lessonRepository.save(lesson)

    }
}
