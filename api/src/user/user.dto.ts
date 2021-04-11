import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, MinLength } from "class-validator";

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