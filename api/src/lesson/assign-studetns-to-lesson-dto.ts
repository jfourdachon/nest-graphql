import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignStudentsToLessonDto {

    @IsUUID()
    @Field(type => ID)
    lessonId: string

    @IsUUID("4", {each: true})
    @Field(ype => [ID])
    studentsIds: string[]

}