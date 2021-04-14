import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsJWT, IsMongoId, MinLength } from "class-validator";
import {Schema as MongooseSchema } from 'mongoose'
@InputType()
export class LoginDto {

    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}

@InputType()
export class SignupDto {

    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}

@InputType()
export class EmailDto {

    @Field()
    @IsEmail()
    email:string
}

@InputType()
export class resetPasswordDto {

    @Field()
    @IsMongoId()
    userId: string
    
    @Field()
    @IsJWT()
    token: string

    @Field()
    @MinLength(5)
    password: string
    
    @Field()
    confirmPassword: string

}