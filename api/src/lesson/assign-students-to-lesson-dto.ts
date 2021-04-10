import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, IsUUID } from "class-validator";
import { Model, Schema as MongooseSchema } from 'mongoose';


@InputType()
export class AssignStudentsToLessonDto {

    @IsMongoId()	
    @Field(type => String)
    lessonId:string

    @IsMongoId()	
    @Field(type => [ID])
    studentsIds:string[]

}