import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsMongoId, MinLength } from "class-validator";

@InputType()
export class CreateUserDto {

    @Field(() => String)
    @IsEmail()
    email: string

    @Field(() => String)
    @MinLength(3)
    username: string

    @Field(() => String)
    @MinLength(5)
    password: string

    @Field(() => Boolean, {defaultValue: false})
    @IsBoolean()
    isVegetarian: boolean
}

@InputType()
export class AssignLessonsToUserDto {

    @IsMongoId()	
    @Field(type => ID)
    userId: string

    @IsMongoId({each: true})	
    @Field(type => [ID])
    lessonsIds: string[]
}