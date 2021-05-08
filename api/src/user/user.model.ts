import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose'
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

    @Field(() => String)
    @Prop()
    diet: String

    @Field(() => String)
    @Prop()
    sex: String

    @Field(() => String)
    @Prop()
    objective: String

    @Field(() => Number)
    @Prop()
    height: Number

    @Field(() => Number)
    @Prop()
    weight: Number


    @Field(() => Boolean)
    @Prop()
    isPremium: boolean

    @Field(() => Date)
    @Prop()
    PremiumCreatedAt: Date

    @Field(() => Date)
    @Prop()
    PremiumUpdatedAt: Date

    @Field(() => Date)
    @Prop()
    PremiumTerminatedAt?: Date

    @Field(() => Date)
    @Prop()
    PremiumHistory?: [{type: string, begin: Date, end: Date}]

    @Field(() => [Lesson])
    @Prop({ ref: 'Lesson' })
    lessons: (String | Lesson)[]

    // @Prop()
    // refreshToken?: string

    // @Prop(() => String)
    // resetPasswordToken: string

    // @Prop(() => Number)
    // resetTokenPasswordExpireIn: number
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)