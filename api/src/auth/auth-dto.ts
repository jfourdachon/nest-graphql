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