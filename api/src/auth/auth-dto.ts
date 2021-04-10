import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

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

    // ADD other fields and maybe put it in user dto

    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}