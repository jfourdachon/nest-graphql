import { Document, Schema as MongooseSchema } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Lesson } from 'src/lesson/lesson.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Schema()
export class Student {

    @Field(() => String)
    _id: string

    @Field(() => String)
    @Prop()
    studentId: string

    @Field(() => String)
    @Prop()
    firstname: string

    @Field(() => String)
    @Prop()
    lastname: string

    @Field(() => [Lesson])
    @Prop({ref: Lesson.name})
    lessons: (string | Lesson)[]
}

export type StudentDocument = Student & Document

export const StudentSchema = SchemaFactory.createForClass(Student)