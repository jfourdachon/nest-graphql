import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Student } from "src/student/student.model";
import { Field, ObjectType } from '@nestjs/graphql'


@ObjectType()
@Schema()
export class Lesson {

    //Default mongo id
    @Field(() => String)
    _id: string

    @Field(() => String)
    @Prop()
    lessonId: string

    @Field(() => String)
    @Prop()
    name: string

    @Field(() => String)
    @Prop()
    startDate: string

    @Field(() => String)
    @Prop()
    endDate: string

    @Field(() => [Student])
    @Prop({ref: 'student'})
    students: (string | Student)[]

}

export type LessonDocument = Lesson & Document

export const LessonSchema = SchemaFactory.createForClass(Lesson)