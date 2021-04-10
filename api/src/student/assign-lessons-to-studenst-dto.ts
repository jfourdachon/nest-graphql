import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId } from "class-validator";


@InputType()
export class AssignLessonsToStudentsDto {

    @IsMongoId()	
    @Field(type => ID)
    studentId: string

    @IsMongoId({each: true})	
    @Field(type => [ID])
    lessonsIds: string[]
}