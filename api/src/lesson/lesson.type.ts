import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentType } from 'src/student/student.type';
import { Lesson } from './lesson.entity';

@ObjectType('Lesson')
export class LessonType {

    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    startDate: string

    @Field()
    endDate: string

    @Field(type => [StudentType])
    students: string[]
}