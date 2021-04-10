import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Student } from "src/student/student.model";


@Schema()
export class Lesson {

    //Default mongo id
    _id: MongooseSchema.Types.ObjectId

    @Prop()
    id: string

    @Prop()
    name: string

    @Prop()
    startDate: string

    @Prop()
    endDate: string

    @Prop({ref: Student.name})
    students: string[]

}

export type LessonDocument = Lesson & Document

export const LessonSchema = SchemaFactory.createForClass(Lesson)