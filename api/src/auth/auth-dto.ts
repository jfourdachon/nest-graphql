import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginDto {

    @Field()
    email: string

    @Field()
    password: string
}

@InputType()
export class SignupDto {

    // ADD other fields and maybe put it in user dto

    @Field()
    email: string

    @Field()
    password: string
}