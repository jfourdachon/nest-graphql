import { Document, Schema as MongooseSchema } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Lesson } from 'src/lesson/lesson.model'

@Schema()
export class Student {
    _id: MongooseSchema.Types.ObjectId

    @Prop()
    id: string

    @Prop()
    firstname: string

    @Prop()
    lastname: string

    @Prop({ref: Lesson.name})
    lessons: string[]
}

export type StudentDocument = Student & Document

export const StudentSchema = SchemaFactory.createForClass(Student)