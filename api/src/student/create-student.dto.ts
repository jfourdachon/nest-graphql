import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";



@InputType()
export class CreateStudentDto {

    @MinLength(3)
    @Field()
    firstname: string

    @MinLength(3)
    @Field()
    lastname: string

    @Field(type => [ID], {defaultValue: []})
    lessons: string[]

}