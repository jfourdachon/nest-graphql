import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from "../user/user.model";


@ObjectType()
@Schema()
export class Lesson {

    //Default mongo id
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId

    @Field(() => String)
    @Prop()
    name: string

    @Field(() => String)
    @Prop()
    startDate: string

    @Field(() => String)
    @Prop()
    endDate: string

    @Field(() => [User])
    @Prop({ref: 'User'})
    users: (string | User)[]

}

export type LessonDocument = Lesson & Document

export const LessonSchema = SchemaFactory.createForClass(Lesson)