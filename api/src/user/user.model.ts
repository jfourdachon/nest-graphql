import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema} from 'mongoose'
import { Lesson } from "../lesson/lesson.model";

@ObjectType()
@Schema()
export class User {

    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId

    @Field(() => String)
    @Prop()
    username: string

    @Field(() => String)
    @Prop()
    email: string

    @Prop()
    password: string

    @Field(() => Boolean)
    @Prop()
    isVegetarian: boolean

    @Field(() => [Lesson])
    @Prop({ ref: 'Lesson'})
    lessons: (String | Lesson)[]

    // @Prop()
    // refreshToken?: string

    @Prop(() => String)
    resetPasswordToken: string

    @Prop(() => Number)
    resetTokenPasswordExpireIn: number
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)