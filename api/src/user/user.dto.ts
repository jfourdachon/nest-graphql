import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsJWT, IsMongoId, IsOptional, MinLength } from "class-validator";

@InputType()
export class SignupDto {

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
export class UpdateUserDto {

    @Field(() => String)
    @IsMongoId()
    id: string

    @Field(() => String)
    @IsOptional()
    @IsEmail()
    email?: string

    @Field(() => String)
    @IsOptional()
    @MinLength(3)
    username?: string

    @Field(() => String)
    @IsOptional()
    @MinLength(5)
    password?: string

    @Field(() => Boolean, {defaultValue: false})
    @IsOptional()
    @IsBoolean()
    isVegetarian?: boolean

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