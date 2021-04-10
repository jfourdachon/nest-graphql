import { Document, Schema as MongooseSchema } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Lesson } from 'src/lesson/lesson.model'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'bson'

@ObjectType()
@Schema()
export class Student {

    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId

    @Field(() => String)
    @Prop()
    firstname: string

    @Field(() => String)
    @Prop()
    lastname: string

    @Field(() => [Lesson])
    @Prop({ ref: Lesson.name})
    lessons: (String | Lesson)[]
}

export type StudentDocument = Student & Document

export const StudentSchema = SchemaFactory.createForClass(Student)