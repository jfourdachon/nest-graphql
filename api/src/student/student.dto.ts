import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, MinLength } from "class-validator";


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


@InputType()
export class AssignLessonsToStudentsDto {

    @IsMongoId()	
    @Field(type => ID)
    studentId: string

    @IsMongoId({each: true})	
    @Field(type => [ID])
    lessonsIds: string[]
}